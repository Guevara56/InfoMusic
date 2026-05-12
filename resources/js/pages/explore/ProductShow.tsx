import { ShoppingBag, ArrowLeft as Back } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
 
interface ProductDetail {
    id: number; name: string; price: number; description: string;
    artist: { id: number; name: string; country: string };
    category?: { name: string };
}
 
export default function ProductShow({ product }: { product: ProductDetail }) {
    return (
        <PublicLayout>
            <Head title={`${product.name} — InfoMusic`} />
            <a href="/explore/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: '2rem' }}>
                <Back size={14} /> Volver a la tienda
            </a>
 
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)', borderRadius: 16, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={80} color="#2a2a4a" />
                </div>
 
                <div>
                    {product.category && <span className="tag" style={{ marginBottom: 12, display: 'inline-block' }}>{product.category.name}</span>}
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.1 }}>{product.name}</h1>
                    <a href={`/explore/artists/${product.artist?.id}`} style={{ color: '#777', textDecoration: 'none', fontSize: 14 }}>{product.artist?.name}</a>
 
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#c8f050', fontFamily: 'Playfair Display, serif', margin: '1.5rem 0' }}>
                        {Number(product.price).toFixed(2)} €
                    </div>
 
                    {product.description && <p style={{ color: '#777', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>{product.description}</p>}
 
                    <div style={{ padding: '1rem 1.5rem', background: '#13131f', border: '1px solid #2a2a3a', borderRadius: 10, fontSize: 13, color: '#555' }}>
                        💡 Este es un catálogo informativo. Las compras no están habilitadas.
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
