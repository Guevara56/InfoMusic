import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { MapPin, Calendar, Music2, ExternalLink } from 'lucide-react';
import {
    FaSpotify,
    FaInstagram,
    FaYoutube,
    FaTiktok,
    FaFacebook,
    FaTwitter,
    FaApple,
    FaSoundcloud,
} from 'react-icons/fa';

interface Label { id: number; name: string; }
interface Genre { id: number; name: string; }
interface Song { id: number; title: string; duration: string; release_year: string; image: string | null; genres: Genre[]; }
interface Product { id: number; name: string; price: number; image: string | null; category?: { name: string }; }
interface SocialMedia { id: number; platform: string; url: string; followers: string; }
interface Artist {
    id: number;
    name: string;
    bio: string;
    country: string;
    formed_year: string;
    avatar: string | null;
    label?: Label;
    songs: Song[];
    products: Product[];
    social_media: SocialMedia[];
    spotify_url?: string | null;
    apple_music_url?: string | null;
    youtube_url?: string | null;
}

interface Props { artist: Artist; }

function artistSrc(avatar: string | null) {
    if (!avatar) return '/images/default-artist.svg';
    return avatar.startsWith('http') ? avatar : `/storage/${avatar}`;
}
function productSrc(image: string | null) {
    if (!image) return '/images/default-product.svg';
    return image.startsWith('http') ? image : `/storage/${image}`;
}
function songSrc(image: string | null) {
    if (!image) return '/images/default-song.svg';
    return image.startsWith('http') ? image : `/storage/${image}`;
}

// Config de cada plataforma: icono, color de acento, label
const PLATFORM_CONFIG: Record<string, {
    icon: React.ReactNode;
    color: string;
    bg: string;
    label: string;
}> = {
    spotify: { icon: <FaSpotify size={16} />, color: '#1DB954', bg: 'rgba(29,185,84,0.12)', label: 'Spotify' },
    instagram: { icon: <FaInstagram size={16} />, color: '#E1306C', bg: 'rgba(225,48,108,0.12)', label: 'Instagram' },
    youtube: { icon: <FaYoutube size={16} />, color: '#FF0000', bg: 'rgba(255,0,0,0.12)', label: 'YouTube' },
    apple_music: { icon: <FaApple size={16} />, color: '#fc3c44', bg: 'rgba(252,60,68,0.12)', label: 'Apple Music' },
    tiktok: { icon: <FaTiktok size={16} />, color: '#ffffff', bg: 'rgba(255,255,255,0.08)', label: 'TikTok' },
    facebook: { icon: <FaFacebook size={16} />, color: '#1877F2', bg: 'rgba(24,119,242,0.12)', label: 'Facebook' },
    twitter: { icon: <FaTwitter size={16} />, color: '#1DA1F2', bg: 'rgba(29,161,242,0.12)', label: 'Twitter / X' },
    x: { icon: <FaTwitter size={16} />, color: '#1DA1F2', bg: 'rgba(29,161,242,0.12)', label: 'X' },
    soundcloud: { icon: <FaSoundcloud size={16} />, color: '#ff5500', bg: 'rgba(255,85,0,0.12)', label: 'SoundCloud' },
};

function getPlatformConfig(platform: string) {
    return PLATFORM_CONFIG[platform.toLowerCase()] ?? {
        icon: <ExternalLink size={16} />,
        color: '#888',
        bg: 'rgba(255,255,255,0.06)',
        label: platform,
    };
}

// Construye lista unificada de redes: tabla social_media + campos directos (sin duplicar)
function buildSocialLinks(artist: Artist): { url: string; platform: string }[] {
    const links: { url: string; platform: string }[] = [];
    const seen = new Set<string>();

    // 1. Tabla social_media (más completa)
    for (const sm of artist.social_media ?? []) {
        if (sm.url) {
            links.push({ url: sm.url, platform: sm.platform });
            seen.add(sm.platform.toLowerCase());
        }
    }

    // 2. Campos directos como fallback si no están ya
    if (artist.spotify_url && !seen.has('spotify'))
        links.push({ url: artist.spotify_url, platform: 'spotify' });
    if (artist.apple_music_url && !seen.has('apple music') && !seen.has('apple_music'))
        links.push({ url: artist.apple_music_url, platform: 'apple_music' });
    if (artist.youtube_url && !seen.has('youtube'))
        links.push({ url: artist.youtube_url, platform: 'youtube' });

    return links;
}

export default function ArtistShow({ artist }: Props) {
    const socialLinks = buildSocialLinks(artist);

    return (
        <PublicLayout>
            <Head title={`${artist.name} — InfoMusic`} />

            {/* HERO */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '3rem', padding: '3rem',
                marginBottom: '4rem', borderRadius: 28,
                background: 'linear-gradient(135deg,#12121c 0%,#1a1a2d 50%,#222240 100%)',
                border: '1px solid #232338', flexWrap: 'wrap',
            }}>
                {/* Avatar */}
                <div style={{
                    width: 190, height: 190, borderRadius: '50%', overflow: 'hidden',
                    flexShrink: 0, border: '4px solid rgba(200,240,80,.15)',
                    boxShadow: '0 15px 50px rgba(0,0,0,.6),0 0 40px rgba(200,240,80,.08)',
                }}>
                    <img src={artistSrc(artist.avatar)} alt={artist.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                    <p style={{ color: '#c8f050', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>
                        Artista
                    </p>

                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem,7vw,5rem)', lineHeight: .95, margin: 0 }}>
                        {artist.name}
                    </h1>

                    {/* Chips de metadatos */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        {artist.country && (
                            <div style={{ padding: '14px 18px', borderRadius: 16, background: '#171722', border: '1px solid #232338', minWidth: 140 }}>
                                <div style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>País</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                                    <MapPin size={15} /> {artist.country}
                                </div>
                            </div>
                        )}
                        {artist.formed_year && (
                            <div style={{ padding: '14px 18px', borderRadius: 16, background: '#171722', border: '1px solid #232338', minWidth: 140 }}>
                                <div style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Activo desde</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                                    <Calendar size={15} /> {artist.formed_year}
                                </div>
                            </div>
                        )}
                        {artist.label && (
                            <div style={{ padding: '14px 18px', borderRadius: 16, background: 'rgba(200,240,80,.07)', border: '1px solid rgba(200,240,80,.15)', minWidth: 180 }}>
                                <div style={{ color: '#7f8f40', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Discográfica</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#c8f050' }}>
                                    <Music2 size={15} /> {artist.label.name}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bio */}
                    {artist.bio && (
                        <p style={{ color: '#999', lineHeight: 1.9, maxWidth: 700, fontSize: '0.95rem', margin: 0 }}>
                            {artist.bio}
                        </p>
                    )}

                    {/* ── REDES SOCIALES ── */}
                    {socialLinks.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                            {socialLinks.map(({ url, platform }) => {
                                const cfg = getPlatformConfig(platform);
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={cfg.label}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 7,
                                            padding: '7px 14px',
                                            borderRadius: 10,
                                            background: cfg.bg,
                                            border: `1px solid ${cfg.color}33`,
                                            color: cfg.color,
                                            fontSize: 13,
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            transition: 'all 0.2s ease',
                                            whiteSpace: 'nowrap',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = `0 6px 20px ${cfg.color}22`;
                                            e.currentTarget.style.background = cfg.color + '22';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.background = cfg.bg;
                                        }}
                                    >
                                        {cfg.icon}
                                        {cfg.label}
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* GRID: CANCIONES + PRODUCTOS */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>

                {/* CANCIONES */}
                <div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.2rem' }}>
                        Canciones
                        <span style={{ color: '#444', fontSize: '1rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 400, marginLeft: 8 }}>
                            ({artist.songs?.length ?? 0})
                        </span>
                    </h2>

                    {artist.songs?.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {artist.songs.map((song) => (
                                <a key={song.id} href={`/explore/songs/${song.id}`} style={{
                                    display: 'flex', alignItems: 'center', gap: 16, padding: '1rem',
                                    borderRadius: 14, background: 'linear-gradient(135deg, #13131f, #0f0f18)',
                                    border: '1px solid #1e1e2e', textDecoration: 'none', transition: 'all 0.2s ease',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    <div style={{ width: 70, height: 70, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                                        <img src={songSrc(song.image)} alt={song.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>{song.title}</div>
                                        <div style={{ fontSize: 12, color: '#666', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                            <span>{song.release_year}</span>
                                            {song.genres?.map(g => (
                                                <span key={g.id} style={{ padding: '2px 8px', borderRadius: 20, background: '#222', fontSize: 11 }}>{g.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{song.duration}</div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#555', fontSize: 14 }}>No hay canciones registradas.</p>
                    )}
                </div>

                {/* PRODUCTOS */}
                <div style={{ position: 'sticky', top: 100 }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.2rem' }}>
                        Tienda
                        <span style={{ color: '#444', fontSize: '1rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 400, marginLeft: 8 }}>
                            ({artist.products?.length ?? 0})
                        </span>
                    </h2>

                    {artist.products?.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
                            {artist.products.map(product => (
                                <a key={product.id} href={`/explore/shop/${product.id}`} style={{
                                    display: 'flex', flexDirection: 'column', gap: 10, padding: 12,
                                    borderRadius: 14, background: '#13131f', border: '1px solid #1e1e2e',
                                    textDecoration: 'none', transition: 'all 0.2s ease',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden' }}>
                                        <img src={productSrc(product.image)} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {product.name}
                                        </div>
                                        {product.category && <div style={{ fontSize: 11, color: '#666' }}>{product.category.name}</div>}
                                    </div>
                                    <div style={{ fontWeight: 700, color: '#c8f050', fontSize: 14 }}>
                                        {Number(product.price).toFixed(2)} €
                                    </div>
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