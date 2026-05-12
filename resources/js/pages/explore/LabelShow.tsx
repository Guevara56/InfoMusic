import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

interface LabelShowProps {
    label: { id: number; name: string; country: string; description: string; website: string; artists: { id: number; name: string; country: string; formed_year: string }[] };
}
 
export default function LabelShow({ label }: LabelShowProps) {
    return (
        <PublicLayout>
            <Head title={`${label.name} — InfoMusic`} />
            <p style={{ fontSize: 11, letterSpacing: '0.2em', color: '#c8f050', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Discográfica</p>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.8rem', flexWrap: 'wrap', gap: 12 }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 900 }}>{label.name}</h1>
                {label.website && <a href={label.website} target="_blank" rel="noreferrer" style={{ padding: '8px 16px', border: '1px solid #2a2a3a', borderRadius: 8, color: '#ccc', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>↗ Sitio web</a>}
            </div>
            {label.description && <p style={{ color: '#777', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 600, marginBottom: '2.5rem' }}>{label.description}</p>}
 
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>Artistas ({label.artists.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                {label.artists.map(artist => (
                    <a key={artist.id} href={`/explore/artists/${artist.id}`} className="card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div className="avatar-circle" style={{ width: 56, height: 56, fontSize: '1.2rem' }}>{artist.name.charAt(0)}</div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{artist.name}</div>
                            <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{artist.country} · {artist.formed_year}</div>
                        </div>
                    </a>
                ))}
            </div>
        </PublicLayout>
    );
}
 
