import React from 'react';
import Table from "@/Components/Table.jsx";

const SizeDetails = ({product}) => {
    const isWeightBased = product.product_type === 'weight';

    const sizeData = product.sizes.map(size => {
        const baseData = {
            name: size.name,
            purchase_price: `${size.purchase_price} Rs.`,
            sale_price: `${size.sale_price} Rs.`,
            quantity: `${size.quantity} Pcs.`
        };

        if (isWeightBased) {
            baseData.weight = size.weight ?? '-';
        }

        return baseData;
    });

    const headers = isWeightBased
        ? ["Size", "Purchase Price", "Sale Price", "Quantity", "Weight"]
        : ["Size", "Purchase Price", "Sale Price", "Quantity"];

    return (
        <Table
            headers={headers}
            data={sizeData}
        />
    );
};

export default SizeDetails;
