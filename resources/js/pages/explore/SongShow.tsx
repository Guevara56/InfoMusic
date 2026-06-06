import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Clock, Calendar, Music2, ArrowLeft } from 'lucide-react';

interface Genre  { id: number; name: string; }
interface Artist { id: number; name: string; country: string; avatar: string | null; }
interface Song   { id: number; title: string; duration: string; release_year: string; image: string | null; artist: Artist; genres: Genre[]; }

const sImg = (v: string | null) => !v ? '/images/default-song.svg'   : v.startsWith('http') ? v : `/storage/${v}`;
const aImg = (v: string | null) => !v ? '/images/default-artist.svg' : v.startsWith('http') ? v : `/storage/${v}`;

export default function SongShow({ song }: { song: Song }) {
    return (
        <PublicLayout>
            <Head title={`${song.title} — InfoMusic`} />
            <a href="/explore/songs" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: '2rem' }}>
                <ArrowLeft size={14} /> Volver a canciones
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '3rem', alignItems: 'start' }}>

                {/* Portada canción */}
                <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '1' }}>
                    <img src={sImg(song.image)} alt={song.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { (e.target as HTMLImageElement).src = '/images/default-song.svg'; }} />
                </div>

                {/* Info */}
                <div>
                    <p style={{ fontSize: 11, letterSpacing: '0.2em', color: '#c8f050', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Canción</p>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>{song.title}</h1>

                    {/* Artista con avatar */}
                    <a href={`/explore/artists/${song.artist?.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: '1.5rem' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', background: '#1e1e3a' }}>
                            <img src={aImg(song.artist?.avatar)} alt={song.artist?.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={e => { (e.target as HTMLImageElement).src = '/images/default-artist.svg'; }} />
                        </div>
                        <span style={{ color: '#c8f050', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Music2 size={14} /> {song.artist?.name}
                        </span>
                    </a>

                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: '2rem' }}>
                        {song.duration && <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#777', fontSize: 14 }}><Clock size={14} /> {song.duration}</span>}
                        {song.release_year && <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#777', fontSize: 14 }}><Calendar size={14} /> {song.release_year}</span>}
                    </div>

                    {song.genres?.length > 0 && (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {song.genres.map(g => (
                                <a key={g.id} href={`/explore/genres/${g.id}`} className="tag" style={{ textDecoration: 'none', padding: '5px 12px', fontSize: 13 }}>{g.name}</a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}