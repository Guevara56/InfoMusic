import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';

 
interface Product { id: number; name: string; price: number; description: string; artist: { id: number; name: string }; category?: { name: string }; }
interface ShopPaginated { data: Product[]; current_page: number; last_page: number; total: number; links: { url: string | null; label: string; active: boolean }[]; }
 
export default function ShopIndex({ products, search: initSearch }: { products: ShopPaginated; search: string }) {
    const [search, setSearch] = useState(initSearch ?? '');
 
    const handleSearch = (v: string) => {
        setSearch(v);
        router.get('/explore/shop', { search: v }, { preserveState: true, replace: true });
    };
 
    return (
        <PublicLayout>
            <Head title="Tienda — InfoMusic" />
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 900, marginBottom: 6 }}>Tienda</h1>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>{products.total} productos disponibles</p>
            </div>
 
            <div style={{ position: 'relative', maxWidth: 400, marginBottom: '1.5rem' }}>
                <Search size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
                <input value={search} onChange={e => handleSearch(e.target.value)} placeholder="Buscar producto o artista..."
                    style={{ width: '100%', padding: '10px 14px 10px 38px', background: '#13131f', border: '1px solid #2a2a3a', borderRadius: 10, color: '#e8e8f0', fontSize: 14, outline: 'none' }} />
            </div>
 
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
                {products.data.length === 0 && (
                    <div style={{ gridColumn: '1/-1', padding: '4rem', textAlign: 'center', color: '#555' }}>No se encontraron productos.</div>
                )}
                {products.data.map(product => (
                    <a key={product.id} href={`/explore/shop/${product.id}`} className="card">
                        <div style={{ height: 130, background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShoppingBag size={36} color="#2a2a4a" />
                        </div>
                        <div style={{ padding: '1rem' }}>
                            {product.category && <span className="tag" style={{ marginBottom: 6, display: 'inline-block' }}>{product.category.name}</span>}
                            <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: 4, marginTop: 4 }}>{product.name}</div>
                            <a href={`/explore/artists/${product.artist?.id}`} onClick={e => e.stopPropagation()} style={{ fontSize: 12, color: '#666', textDecoration: 'none' }}>{product.artist?.name}</a>
                            <div style={{ marginTop: 10, fontWeight: 700, color: '#c8f050', fontSize: '1.05rem' }}>{Number(product.price).toFixed(2)} €</div>
                        </div>
                    </a>
                ))}
            </div>
 
            {products.last_page > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '2rem', flexWrap: 'wrap' }}>
                    {products.links.map((link, i) => (
                        link.url ? (
                            <a key={i} href={link.url} style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, textDecoration: 'none', background: link.active ? '#c8f050' : '#13131f', color: link.active ? '#0a0a0f' : '#888', border: '1px solid ' + (link.active ? '#c8f050' : '#2a2a3a'), fontWeight: link.active ? 700 : 400 }} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ) : <span key={i} style={{ padding: '7px 14px', color: '#333', fontSize: 13 }} dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))}
                </div>
            )}
        </PublicLayout>
    );
}
