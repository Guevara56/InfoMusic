import PublicLayout from '@/layouts/public-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search } from 'lucide-react';

interface Genre  { id: number; name: string; }
interface Artist { id: number; name: string; }
interface Song   { id: number; title: string; duration: string; release_year: string; image: string | null; artist: Artist; genres: Genre[]; }
interface Paginated<T> { data: T[]; current_page: number; last_page: number; total: number; links: { url: string | null; label: string; active: boolean }[]; }

const sImg = (v: string | null) => !v ? '/images/default-song.svg' : v.startsWith('http') ? v : `/storage/${v}`;

export default function SongsIndex({ songs, search: init }: { songs: Paginated<Song>; search: string }) {
    const [search, setSearch] = useState(init ?? '');

    const handleSearch = (v: string) => {
        setSearch(v);
        router.get('/explore/songs', { search: v }, { preserveState: true, replace: true });
    };

    return (
        <PublicLayout>
            <Head title="Canciones — InfoMusic" />
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 900, marginBottom: 6 }}>Canciones</h1>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>{songs.total} canciones en la base de datos</p>
            </div>

            <div style={{ position: 'relative', maxWidth: 400, marginBottom: '1.5rem' }}>
                <Search size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
                <input value={search} onChange={e => handleSearch(e.target.value)} placeholder="Buscar canción, artista o género..."
                    style={{ width: '100%', padding: '10px 14px 10px 38px', background: '#13131f', border: '1px solid #2a2a3a', borderRadius: 10, color: '#e8e8f0', fontSize: 14, outline: 'none' }} />
            </div>

            <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, overflow: 'hidden' }}>
                {songs.data.length === 0 && (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#555' }}>No se encontraron canciones{search ? ` para "${search}"` : ''}.</div>
                )}
                {songs.data.map((song, i) => (
                    <a key={song.id} href={`/explore/songs/${song.id}`} style={{
                        display: 'grid', gridTemplateColumns: '48px 1fr 120px auto',
                        alignItems: 'center', gap: 14, padding: '0.8rem 1.2rem',
                        borderBottom: i < songs.data.length - 1 ? '1px solid #1a1a2a' : 'none',
                        textDecoration: 'none', color: 'inherit', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                        <div style={{ width: 40, height: 40, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                            <img src={sImg(song.image)} alt={song.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={e => { (e.target as HTMLImageElement).src = '/images/default-song.svg'; }} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{song.title}</div>
                            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                                {song.artist?.name} · {song.release_year}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {song.genres?.slice(0, 2).map(g => <span key={g.id} className="tag">{g.name}</span>)}
                        </div>
                        <span style={{ fontSize: 12, color: '#555', fontVariantNumeric: 'tabular-nums' }}>{song.duration}</span>
                    </a>
                ))}
            </div>

            {songs.last_page > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '2rem', flexWrap: 'wrap' }}>
                    {songs.links.map((link, i) => (
                        link.url
                            ? <a key={i} href={link.url} style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, textDecoration: 'none', background: link.active ? '#c8f050' : '#13131f', color: link.active ? '#0a0a0f' : '#888', border: '1px solid ' + (link.active ? '#c8f050' : '#2a2a3a'), fontWeight: link.active ? 700 : 400 }} dangerouslySetInnerHTML={{ __html: link.label }} />
                            : <span key={i} style={{ padding: '7px 14px', color: '#333', fontSize: 13 }} dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))}
                </div>
            )}
        </PublicLayout>
    );
}