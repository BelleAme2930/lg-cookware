import React from 'react';
import Table from "@/Components/Table.jsx";

const PurchaseDetails = ({ purchase }) => {
    const headers = ["Product", "Size", "Quantity", "Weight", "Unit Price", "Total Price"];

    const groupedItems = {};
    const quantityItems = [];

    purchase.items.forEach(item => {
        const { product_size } = item;
        const productName = product_size?.product?.name ?? '-';
        const sizeName = product_size?.name ?? '-';

        if (product_size.product.type === 'quantity') {
            quantityItems.push({
                product: productName,
                size: sizeName,
                quantity: `${item.quantity} Pcs.`,
                weight: '-',
                unit_price: `${item.unit_price_display} Rs.`,
                total_price: `${item.total_price} Rs.`
            });
        } else {
            if (!groupedItems[productName]) {
                groupedItems[productName] = {
                    product: productName,
                    sizes: [],
                    totalQuantity: 0,
                    weight: 0,
                    totalPrice: 0,
                };
            }

            groupedItems[productName].sizes.push({
                name: sizeName,
                quantity: item.quantity,
                weight: parseFloat(item.weight || 0),
                unitPrice: parseFloat(item.unit_price_display || 0)
            });
            groupedItems[productName].totalQuantity += item.quantity;
            groupedItems[productName].weight += item.weight || 0;
        }
    });

    const weightItems = Object.values(groupedItems).map(group => {
        let calculatedTotalPrice = 0;
        group.sizes.forEach(size => {
            calculatedTotalPrice += size.weight * size.unitPrice;
        });

        return {
            product: group.product,
            size: <div className="flex justify-center gap-3">
                {group.sizes.map((size, index) => (
                    <div key={index}>
                        <div className="border-b border-black">{size.name}</div>
                        <div>{size.quantity}</div>
                    </div>
                ))}
            </div>,
            quantity: `${group.totalQuantity} Pcs.`,
            weight: `${group.weight.toFixed(2)} KG`,
            unit_price: `${group.sizes[0].unitPrice} Rs.`,
            total_price: `${calculatedTotalPrice.toLocaleString()} Rs.`
        };
    });

    const data = [...quantityItems, ...weightItems];

    return (
        <Table
            headers={headers}
            data={data}
        />
    );
};

export default PurchaseDetails;
