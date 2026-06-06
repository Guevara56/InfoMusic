import { ArrowLeft as Back, ShoppingCart, Plus, Minus } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface ProductDetail {
    id: number; name: string; price: number; description: string;
    image: string | null;
    artist: { id: number; name: string; country: string; avatar: string | null };
    category?: { name: string };
}

interface SharedProps {
    auth: { user: { id: number; name: string; role: string } | null };
}

const pImg = (v: string | null) => !v ? '/images/default-product.svg' : v.startsWith('http') ? v : `/storage/${v}`;
const aImg = (v: string | null) => !v ? '/images/default-artist.svg'  : v.startsWith('http') ? v : `/storage/${v}`;

export default function ProductShow({ product }: { product: ProductDetail }) {
    const { auth } = usePage().props as unknown as SharedProps;
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        if (!auth?.user) { window.location.href = '/login'; return; }
        setAdding(true);
        router.post('/cart/add', { product_id: product.id, quantity }, {
            preserveScroll: true,
            onSuccess: () => { setAdded(true); setTimeout(() => setAdded(false), 2000); },
            onFinish: () => setAdding(false),
        });
    };

    return (
        <PublicLayout>
            <Head title={`${product.name} — InfoMusic`} />
            <a href="/explore/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: '2rem' }}>
                <Back size={14} /> Volver a la tienda
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

                {/* Imagen producto */}
                <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '1' }}>
                    <img src={pImg(product.image)} alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { (e.target as HTMLImageElement).src = '/images/default-product.svg'; }} />
                </div>

                {/* Info */}
                <div>
                    {product.category && <span className="tag" style={{ marginBottom: 12, display: 'inline-block' }}>{product.category.name}</span>}
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.1 }}>
                        {product.name}
                    </h1>

                    {/* Artista con avatar */}
                    <a href={`/explore/artists/${product.artist?.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: '1rem' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', background: '#1e1e3a', flexShrink: 0 }}>
                            <img src={aImg(product.artist?.avatar)} alt={product.artist?.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={e => { (e.target as HTMLImageElement).src = '/images/default-artist.svg'; }} />
                        </div>
                        <span style={{ color: '#777', fontSize: 14 }}>{product.artist?.name}</span>
                    </a>

                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#c8f050', fontFamily: 'Playfair Display, serif', margin: '1.5rem 0' }}>
                        {Number(product.price).toFixed(2)} €
                    </div>

                    {product.description && (
                        <p style={{ color: '#777', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>{product.description}</p>
                    )}

                    {/* Cantidad */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.2rem' }}>
                        <span style={{ fontSize: 13, color: '#666' }}>Cantidad:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}
                                style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid #2a2a3a', background: 'transparent', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: quantity <= 1 ? 0.3 : 1 }}>
                                <Minus size={13} />
                            </button>
                            <span style={{ width: 28, textAlign: 'center', fontWeight: 700, fontSize: 16 }}>{quantity}</span>
                            <button onClick={() => setQuantity(q => Math.min(99, q + 1))}
                                style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid #2a2a3a', background: 'transparent', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Plus size={13} />
                            </button>
                        </div>
                    </div>

                    {/* Añadir al carrito */}
                    <button onClick={handleAddToCart} disabled={adding}
                        style={{ width: '100%', padding: '14px 20px', background: added ? '#4a7a10' : '#c8f050', color: '#0a0a0f', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: adding ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.3s' }}>
                        <ShoppingCart size={17} />
                        {adding ? 'Añadiendo...' : added ? '¡Añadido al carrito!' : 'Añadir al carrito'}
                    </button>

                    {!auth?.user && (
                        <p style={{ fontSize: 12, color: '#555', textAlign: 'center', marginTop: '0.8rem' }}>
                            <a href="/login" style={{ color: '#c8f050', textDecoration: 'none' }}>Inicia sesión</a> para añadir al carrito
                        </p>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}