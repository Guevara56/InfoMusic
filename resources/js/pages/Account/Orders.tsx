import PublicLayout from '@/layouts/public-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Package, ShoppingBag } from 'lucide-react';

interface OrderItem { name: string; quantity: number; price: number; subtotal: number; }
interface Order { id: number; total: number; status: string; created_at: string; items_count: number; items: OrderItem[]; }

const STATUS_COLORS: Record<string, string> = {
    'Pendiente': '#f0c850', 'Pagado': '#c8f050', 'Enviado': '#50c8f0',
    'Entregado': '#50f080', 'Cancelado': '#ef4444',
};

export default function Orders() {
    const { orders } = usePage<{ orders: Order[] }>().props;

    return (
        <PublicLayout>
            <Head title="Mis pedidos — InfoMusic" />

            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900 }}>
                        Mis pedidos
                    </h1>
                    <Link href="/account" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>
                        ← Volver a mi cuenta
                    </Link>
                </div>

                {!orders.length ? (
                    <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, padding: '3rem', textAlign: 'center', color: '#555' }}>
                        <ShoppingBag size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                        <p style={{ marginBottom: '1rem' }}>Todavía no has realizado ningún pedido.</p>
                        <a href="/explore/shop" style={{ color: '#c8f050', textDecoration: 'none', fontSize: 14 }}>Ir a la tienda →</a>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {orders.map(order => (
                            <div key={order.id} style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, padding: '1.2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                            <span style={{ fontWeight: 700 }}>Pedido #{order.id}</span>
                                            <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: `${STATUS_COLORS[order.status] ?? '#888'}20`, color: STATUS_COLORS[order.status] ?? '#888' }}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: 12, color: '#555' }}>
                                            {order.created_at} · {order.items_count} producto{order.items_count !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 700, color: '#c8f050', fontSize: '1.05rem' }}>
                                            {Number(order.total).toFixed(2)} €
                                        </div>
                                        <Link href={`/account/orders/${order.id}`} style={{ fontSize: 12, color: '#c8f050', textDecoration: 'none', fontWeight: 600 }}>
                                            Ver detalles →
                                        </Link>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #1e1e2e', paddingTop: 10 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: '#555', fontSize: 12 }}>
                                        <Package size={12} /> Productos
                                    </div>
                                    {order.items.map((item, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: 13, color: '#888' }}>
                                            <span>{item.name} × {item.quantity}</span>
                                            <span style={{ color: '#c8f050' }}>{Number(item.subtotal).toFixed(2)} €</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}