import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo />
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
