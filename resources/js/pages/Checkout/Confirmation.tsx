import PublicLayout from '@/layouts/public-layout';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle, ShoppingBag, MapPin, Mail, ArrowRight } from 'lucide-react';

interface OrderItem {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    image?: string | null;
}

interface Order {
    id: number;
    total: number;
    status: string;
    name: string;
    email: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
    items: OrderItem[];
}

interface PageProps {
    order: Order | null;
}

function pImg(v: string | null | undefined) {
    if (!v) return null;
    if (v.startsWith('http://localhost/storage/') || v.startsWith('http://localhost:8000/storage/')) {
        const path = v.replace(/^http:\/\/localhost(:\d+)?\/storage\//, '');
        return `/storage/${path}`;
    }
    if (v.startsWith('http')) return v;
    if (v.startsWith('storage/')) return `/${v}`;
    return `/storage/${v}`;
}

export default function Confirmation() {
    const { order } = usePage().props as unknown as PageProps;

    if (!order) {
        return (
            <PublicLayout>
                <Head title="Pedido confirmado — InfoMusic" />
                <div style={{ textAlign: 'center', padding: '6rem', color: '#555' }}>
                    <p>No se encontró el pedido.</p>
                    <a href="/" style={{ color: '#c8f050' }}>Volver al inicio</a>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="¡Pedido confirmado! — InfoMusic" />


            <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', paddingTop: '2rem' }}>

                {/* Icono éxito */}
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(200,240,80,0.1)', border: '2px solid rgba(200,240,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <CheckCircle size={40} color="#c8f050" />
                </div>

                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.8rem' }}>
                    ¡Pedido confirmado!
                </h1>
                <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                    Gracias {order.name.split(' ')[0]}, tu pedido #{order.id} ha sido recibido correctamente.
                </p>

                {/* Tarjeta del pedido */}
                <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 14, padding: '1.5rem', textAlign: 'left', marginBottom: '1.5rem' }}>

                    {/* Items */}
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                        Productos
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.2rem' }}>
                        {order.items.map((item, i) => {
                            const src = pImg(item.image);
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    {/* Miniatura */}
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 8,
                                        overflow: 'hidden', flexShrink: 0,
                                        background: '#1a1a2e',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {src ? (
                                            <img
                                                src={src}
                                                alt={item.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                            />
                                        ) : (
                                            <ShoppingBag size={16} color="#2a2a4a" />
                                        )}
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {item.name}
                                        </div>
                                        <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>
                                            ×{item.quantity} · {Number(item.price).toFixed(2)} € c/u
                                        </div>
                                    </div>

                                    <div style={{ fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                                        {Number(item.subtotal).toFixed(2)} €
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Total */}
                    <div style={{ borderTop: '1px solid #1e1e2e', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span style={{ fontWeight: 700 }}>Total</span>
                        <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#c8f050', fontFamily: 'Playfair Display, serif' }}>
                            {Number(order.total).toFixed(2)} €
                        </span>
                    </div>

                    {/* Dirección y email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                            <div style={{ fontSize: 11, color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                                <MapPin size={11} /> Envío a
                            </div>
                            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>
                                {order.address}<br />
                                {order.postal_code} {order.city}<br />
                                {order.country}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                                <Mail size={11} /> Confirmación a
                            </div>
                            <div style={{ fontSize: 13, color: '#aaa' }}>{order.email}</div>
                            <div style={{ marginTop: 8, display: 'inline-block', padding: '3px 10px', background: 'rgba(200,240,80,0.1)', border: '1px solid rgba(200,240,80,0.2)', borderRadius: 4, fontSize: 11, color: '#c8f050' }}>
                                {order.status}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 22px', background: '#c8f050', color: '#0a0a0f', borderRadius: 9, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
                        Volver al inicio <ArrowRight size={14} />
                    </a>
                    <a href="/explore/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 22px', border: '1px solid #2a2a3a', color: '#ccc', borderRadius: 9, textDecoration: 'none', fontSize: 14 }}>
                        Seguir comprando
                    </a>
                </div>

            </div>

        </PublicLayout>
    );
}