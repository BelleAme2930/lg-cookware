import React from 'react';
import Table from "@/Components/Table.jsx";
import Badge from "@/Components/Badge.jsx";

const PurchasePaymentDetails = ({ payments }) => {
    if (!payments || payments.length === 0) {
        return (
            <div className="text-center py-4 text-gray-500">
                No payment records found.
            </div>
        );
    }

    const paymentData = payments.map((payment) => {
        // Define method badge color based on payment method
        let methodColor;
        switch (payment.method) {
            case 'cash':
                methodColor = 'green';
                break;
            case 'transfer':
                methodColor = 'blue';
                break;
            case 'credit':
                methodColor = 'red';
                break;
            case 'cheque':
                methodColor = 'yellow';
                break;
            default:
                methodColor = 'gray';
        }

        let additionalInfo = '';

        if (payment.method === 'credit' && payment.due_date_display) {
            additionalInfo = `Due: ${payment.due_date_display}`;
            if (payment.remaining_balance) {
                additionalInfo += ` | Remaining: ${payment.remaining_balance_formatted} Rs.`;
            }
        } else if (payment.method === 'transfer' && payment.account) {
            additionalInfo = `Account: ${payment.account.title}`;
        } else if (payment.method === 'cheque') {
            additionalInfo = `${payment.cheque_number} | ${payment.bank_name}`;
        }

        return {
            id: payment.id,
            method: <Badge color={methodColor}>{payment.method_display}</Badge>,
            date: payment.payment_date_display,
            amount: `${payment.amount_formatted} Rs.`,
            details: additionalInfo || '-',
            notes: payment.notes || '-',
        };
    });

    const headers = ["Id", "Method", "Date", "Amount", "Details", "Notes"];

    return (
        <Table
            headers={headers}
            data={paymentData}
        />
    );
};

export default PurchasePaymentDetails;
