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

        if (product_size?.product?.type === 'quantity') {
            // Handle quantity-based products
            quantityItems.push({
                product: productName,
                size: sizeName,
                quantity: `${item.quantity} Pcs.`,
                weight: '-',
                unit_price: `${item.unit_price_display} Rs.`,
                total_price: `${item.total_price} Rs.`
            });
        } else {
            const key = `${productName}`;
            if (!groupedItems[key]) {
                groupedItems[key] = {
                    product: productName,
                    sizes: [],
                    totalQuantity: 0,
                    totalWeight: 0,
                    unitPrice: parseFloat(item.unit_price_display || 1)
                };
            }

            groupedItems[key].sizes.push({
                name: sizeName,
                quantity: item.quantity
            });

            groupedItems[key].totalQuantity += parseInt(item.quantity || 0);

            const weightInKg = parseFloat(item.weight || 0);
            groupedItems[key].totalWeight += weightInKg;
        }
    });

    const weightItems = Object.values(groupedItems).map(group => {
        // Format size display
        const sizeDisplay = (
            <div className="flex justify-center gap-3">
                {group.sizes.map((size, index) => (
                    <div key={index} className="text-center">
                        <div className="border-b border-black">{size.name}</div>
                        <div>{size.quantity}</div>
                    </div>
                ))}
            </div>
        );

        const totalPrice = group.totalWeight * group.unitPrice;

        return {
            product: group.product,
            size: sizeDisplay,
            quantity: `${group.totalQuantity} Pcs.`,
            weight: `${group.totalWeight.toFixed(2)} KG`,
            unit_price: `${group.unitPrice} Rs.`,
            total_price: `${Math.round(totalPrice).toLocaleString()} Rs.`
        };
    });

    const data = [...weightItems, ...quantityItems];

    return (
        <div>
            <Table headers={headers} data={data} />
            <div className="text-right mt-4 font-bold">
                Total Price: {purchase.total_amount?.toLocaleString()} Rs.
            </div>
        </div>
    );
};

export default PurchaseDetails;
