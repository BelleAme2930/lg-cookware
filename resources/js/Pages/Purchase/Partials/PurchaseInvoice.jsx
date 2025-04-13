import React from 'react';
import { Head } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import Table from "@/Components/Table.jsx";
import {FaArrowLeft} from "react-icons/fa";
import LinkButton from "@/Components/LinkButton.jsx";

const PurchaseInvoice = ({ purchase }) => {
    // Process data to group weight-type products
    const headers = ["Product", "Size", "Quantity", "Weight", "Unit Price", "Total Price"];

    // Group items by product for weight type products
    const groupedItems = {};
    const quantityItems = [];

    purchase.items.forEach(item => {
        const { product_size } = item;
        const productName = product_size?.product?.name ?? '-';
        const sizeName = product_size?.name ?? '-';

        if (product_size.product.type === 'quantity') {
            // For quantity type, keep as is
            quantityItems.push({
                product: productName,
                size: sizeName,
                quantity: `${item.quantity} Pcs.`,
                weight: '-',
                unit_price: `${item.unit_price_display} Rs.`,
                total_price: `${item.total_price} Rs.`
            });
        } else {
            // For weight type, group by product name
            if (!groupedItems[productName]) {
                groupedItems[productName] = {
                    product: productName,
                    sizes: [],
                    totalQuantity: 0,
                    weight: 0,
                    totalPrice: 0
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
        // Calculate total price by summing each size's weight * unit price
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
            weight: `${group.weight} KG`,
            unit_price: `${group.sizes[0].unitPrice} Rs.`,
            total_price: `${calculatedTotalPrice} Rs.`
        };
    });

    const data = [...quantityItems, ...weightItems];

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            <Head title={`Invoice: INV-P-${purchase.id}`}/>
            <div className='flex ml-3 mb-6 print:hidden'>
                <LinkButton href={route('purchases.index')} icon={<FaArrowLeft/>}>
                    Back to Purchases
                </LinkButton>
            </div>

            <ShadowBox className="max-w-[1920px] w-[90%] mx-auto">
                <div className="p-6 flex justify-between items-center border-b">
                    <div className="flex items-center">
                        <ApplicationLogo />
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-semibold">Invoice: {`INV-P-${purchase.id}`}</h2>
                    </div>
                </div>

                <div className="bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="mb-2"><span className="font-medium">Invoice ID:</span> {`INV-P-${purchase.id}`}</p>
                            <p><span className="font-medium">Supplier:</span> {purchase.supplier?.name}</p>
                        </div>
                        <div>
                            <p className="mb-2"><span className="font-medium">Purchase Date:</span> {purchase.purchase_date_display}</p>
                            <p>
                                <span className="font-medium">Payment Method:</span> <span className='capitalize'>{purchase.payments.map(p => p.method).join(', ')}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <Table headers={headers} data={data} />
                </div>

                <div className="p-6 border-t">
                    <div className="flex justify-end">
                        <div className="w-64">
                            <div className="flex justify-between mb-2">
                                <span className="font-medium">Sub Total:</span>
                                <span>{purchase.total_amount_formatted} Rs</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium">Remaining Balance:</span>
                                <span>{purchase.remaining_balance_formatted || "0"} Rs</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                                <span>Total Price:</span>
                                <span className="text-green-600">{purchase.total_amount_formatted} Rs</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 border-t">
                    <div className="mb-4">
                        <h3 className="font-semibold">LG Kitchenware Showroom</h3>
                        <p><span className="font-medium">Address:</span> Muslim Road, Opposite Mini Stadium, Gujranwala</p>
                        <p><span className="font-medium">Phone:</span> 055-4441095</p>
                    </div>

                    <div className="flex justify-center mt-6 print:hidden">
                        <button
                            onClick={() => window.print()}
                            className="bg-red-600 text-white px-6 py-2 rounded shadow-sm hover:bg-red-700 focus:outline-none"
                        >
                            Print Invoice
                        </button>
                    </div>
                </div>
            </ShadowBox>
        </div>
    );
};

export default PurchaseInvoice;
