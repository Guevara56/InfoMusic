import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';


interface Artist { id: number; name: string; country: string; avatar: string | null; label?: { name: string }; }
interface Song { id: number; title: string; duration: string; release_year: string; image: string | null; artist: Artist; genres: { name: string }[]; }
interface Genre { id: number; name: string; }
interface Product { id: number; name: string; price: number; image: string | null; artist: Artist; category?: { name: string }; }

interface Props { artists: Artist[]; songs: Song[]; genres: Genre[]; products: Product[]; }

const GENRE_COLORS = ['#c8f050', '#50c8f0', '#f050c8', '#f0c850', '#50f0c8', '#c850f0', '#f08050', '#50f080'];

const aImg = (v: string | null) => !v ? '/images/default-artist.svg' : v.startsWith('http') ? v : `/storage/${v}`;
const pImg = (v: string | null) => !v ? '/images/default-product.svg' : v.startsWith('http') ? v : `/storage/${v}`;
const sImg = (v: string | null) => !v ? '/images/default-song.svg' : v.startsWith('http') ? v : `/storage/${v}`;

export default function Home({ artists, songs, genres, products }: Props) {
    return (
        <PublicLayout>
            <Head title="InfoMusic — Inicio" />

            {/* HERO */}
            <section style={{
                position: 'relative',
                padding: '5rem 0 6rem',
                marginBottom: '4rem',
                overflow: 'hidden',
            }}>
                {/* Fondo decorativo */}
                <div style={{
                    position: 'absolute',
                    width: 500,
                    height: 500,
                    borderRadius: '50%',
                    background: 'rgba(200,240,80,0.08)',
                    filter: 'blur(140px)',
                    top: -200,
                    right: -150,
                    pointerEvents: 'none',
                }} />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '3rem',
                    alignItems: 'center',
                }}>

                    {/* TEXTO */}
                    <div>
                        <p style={{
                            fontSize: 12,
                            letterSpacing: '0.2em',
                            color: '#c8f050',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                        }}>
                            Plataforma musical
                        </p>

                        <h1 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 'clamp(3rem, 6vw, 5rem)',
                            fontWeight: 900,
                            lineHeight: 1,
                            marginBottom: '1.5rem',
                        }}>
                            Toda la música
                            <br />
                            en un solo lugar
                        </h1>

                        <p style={{
                            color: '#888',
                            fontSize: '1.05rem',
                            lineHeight: 1.8,
                            maxWidth: 550,
                            marginBottom: '2rem',
                        }}>
                            Descubre artistas, explora canciones, consulta información musical y encuentra merchandising oficial desde una única plataforma.
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: 12,
                            flexWrap: 'wrap',
                            marginBottom: '2rem',
                        }}>
                            <a href="/explore/artists" style={{
                                padding: '14px 28px',
                                background: '#c8f050',
                                color: '#111',
                                borderRadius: 12,
                                textDecoration: 'none',
                                fontWeight: 700,
                            }}>
                                Explorar artistas
                            </a>

                            <a href="/explore/shop" style={{
                                padding: '14px 28px',
                                border: '1px solid #2a2a3a',
                                color: '#ddd',
                                borderRadius: 12,
                                textDecoration: 'none',
                                fontWeight: 600,
                            }}>
                                Ir a la tienda
                            </a>
                        </div>
                    </div>

                    {/* COLLAGE DE ARTISTAS */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2,1fr)',
                        gap: 16,
                    }}>
                        {artists.slice(0, 4).map((artist) => (
                            <a
                                key={artist.id}
                                href={`/explore/artists/${artist.id}`}
                                style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: 20,
                                    aspectRatio: '1',
                                    background: '#13131f',
                                    border: '1px solid #1f1f2f',
                                }}
                            >
                                <img
                                    src={aImg(artist.avatar)}
                                    alt={artist.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />

                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,.8), transparent)',
                                }} />

                                <div style={{
                                    position: 'absolute',
                                    bottom: 12,
                                    left: 12,
                                }}>
                                    <div style={{
                                        fontWeight: 700,
                                        fontSize: '0.95rem',
                                    }}>
                                        {artist.name}
                                    </div>

                                    <div style={{
                                        fontSize: 12,
                                        color: '#bbb',
                                    }}>
                                        {artist.country}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                </div>
            </section>

            {/* ARTISTAS DESTACADOS */}
            <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>Artistas destacados</h2>
                    <a href="/explore/artists" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#c8f050', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>Ver todos <ArrowRight size={14} /></a>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                    {artists.slice(0, 8).map(artist => (
                        <a key={artist.id} href={`/explore/artists/${artist.id}`} className="card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#1e1e3a' }}>
                                <img src={aImg(artist.avatar)} alt={artist.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={e => { (e.target as HTMLImageElement).src = '/images/default-artist.svg'; }} />
                            </div>
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
                    <a href="/explore/genres" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#c8f050', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>Ver todos <ArrowRight size={14} /></a>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {genres.map((genre, i) => (
                        <a key={genre.id} href={`/explore/genres/${genre.id}`} style={{
                            padding: '10px 20px', borderRadius: 100,
                            background: `${GENRE_COLORS[i % GENRE_COLORS.length]}15`,
                            border: `1px solid ${GENRE_COLORS[i % GENRE_COLORS.length]}30`,
                            color: GENRE_COLORS[i % GENRE_COLORS.length],
                            textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => (e.currentTarget.style.background = `${GENRE_COLORS[i % GENRE_COLORS.length]}25`)}
                            onMouseLeave={e => (e.currentTarget.style.background = `${GENRE_COLORS[i % GENRE_COLORS.length]}15`)}
                        >{genre.name}</a>
                    ))}
                </div>
            </section>

            {/* CANCIONES RECIENTES */}
            <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>Canciones recientes</h2>
                    <a href="/explore/songs" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#c8f050', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>Ver todas <ArrowRight size={14} /></a>
                </div>
                <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, overflow: 'hidden' }}>
                    {songs.slice(0, 8).map((song, i) => (
                        <a key={song.id} href={`/explore/songs/${song.id}`} style={{
                            display: 'grid', gridTemplateColumns: '44px 1fr auto',
                            alignItems: 'center', gap: 14, padding: '0.8rem 1.4rem',
                            borderBottom: i < 7 ? '1px solid #1a1a2a' : 'none',
                            textDecoration: 'none', color: 'inherit', transition: 'background 0.15s',
                        }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                            <div style={{ width: 36, height: 36, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                                <img src={sImg(song.image)} alt={song.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={e => { (e.target as HTMLImageElement).src = '/images/default-song.svg'; }} />
                            </div>
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

            {/* PRODUCTOS */}
            {products.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>Tienda</h2>
                        <a href="/explore/shop" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#c8f050', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>Ver todo <ArrowRight size={14} /></a>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                        {products.slice(0, 6).map(product => (
                            <a key={product.id} href={`/explore/shop/${product.id}`} className="card">
                                <div style={{ height: 120, overflow: 'hidden' }}>
                                    <img src={pImg(product.image)} alt={product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={e => { (e.target as HTMLImageElement).src = '/images/default-product.svg'; }} />
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