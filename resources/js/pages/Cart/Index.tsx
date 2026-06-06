import PublicLayout from '@/layouts/public-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';

interface CartItem {
    id: number; name: string; price: number; quantity: number; subtotal: number;
    image: string | null; category: string | null;
    artist: { id: number; name: string } | null;
}

interface Recommendation {
    id: number; name: string; price: number; image: string | null;
    category: string | null; artist: string | null;
}

interface PageProps {
    items: CartItem[]; total: number;
    recommendations: Recommendation[];
    flash: { message?: string };
}

const pImg = (v: string | null) => !v ? '/images/default-product.svg' : v.startsWith('http') ? v : `/storage/${v}`;

export default function Index() {
    const { items, total, recommendations, flash } = usePage().props as unknown as PageProps;
    const [loading, setLoading] = useState<number | null>(null);

    const handleQuantity = (productId: number, quantity: number) => {
        setLoading(productId);
        router.patch(`/cart/${productId}`, { quantity }, { preserveScroll: true, onFinish: () => setLoading(null) });
    };

    const handleRemove = (productId: number, name: string) => {
        if (confirm(`¿Eliminar "${name}" del carrito?`)) {
            router.delete(`/cart/${productId}/remove`, { preserveScroll: true });
        }
    };

    const handleClear = () => {
        if (confirm('¿Vaciar todo el carrito?')) router.delete('/cart/clear');
    };

    const handleAddRecommendation = (productId: number) => {
        router.post('/cart/add', { product_id: productId, quantity: 1 }, { preserveScroll: true });
    };

    return (
        <PublicLayout>
            <Head title="Mi Carrito — InfoMusic" />

            {flash?.message && (
                <div style={{ marginBottom: '1.5rem', padding: '12px 16px', background: 'rgba(200,240,80,0.1)', border: '1px solid rgba(200,240,80,0.3)', borderRadius: 8, color: '#c8f050', fontSize: 13 }}>
                    {flash.message}
                </div>
            )}

            {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#555' }}>
                    <ShoppingBag size={64} style={{ margin: '0 auto 1.5rem', opacity: 0.2 }} />
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '0.8rem', color: '#888' }}>Tu carrito está vacío</h2>
                    <p style={{ fontSize: 14, marginBottom: '2rem' }}>Explora la tienda y añade productos de tus artistas favoritos.</p>
                    <a href="/explore/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#c8f050', color: '#0a0a0f', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
                        <ShoppingBag size={16} /> Ir a la tienda
                    </a>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem', alignItems: 'start' }}>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 12 }}>
                                <ShoppingCart size={24} color="#c8f050" />
                                Mi carrito
                                <span style={{ fontSize: '1rem', color: '#555', fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>
                                    ({items.length} {items.length === 1 ? 'producto' : 'productos'})
                                </span>
                            </h1>
                            <button onClick={handleClear} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', border: '1px solid #3a2a2a', borderRadius: 8, background: 'transparent', color: '#c04040', cursor: 'pointer', fontSize: 13 }}>
                                <Trash2 size={13} /> Vaciar carrito
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {items.map(item => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '1rem 1.3rem', background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12 }}>
                                    {/* Imagen producto */}
                                    <div style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                                        <img src={pImg(item.image)} alt={item.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={e => { (e.target as HTMLImageElement).src = '/images/default-product.svg'; }} />
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 3 }}>{item.name}</div>
                                        <div style={{ fontSize: 12, color: '#666' }}>
                                            {item.artist && (
                                                <a href={`/explore/artists/${item.artist.id}`} style={{ color: '#c8f050', textDecoration: 'none' }}>{item.artist.name}</a>
                                            )}
                                            {item.category && <span style={{ color: '#555' }}> · {item.category}</span>}
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: '#e8e8f0', marginTop: 4 }}>{Number(item.price).toFixed(2)} €</div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                        <button disabled={item.quantity <= 1 || loading === item.id} onClick={() => handleQuantity(item.id, item.quantity - 1)}
                                            style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid #2a2a3a', background: 'transparent', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: item.quantity <= 1 ? 0.3 : 1 }}>
                                            <Minus size={12} />
                                        </button>
                                        <span style={{ width: 24, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{item.quantity}</span>
                                        <button disabled={item.quantity >= 99 || loading === item.id} onClick={() => handleQuantity(item.id, item.quantity + 1)}
                                            style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid #2a2a3a', background: 'transparent', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Plus size={12} />
                                        </button>
                                    </div>

                                    <div style={{ width: 80, textAlign: 'right', flexShrink: 0 }}>
                                        <div style={{ fontWeight: 700, fontSize: '1rem' }}>{Number(item.subtotal).toFixed(2)} €</div>
                                    </div>

                                    <button onClick={() => handleRemove(item.id, item.name)}
                                        style={{ width: 32, height: 32, borderRadius: 6, border: 'none', background: 'transparent', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                                        onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                                        onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* RECOMENDACIONES */}
                        {recommendations.length > 0 && (
                            <div style={{ marginTop: '3rem' }}>
                                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Sparkles size={18} color="#c8f050" /> También te puede gustar
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 10 }}>
                                    {recommendations.map(rec => (
                                        <div key={rec.id} style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 10, overflow: 'hidden' }}>
                                            <div style={{ height: 110, overflow: 'hidden' }}>
                                                <img src={pImg(rec.image)} alt={rec.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={e => { (e.target as HTMLImageElement).src = '/images/default-product.svg'; }} />
                                            </div>
                                            <div style={{ padding: '0.7rem' }}>
                                                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rec.name}</div>
                                                <div style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>{rec.artist}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#c8f050' }}>{Number(rec.price).toFixed(2)} €</span>
                                                    <button onClick={() => handleAddRecommendation(rec.id)}
                                                        style={{ padding: '4px 8px', background: 'rgba(200,240,80,0.1)', border: '1px solid rgba(200,240,80,0.2)', borderRadius: 5, color: '#c8f050', cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>
                                                        + Añadir
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RESUMEN */}
                    <div style={{ position: 'sticky', top: 80 }}>
                        <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 14, padding: '1.5rem' }}>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.2rem' }}>Resumen del pedido</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1.2rem' }}>
                                {items.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#777' }}>
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8 }}>{item.name} × {item.quantity}</span>
                                        <span style={{ flexShrink: 0 }}>{Number(item.subtotal).toFixed(2)} €</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ borderTop: '1px solid #1e1e2e', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <span style={{ fontWeight: 700, fontSize: '1rem' }}>Total</span>
                                <span style={{ fontWeight: 900, fontSize: '1.4rem', color: '#c8f050', fontFamily: 'Playfair Display, serif' }}>{Number(total).toFixed(2)} €</span>
                            </div>
                            <a href="/checkout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px', background: '#c8f050', color: '#0a0a0f', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                                Continuar con el pago <ArrowRight size={16} />
                            </a>
                            <p style={{ fontSize: 11, color: '#444', textAlign: 'center', marginTop: '0.8rem' }}>Pago seguro con Stripe</p>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}