import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

interface GenreShowProps {
    genre: {
        id: number;
        name: string;
        songs: {
            id: number;
            title: string;
            duration: string;
            release_year: string;
            image: string | null;
            artist: { id: number; name: string }
        }[]
    };
}

export default function GenreShow({ genre }: GenreShowProps) {
    return (
        <PublicLayout>
            <Head title={`${genre.name} — InfoMusic`} />
            <p style={{ fontSize: 11, letterSpacing: '0.2em', color: '#c8f050', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Género</p>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>{genre.name}</h1>

            <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, overflow: 'hidden' }}>
                {genre.songs.length === 0 && (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#555' }}>No hay canciones en este género.</div>
                )}
                {genre.songs.map((song, i) => (
                    <a key={song.id} href={`/explore/songs/${song.id}`} style={{
                        display: 'grid', gridTemplateColumns: '28px 40px 1fr auto', alignItems: 'center', gap: 14,
                        padding: '0.85rem 1.2rem', borderBottom: i < genre.songs.length - 1 ? '1px solid #1a1a2a' : 'none',
                        textDecoration: 'none', color: 'inherit', transition: 'background 0.15s',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                        <span style={{ color: '#444', fontSize: 12, textAlign: 'right' }}>{i + 1}</span>

                        <div style={{ width: 40, height: 40, borderRadius: 6, overflow: 'hidden', background: '#1a1a2e', flexShrink: 0 }}>
                            {song.image ? (
                                <img
                                    src={`/storage/${song.image}`}
                                    alt={song.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎵</div>
                            )}
                        </div>

                        <div>
                            <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{song.title}</div>
                            <a href={`/explore/artists/${song.artist.id}`} onClick={e => e.stopPropagation()} style={{ fontSize: 12, color: '#666', textDecoration: 'none' }}>{song.artist.name}</a>
                        </div>

                        <span style={{ fontSize: 12, color: '#555' }}>{song.duration}</span>
                    </a>
                ))}
            </div>
        </PublicLayout>
    );
}