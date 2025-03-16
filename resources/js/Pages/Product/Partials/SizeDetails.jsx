import React from 'react';
import Table from "@/Components/Table.jsx";

const SizeDetails = ({product}) => {

    const sizeData = product.sizes.map(size => ({
        name: size.name,
        purchase_price: `${size.purchase_price} Rs.`,
        sale_price: `${size.sale_price} Rs.`,
        quantity: `${size.quantity} Pcs.`,
        weight: size.weight ?? '-'
    }));


    return (
        <Table
            headers={["Size", "Purchase Price", "Sale Price", "Quantity", "Weight"]}
            data={sizeData}
        />
    );
};

export default SizeDetails;
