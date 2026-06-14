import PublicLayout from '@/layouts/public-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, MapPin, Package, ShoppingBag } from 'lucide-react';

interface Item {
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
    image?: string | null;
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

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
    'Pendiente':  { bg: 'rgba(234,179,8,0.12)',  color: '#eab308' },
    'Pagado':     { bg: 'rgba(200,240,80,0.12)', color: '#c8f050' },
    'Enviado':    { bg: 'rgba(80,200,240,0.12)', color: '#50c8f0' },
    'Entregado':  { bg: 'rgba(80,240,128,0.12)', color: '#50f080' },
    'Cancelado':  { bg: 'rgba(239,68,68,0.12)',  color: '#ef4444' },
};

function pImg(v: string | null | undefined) {
    if (!v) return null;
    return v.startsWith('http') ? v : `/storage/${v}`;
}

export default function OrderPage() {
    const { order } = usePage<{ order: Order }>().props;
    const st = STATUS_STYLES[order.status] ?? { bg: 'rgba(255,255,255,0.07)', color: '#888' };

    return (
        <PublicLayout>
            <Head title={`Pedido #${order.id}`} />

            <div style={{ maxWidth: 860, margin: '0 auto', padding: '1rem 0 4rem' }}>

                {/* Volver */}
                <Link href="/account/orders"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none', fontSize: 13, fontWeight: 500, marginBottom: '1.5rem', transition: 'color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#c8f050'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#666'; }}>
                    <ArrowLeft size={14} /> Volver a mis pedidos
                </Link>

                {/* Cabecera */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, fontFamily: 'Playfair Display, serif' }}>
                        Pedido <span style={{ color: '#c8f050' }}>#{order.id}</span>
                    </h1>
                    <span style={{ background: st.bg, color: st.color, fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {order.status}
                    </span>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: '1.5rem' }}>
                    {[
                        { label: 'Fecha', value: order.created_at },
                        { label: 'Total', value: `${Number(order.total).toFixed(2)} €`, accent: true },
                        { label: 'Artículos', value: `${order.items.length} producto${order.items.length !== 1 ? 's' : ''}` },
                    ].map(({ label, value, accent }) => (
                        <div key={label} style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, padding: '1rem 1.25rem' }}>
                            <div style={{ color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
                            <div style={{ fontWeight: accent ? 800 : 600, fontSize: accent ? 18 : 14, color: accent ? '#c8f050' : 'inherit' }}>{value}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>

                    {/* Productos */}
                    <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 14, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '1rem 1.25rem', borderBottom: '1px solid #1a1a2a' }}>
                            <Package size={15} color="#c8f050" />
                            <span style={{ fontWeight: 700, fontSize: 14 }}>Productos comprados</span>
                        </div>

                        {order.items.map((item, i) => {
                            const src = pImg(item.image);
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0.9rem 1.25rem', borderBottom: i !== order.items.length - 1 ? '1px solid #1a1a2a' : 'none' }}>
                                    <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {src
                                            ? <img src={src} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                            : <ShoppingBag size={20} color="#2a2a4a" />}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                                        <div style={{ fontSize: 12, color: '#555' }}>{Number(item.price).toFixed(2)} € × {item.quantity}</div>
                                    </div>
                                    <div style={{ fontWeight: 700, color: '#c8f050', fontSize: 15, flexShrink: 0 }}>{Number(item.subtotal).toFixed(2)} €</div>
                                </div>
                            );
                        })}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderTop: '1px solid #1e1e2e', background: '#0f0f18' }}>
                            <span style={{ color: '#666', fontSize: 13 }}>Total del pedido</span>
                            <span style={{ fontWeight: 800, fontSize: 18, color: '#c8f050' }}>{Number(order.total).toFixed(2)} €</span>
                        </div>
                    </div>

                    {/* Dirección */}
                    <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 14, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '1rem 1.25rem', borderBottom: '1px solid #1a1a2a' }}>
                            <MapPin size={15} color="#c8f050" />
                            <span style={{ fontWeight: 700, fontSize: 14 }}>Dirección de envío</span>
                        </div>
                        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <div style={{ fontWeight: 600, fontSize: 15 }}>{order.name}</div>
                            <div style={{ color: '#666', fontSize: 13 }}>{order.email}</div>
                            {order.phone && <div style={{ color: '#666', fontSize: 13 }}>{order.phone}</div>}
                            <div style={{ borderTop: '1px solid #1a1a2a', marginTop: 10, paddingTop: 10, color: '#aaa', fontSize: 13, lineHeight: 1.7 }}>
                                {order.address}<br />
                                {order.city}, {order.postal_code}<br />
                                {order.country}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}