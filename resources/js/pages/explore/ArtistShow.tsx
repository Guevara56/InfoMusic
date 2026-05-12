import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { MapPin, Calendar, Music2, ShoppingBag, ExternalLink } from 'lucide-react';

interface Label       { id: number; name: string; }
interface Genre       { id: number; name: string; }
interface Song        { id: number; title: string; duration: string; release_year: string; genres: Genre[]; }
interface Product     { id: number; name: string; price: number; category?: { name: string }; }
interface SocialMedia { id: number; platform: string; url: string; followers: string; }
interface Artist {
    id: number; name: string; bio: string; country: string;
    formed_year: string; avatar: string | null;
    label?: Label; songs: Song[]; products: Product[]; socialMedia: SocialMedia[];
}

interface Props { artist: Artist; }

const PLATFORM_COLORS: Record<string, string> = {
    Instagram: '#e1306c', Twitter: '#1da1f2', YouTube: '#ff0000',
    TikTok: '#69c9d0', Facebook: '#1877f2', Spotify: '#1db954',
};

export default function ArtistShow({ artist }: Props) {
    return (
        <PublicLayout>
            <Head title={`${artist.name} — InfoMusic`} />

            {/* HEADER */}
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap' }}>
                <div style={{ width: 130, height: 130, borderRadius: '50%', background: 'linear-gradient(135deg, #1e1e3a, #2a2a5a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '3rem', fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#c8f050' }}>
                    {artist.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, letterSpacing: '0.2em', color: '#c8f050', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Artista</p>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1rem' }}>{artist.name}</h1>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: '1rem' }}>
                        {artist.country && <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#777' }}><MapPin size={13} /> {artist.country}</span>}
                        {artist.formed_year && <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#777' }}><Calendar size={13} /> Desde {artist.formed_year}</span>}
                        {artist.label && <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#c8f050' }}><Music2 size={13} /> {artist.label.name}</span>}
                    </div>
                    {artist.bio && <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 580 }}>{artist.bio}</p>}

                    {/* Social media */}
                    {artist.socialMedia?.length > 0 && (
                        <div style={{ display: 'flex', gap: 8, marginTop: '1.2rem', flexWrap: 'wrap' }}>
                            {artist.socialMedia.map(sm => (
                                <a key={sm.id} href={sm.url} target="_blank" rel="noreferrer" style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500,
                                    background: `${PLATFORM_COLORS[sm.platform] ?? '#555'}20`,
                                    color: PLATFORM_COLORS[sm.platform] ?? '#ccc',
                                    border: `1px solid ${PLATFORM_COLORS[sm.platform] ?? '#555'}40`,
                                    textDecoration: 'none',
                                }}>
                                    <ExternalLink size={11} />
                                    {sm.platform}
                                    {sm.followers && <span style={{ color: '#666', marginLeft: 2 }}>· {sm.followers}</span>}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
                {/* CANCIONES */}
                <div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
                        Canciones <span style={{ color: '#444', fontSize: '1rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>({artist.songs?.length ?? 0})</span>
                    </h2>
                    {artist.songs?.length > 0 ? (
                        <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, overflow: 'hidden' }}>
                            {artist.songs.map((song, i) => (
                                <a key={song.id} href={`/explore/songs/${song.id}`} style={{
                                    display: 'grid', gridTemplateColumns: '28px 1fr auto',
                                    alignItems: 'center', gap: 14,
                                    padding: '0.85rem 1.2rem',
                                    borderBottom: i < artist.songs.length - 1 ? '1px solid #1a1a2a' : 'none',
                                    textDecoration: 'none', color: 'inherit',
                                    transition: 'background 0.15s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <span style={{ color: '#444', fontSize: 12, textAlign: 'right' }}>{i + 1}</span>
                                    <div>
                                        <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{song.title}</div>
                                        <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>
                                            {song.release_year}
                                            {song.genres?.map(g => (
                                                <span key={g.id} className="tag" style={{ marginLeft: 6 }}>{g.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 12, color: '#555' }}>{song.duration}</span>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#555', fontSize: 14 }}>No hay canciones registradas.</p>
                    )}
                </div>

                {/* PRODUCTOS */}
                <div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
                        Tienda <span style={{ color: '#444', fontSize: '1rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>({artist.products?.length ?? 0})</span>
                    </h2>
                    {artist.products?.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {artist.products.map(product => (
                                <a key={product.id} href={`/explore/shop/${product.id}`} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0.9rem' }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 8, background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <ShoppingBag size={20} color="#2a2a4a" />
                                    </div>
                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <div style={{ fontWeight: 500, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                                        {product.category && <div style={{ fontSize: 11, color: '#555' }}>{product.category.name}</div>}
                                    </div>
                                    <div style={{ fontWeight: 700, color: '#c8f050', fontSize: '0.9rem', flexShrink: 0 }}>{Number(product.price).toFixed(2)} €</div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#555', fontSize: 14 }}>No hay productos disponibles.</p>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
