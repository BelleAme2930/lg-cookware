import React from 'react';
import Table from "@/Components/Table.jsx";

const PurchaseDetails = ({ purchase }) => {
    const purchaseData = purchase.items.map((item, index) => {
        const { product_size } = item;
        const productName = product_size?.product?.name ?? '-';
        const sizeName = product_size?.name ?? '-';

        return {
            id: item.id,
            product: productName + ' - ' + sizeName,
            quantity: item.quantity + ' Pcs.',
            weight: item.weight ?? '-',
            unit_price: `${item.unit_price} Rs.`,
            total_price: `${item.total_price} Rs.`
        };
    });

    const headers = ["Id", "Product", "Quantity", "Weight", "Unit Price", "Total Price"];

    return (
        <Table
            headers={headers}
            data={purchaseData}
        />
    );
};

export default PurchaseDetails;
