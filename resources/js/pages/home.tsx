import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Music2, Mic2, Disc3, ShoppingBag, ArrowRight } from 'lucide-react';

interface Artist { id: number; name: string; country: string; label?: { name: string }; }
interface Song   { id: number; title: string; duration: string; release_year: string; artist: Artist; genres: { name: string }[]; }
interface Genre  { id: number; name: string; }
interface Product{ id: number; name: string; price: number; artist: Artist; category?: { name: string }; }

interface Props {
    artists:  Artist[];
    songs:    Song[];
    genres:   Genre[];
    products: Product[];
}

const GENRE_COLORS = ['#c8f050','#50c8f0','#f050c8','#f0c850','#50f0c8','#c850f0','#f08050','#50f080'];

export default function Home({ artists, songs, genres, products }: Props) {
    return (
        <PublicLayout>
            <Head title="InfoMusic — Inicio" />

            {/* HERO */}
            <section style={{ textAlign: 'center', padding: '4rem 0 5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,240,80,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <p style={{ fontSize: 12, letterSpacing: '0.2em', color: '#c8f050', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem' }}>Tu enciclopedia musical</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                    Descubre artistas,<br />
                    <span style={{ color: '#c8f050' }}>canciones</span> y más.
                </h1>
                <p style={{ color: '#777', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 2.5rem' }}>
                    Explora discografías, géneros, discográficas y el merchandising oficial de tus artistas favoritos.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="/explore/artists" style={{ padding: '12px 28px', background: '#c8f050', color: '#0a0a0f', borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Mic2 size={16} /> Explorar artistas
                    </a>
                    <a href="/explore/shop" style={{ padding: '12px 28px', border: '1px solid #2a2a3a', color: '#ccc', borderRadius: 10, fontWeight: 500, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ShoppingBag size={16} /> Ir a la tienda
                    </a>
                </div>
            </section>

            {/* STATS */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: '4rem' }}>
                {[
                    { label: 'Artistas', value: artists.length, icon: Mic2 },
                    { label: 'Canciones', value: songs.length, icon: Music2 },
                    { label: 'Géneros', value: genres.length, icon: Disc3 },
                    { label: 'Productos', value: products.length, icon: ShoppingBag },
                ].map(({ label, value, icon: Icon }) => (
                    <div key={label} style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(200,240,80,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={18} color="#c8f050" />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>{value}</div>
                            <div style={{ fontSize: 12, color: '#666', fontWeight: 500 }}>{label}</div>
                        </div>
                    </div>
                ))}
            </section>

            {/* ARTISTAS DESTACADOS */}
            <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>Artistas destacados</h2>
                    <a href="/explore/artists" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#c8f050', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                        Ver todos <ArrowRight size={14} />
                    </a>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                    {artists.slice(0, 8).map((artist) => (
                        <a key={artist.id} href={`/explore/artists/${artist.id}`} className="card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div className="avatar-circle">{artist.name.charAt(0)}</div>
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontWeight: 600, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{artist.name}</div>
                                <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{artist.country}</div>
                                {artist.label && <div style={{ fontSize: 11, color: '#c8f050', marginTop: 4 }}>{artist.label.name}</div>}
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* GÉNEROS */}
            <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>Géneros</h2>
                    <a href="/explore/genres" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#c8f050', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                        Ver todos <ArrowRight size={14} />
                    </a>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {genres.map((genre, i) => (
                        <a key={genre.id} href={`/explore/genres/${genre.id}`} style={{
                            padding: '10px 20px', borderRadius: 100,
                            background: `${GENRE_COLORS[i % GENRE_COLORS.length]}15`,
                            border: `1px solid ${GENRE_COLORS[i % GENRE_COLORS.length]}30`,
                            color: GENRE_COLORS[i % GENRE_COLORS.length],
                            textDecoration: 'none', fontSize: 14, fontWeight: 500,
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = `${GENRE_COLORS[i % GENRE_COLORS.length]}25`)}
                        onMouseLeave={e => (e.currentTarget.style.background = `${GENRE_COLORS[i % GENRE_COLORS.length]}15`)}
                        >
                            {genre.name}
                        </a>
                    ))}
                </div>
            </section>

            {/* CANCIONES RECIENTES */}
            <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>Canciones recientes</h2>
                    <a href="/explore/songs" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#c8f050', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                        Ver todas <ArrowRight size={14} />
                    </a>
                </div>
                <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, overflow: 'hidden' }}>
                    {songs.slice(0, 8).map((song, i) => (
                        <a key={song.id} href={`/explore/songs/${song.id}`} style={{
                            display: 'grid', gridTemplateColumns: '32px 1fr auto',
                            alignItems: 'center', gap: 16,
                            padding: '0.9rem 1.4rem',
                            borderBottom: i < 7 ? '1px solid #1a1a2a' : 'none',
                            textDecoration: 'none', color: 'inherit',
                            transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                            <span style={{ color: '#444', fontSize: 13, textAlign: 'right' }}>{i + 1}</span>
                            <div>
                                <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{song.title}</div>
                                <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                                    {song.artist?.name} · {song.release_year}
                                    {song.genres?.length > 0 && <span className="tag" style={{ marginLeft: 8 }}>{song.genres[0].name}</span>}
                                </div>
                            </div>
                            <span style={{ fontSize: 12, color: '#555', fontVariantNumeric: 'tabular-nums' }}>{song.duration}</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* PRODUCTOS DESTACADOS */}
            {products.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>Tienda</h2>
                        <a href="/explore/shop" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#c8f050', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                            Ver todo <ArrowRight size={14} />
                        </a>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                        {products.slice(0, 6).map((product) => (
                            <a key={product.id} href={`/explore/shop/${product.id}`} className="card">
                                <div style={{ height: 120, background: 'linear-gradient(135deg, #1a1a2e, #0f0f1a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ShoppingBag size={32} color="#2a2a4a" />
                                </div>
                                <div style={{ padding: '0.9rem' }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>{product.name}</div>
                                    <div style={{ fontSize: 12, color: '#666' }}>{product.artist?.name}</div>
                                    <div style={{ marginTop: 8, fontWeight: 700, color: '#c8f050', fontSize: '1rem' }}>{Number(product.price).toFixed(2)} €</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}