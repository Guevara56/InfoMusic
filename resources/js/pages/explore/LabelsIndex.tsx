import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ExternalLink } from 'lucide-react';


interface Label { id: number; name: string; country: string; description: string; website: string; logo: string | null; artists_count: number; }

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
                            {label.logo && (
                                <div
                                    style={{
                                        width: 96,
                                        height: 96,
                                        marginBottom: 14,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '25%',
                                        overflow: 'hidden',
                                        background: '#1e1e3a',
                                        flexShrink: 0,
                                        marginRight: 20,
                                    }}
                                >
                                    <img
                                        src={
                                            label.logo.startsWith('http')
                                                ? label.logo
                                                : `/storage/${label.logo}`
                                        }
                                        alt={label.name}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>
                            )}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                    flex: 1,
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '1.15rem',
                                        fontWeight: 700,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {label.name}
                                </div>

                                {label.description && (
                                    <p
                                        style={{
                                            fontSize: 13,
                                            color: '#777',
                                            lineHeight: 1.7,
                                            margin: 0,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {label.description}
                                    </p>
                                )}

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 'auto',
                                    }}
                                >
                                    {label.website && (
                                        <a
                                            href={label.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                padding: '8px 14px',
                                                borderRadius: 10,
                                                border: '1px solid #2a2a3a',
                                                background: '#1a1a2a',
                                                color: '#aaa',
                                                fontSize: 12,
                                                fontWeight: 500,
                                                textDecoration: 'none',
                                                transition: 'all .2s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = '#c8f050';
                                                e.currentTarget.style.borderColor = '#c8f050';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = '#aaa';
                                                e.currentTarget.style.borderColor = '#2a2a3a';
                                            }}
                                        >
                                            <ExternalLink size={16} /> Web oficial
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </PublicLayout>
    );
}
