import PublicLayout from '@/layouts/public-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ChevronRight, Package, ShoppingBag } from 'lucide-react';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
    image?: string | null;
}

interface Order {
    id: number;
    total: number;
    status: string;
    created_at: string;
    items_count: number;
    items: OrderItem[];
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
    'Pendiente': { bg: 'rgba(234,179,8,0.12)', color: '#eab308' },
    'Pagado': { bg: 'rgba(200,240,80,0.12)', color: '#c8f050' },
    'Enviado': { bg: 'rgba(80,200,240,0.12)', color: '#50c8f0' },
    'Entregado': { bg: 'rgba(80,240,128,0.12)', color: '#50f080' },
    'Cancelado': { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
};

function pImg(v: string | null | undefined) {
    if (!v) return null;
    return v.startsWith('http') ? v : `/storage/${v}`;
}

export default function Orders() {
    const { orders } = usePage<{ orders: Order[] }>().props;

    return (
        <PublicLayout>
            <Head title="Mis pedidos — InfoMusic" />

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '1rem 0 4rem' }}>

                {/* Cabecera */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, margin: 0 }}>
                        Mis pedidos
                    </h1>
                    <Link href="/account"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#666', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#c8f050'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#666'; }}>
                        <ArrowLeft size={13} /> Volver a mi cuenta
                    </Link>
                </div>

                {!orders.length ? (
                    <div style={{ background: '#13131f', border: '1px dashed #1e1e2e', borderRadius: 14, padding: '3rem', textAlign: 'center', color: '#555' }}>
                        <ShoppingBag size={40} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.25 }} />
                        <p style={{ marginBottom: '1.2rem', fontSize: 15 }}>Todavía no has realizado ningún pedido.</p>
                        <a href="/explore/shop" style={{ display: 'inline-block', background: '#c8f050', color: '#0d0d17', fontWeight: 700, fontSize: 13, padding: '9px 20px', borderRadius: 8, textDecoration: 'none' }}>
                            Ir a la tienda
                        </a>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {orders.map(order => {
                            const st = STATUS_STYLES[order.status] ?? { bg: 'rgba(255,255,255,0.07)', color: '#888' };
                            return (
                                <div key={order.id} style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 14, overflow: 'hidden' }}>

                                    {/* Cabecera del pedido */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', flexWrap: 'wrap', gap: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                            <span style={{ fontWeight: 700, fontSize: 15 }}>Pedido #{order.id}</span>
                                            <span style={{ background: st.bg, color: st.color, fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 20, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                                {order.status}
                                            </span>
                                            <span style={{ color: '#444', fontSize: 12 }}>{order.created_at}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{ color: '#c8f050', fontWeight: 800, fontSize: 16 }}>{Number(order.total).toFixed(2)} €</span>
                                            <Link href={`/account/orders/${order.id}`}
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#666', fontSize: 12, fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s' }}
                                                onMouseEnter={e => { e.currentTarget.style.color = '#c8f050'; }}
                                                onMouseLeave={e => { e.currentTarget.style.color = '#666'; }}>
                                                Ver detalles <ChevronRight size={13} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Items con imágenes */}
                                    <div style={{ borderTop: '1px solid #1a1a2a', padding: '0.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 12, marginBottom: 4 }}>
                                            <Package size={12} /> {order.items_count} producto{order.items_count !== 1 ? 's' : ''}
                                        </div>
                                        {order.items.map((item, i) => {
                                            const src = pImg(item.image);
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    {/* Miniatura */}
                                                    <div style={{ width: 38, height: 38, borderRadius: 7, overflow: 'hidden', flexShrink: 0, background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        {src
                                                            ? <img src={src} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                                            : <ShoppingBag size={14} color="#2a2a4a" />}
                                                    </div>
                                                    <span style={{ flex: 1, fontSize: 13, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.name} <span style={{ color: '#444' }}>×{item.quantity}</span>
                                                    </span>
                                                    <span style={{ fontSize: 13, color: '#c8f050', fontWeight: 600, flexShrink: 0 }}>
                                                        {Number(item.subtotal).toFixed(2)} €
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}