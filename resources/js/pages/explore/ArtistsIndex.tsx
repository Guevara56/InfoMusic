import PublicLayout from '@/layouts/public-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, MapPin, Music2 } from 'lucide-react';

interface Label  { id: number; name: string; }
interface Artist { id: number; name: string; country: string; bio: string; formed_year: string; label?: Label; }

interface Paginated<T> {
    data: T[]; current_page: number; last_page: number; total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props { artists: Paginated<Artist>; search: string; }

export default function ArtistsIndex({ artists, search: initialSearch }: Props) {
    const [search, setSearch] = useState(initialSearch ?? '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/explore/artists', { search: value }, { preserveState: true, replace: true });
    };

    return (
        <PublicLayout>
            <Head title="Artistas — InfoMusic" />

            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 900, marginBottom: 8 }}>Artistas</h1>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>{artists.total} artistas en la base de datos</p>
            </div>

            {/* Search */}
            <div style={{ position: 'relative', maxWidth: 400, marginBottom: '2rem' }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
                <input
                    value={search}
                    onChange={e => handleSearch(e.target.value)}
                    placeholder="Buscar artista..."
                    style={{ width: '100%', padding: '10px 14px 10px 40px', background: '#13131f', border: '1px solid #2a2a3a', borderRadius: 10, color: '#e8e8f0', fontSize: 14, outline: 'none' }}
                />
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                {artists.data.map((artist) => (
                    <a key={artist.id} href={`/explore/artists/${artist.id}`} className="card" style={{ padding: '1.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '0.8rem' }}>
                            <div className="avatar-circle">{artist.name.charAt(0)}</div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{artist.name}</div>
                                {artist.formed_year && <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>Desde {artist.formed_year}</div>}
                            </div>
                        </div>
                        {artist.bio && (
                            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5, marginBottom: '0.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {artist.bio}
                            </p>
                        )}
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {artist.country && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#555' }}>
                                    <MapPin size={11} /> {artist.country}
                                </span>
                            )}
                            {artist.label && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#c8f050' }}>
                                    <Music2 size={11} /> {artist.label.name}
                                </span>
                            )}
                        </div>
                    </a>
                ))}
            </div>

            {artists.data.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#555' }}>
                    No se encontraron artistas{search ? ` para "${search}"` : ''}.
                </div>
            )}

            {/* Pagination */}
            {artists.last_page > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '2.5rem', flexWrap: 'wrap' }}>
                    {artists.links.map((link, i) => (
                        link.url ? (
                            <a key={i} href={link.url} style={{
                                padding: '7px 14px', borderRadius: 8, fontSize: 13, textDecoration: 'none',
                                background: link.active ? '#c8f050' : '#13131f',
                                color: link.active ? '#0a0a0f' : '#888',
                                border: '1px solid ' + (link.active ? '#c8f050' : '#2a2a3a'),
                                fontWeight: link.active ? 700 : 400,
                            }} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ) : (
                            <span key={i} style={{ padding: '7px 14px', color: '#333', fontSize: 13 }} dangerouslySetInnerHTML={{ __html: link.label }} />
                        )
                    ))}
                </div>
            )}
        </PublicLayout>
    );
}
