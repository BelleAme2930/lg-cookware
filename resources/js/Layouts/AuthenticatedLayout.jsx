import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import {Link} from '@inertiajs/react';
import Swal from 'sweetalert2';
import axios from 'axios';


export default function AuthenticatedLayout({header, children}) {

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white print:hidden">
                <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo/>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('categories.index')}
                                    active={route().current('categories.index')}
                                >
                                    Categories
                                </NavLink>
                                <NavLink
                                    href={route('products.index')}
                                    active={route().current('products.index')}
                                >
                                    Products
                                </NavLink>
                                <NavLink
                                    href={route('accounts.index')}
                                    active={route().current('accounts.index')}
                                >
                                    Accounts
                                </NavLink>
                                <NavLink
                                    href={route('expenses.index')}
                                    active={route().current('expenses.index')}
                                >
                                    Expenses
                                </NavLink>
                                <NavLink
                                    href={route('suppliers.index')}
                                    active={route().current('suppliers.index')}
                                >
                                    Suppliers
                                </NavLink>
                                <NavLink
                                    href={route('customers.index')}
                                    active={route().current('customers.index')}
                                >
                                    Customers
                                </NavLink>
                                <NavLink
                                    href={route('purchases.index')}
                                    active={route().current('purchases.index')}
                                >
                                    Purchases
                                </NavLink>
                                <NavLink
                                    href={route('sales.index')}
                                    active={route().current('sales.index')}
                                >
                                    Sales
                                </NavLink>
                                <NavLink
                                    href={route('supplier.ledger.index')}
                                    active={route().current('supplier.ledger.index')}
                                >
                                    Supplier Ledgers
                                </NavLink>
                                <NavLink
                                    href={route('customer.ledger.index')}
                                    active={route().current('customer.ledger.index')}
                                >
                                    Customer Ledgers
                                </NavLink>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Reset Database?',
                                                text: 'This will delete all data and reseed. Confirm your password to proceed.',
                                                icon: 'warning',
                                                input: 'password',
                                                inputPlaceholder: 'Enter your password',
                                                showCancelButton: true,
                                                confirmButtonColor: '#d33',
                                                cancelButtonColor: '#3085d6',
                                                confirmButtonText: 'Yes, reset it!',
                                                preConfirm: (password) => {
                                                    if (!password) {
                                                        Swal.showValidationMessage('Password is required');
                                                    }
                                                    return password;
                                                }
                                            }).then((result) => {
                                                if (result.isConfirmed && result.value) {
                                                    axios.post(route('testing.reset-db'), {password: result.value})
                                                        .then(response => {
                                                            Swal.fire('Success', response.data.message, 'success').then(() => {
                                                                window.location.reload();
                                                            });
                                                        })
                                                        .catch(error => {
                                                            Swal.fire('Error', error.response?.data?.message || 'Something went wrong.', 'error');
                                                        });
                                                }
                                            });
                                        }}
                                        className="rounded bg-red-600 p-2 text-white hover:bg-red-700"
                                    >
                                        Reset DB
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-full px-4 py-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className='mx-auto max-w-full sm:px-6 lg:px-8 py-4'>{children}</main>
        </div>
    );
}
