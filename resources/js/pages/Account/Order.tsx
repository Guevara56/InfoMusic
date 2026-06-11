import PublicLayout from '@/layouts/public-layout';
import { Head, Link, usePage } from '@inertiajs/react';

interface Item {
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
}

interface Order {
    id: number;
    status: string;
    total: number;
    created_at: string;

    name: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;

    items: Item[];
}

export default function OrderPage() {
    const { order } = usePage<{ order: Order }>().props;

    return (
        <PublicLayout>
            <Head title={`Pedido #${order.id}`} />

            <div
                style={{
                    maxWidth: 900,
                    margin: '0 auto',
                }}
            >
                <Link
                    href="/account"
                    style={{
                        color: '#c8f050',
                        textDecoration: 'none',
                    }}
                >
                    ← Volver a mi cuenta
                </Link>

                <h1
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        fontSize: '2rem',
                    }}
                >
                    Pedido #{order.id}
                </h1>

                <div
                    style={{
                        background: '#13131f',
                        border: '1px solid #1e1e2e',
                        borderRadius: 12,
                        padding: '1.5rem',
                        marginBottom: 20,
                    }}
                >
                    <p><strong>Estado:</strong> {order.status}</p>
                    <p><strong>Fecha:</strong> {order.created_at}</p>
                    <p><strong>Total:</strong> {Number(order.total).toFixed(2)} €</p>
                </div>

                <div
                    style={{
                        background: '#13131f',
                        border: '1px solid #1e1e2e',
                        borderRadius: 12,
                        padding: '1.5rem',
                        marginBottom: 20,
                    }}
                >
                    <h2>Dirección de envío</h2>

                    <p>{order.name}</p>
                    <p>{order.email}</p>

                    {order.phone && (
                        <p>{order.phone}</p>
                    )}

                    <p>{order.address}</p>
                    <p>
                        {order.city} - {order.postal_code}
                    </p>
                    <p>{order.country}</p>
                </div>

                <div
                    style={{
                        background: '#13131f',
                        border: '1px solid #1e1e2e',
                        borderRadius: 12,
                        padding: '1.5rem',
                    }}
                >
                    <h2>Productos</h2>

                    {order.items.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px 0',
                                borderBottom:
                                    index !== order.items.length - 1
                                        ? '1px solid #1e1e2e'
                                        : 'none',
                            }}
                        >
                            <div>
                                {item.name} x {item.quantity}
                            </div>

                            <div>
                                {Number(item.subtotal).toFixed(2)} €
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}