import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';


interface Label { id: number; name: string; country: string; description: string; website: string; artists_count: number; }
 
export default function LabelsIndex({ labels }: { labels: Label[] }) {
    return (
        <PublicLayout>
            <Head title="Discográficas — InfoMusic" />
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 900, marginBottom: 6 }}>Discográficas</h1>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>{labels.length} sellos discográficos</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
                {labels.map(label => (
                    <a key={label.id} href={`/explore/labels/${label.id}`} className="card" style={{ padding: '1.4rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700 }}>{label.name}</div>
                            <span style={{ fontSize: 11, color: '#555', background: '#1a1a2a', padding: '3px 8px', borderRadius: 4 }}>{label.country}</span>
                        </div>
                        {label.description && <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5, marginBottom: '0.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{label.description}</p>}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 12, color: '#c8f050' }}>{label.artists_count} artistas</span>
                            {label.website && <span style={{ fontSize: 12, color: '#555' }}>↗ Web oficial</span>}
                        </div>
                    </a>
                ))}
            </div>
        </PublicLayout>
    );
}
