import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ExternalLink } from 'lucide-react';

interface LabelShowProps {
    label: { id: number; name: string; country: string; description: string; website: string; logo: string | null; artists: { id: number; name: string; country: string; formed_year: string; avatar: string }[] };
}

const artistSrc = (avatar: string | null) => {
    if (!avatar) return '/images/default-artist.svg';

    return avatar.startsWith('http')
        ? avatar
        : `/storage/${avatar}`;
};

const logoSrc = (logo: string | null) => {
    if (!logo) return '/images/default-label.svg';

    return logo.startsWith('http')
        ? logo
        : `/storage/${logo}`;
};

export default function LabelShow({ label }: LabelShowProps) {
    return (
        <PublicLayout>
            <Head title={`${label.name} — InfoMusic`} />

            {/* HERO */}
            <section
                style={{
                    display: 'flex',
                    gap: '2.5rem',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '4rem',
                    paddingBottom: '2rem',
                    borderBottom: '1px solid #1e1e2e',
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        width: 170,
                        height: 170,
                        borderRadius: 24,
                        overflow: 'hidden',
                        background: '#151522',
                        border: '1px solid #242438',
                        flexShrink: 0,
                        boxShadow: '0 0 40px rgba(0,0,0,.3)',
                    }}
                >
                    <img
                        src={logoSrc(label.logo)}
                        alt={label.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            padding: 20,
                        }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                '/images/default-label.svg';
                        }}
                    />
                </div>

                {/* Información */}
                <div style={{ flex: 1 }}>
                    <p
                        style={{
                            fontSize: 11,
                            letterSpacing: '.25em',
                            color: '#c8f050',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            marginBottom: 12,
                        }}
                    >
                        Discográfica
                    </p>

                    <h1
                        style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 'clamp(2.8rem,6vw,4rem)',
                            lineHeight: 1,
                            marginBottom: '1rem',
                        }}
                    >
                        {label.name}
                    </h1>

                    {label.country && (
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '8px 16px',
                                background: '#171723',
                                border: '1px solid #25253b',
                                borderRadius: 999,
                                color: '#888',
                                fontSize: 13,
                                marginBottom: '1.5rem',
                            }}
                        >
                            {label.country}
                        </div>
                    )}

                    {label.description && (
                        <p
                            style={{
                                maxWidth: 750,
                                lineHeight: 1.9,
                                color: '#888',
                                marginBottom: '1.8rem',
                            }}
                        >
                            {label.description}
                        </p>
                    )}

                    {label.website && (
                        <a
                            href={label.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '12px 18px',
                                borderRadius: 14,
                                background: '#171723',
                                border: '1px solid #2a2a3a',
                                color: '#aaa',
                                textDecoration: 'none',
                                transition: '.2s',
                            }}
                        >
                            <ExternalLink size={16} />
                            Sitio web oficial
                        </a>
                    )}
                </div>
            </section>

            {/* ARTISTAS */}
            <section>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.8rem',
                    }}
                >
                    <h2
                        style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '1.8rem',
                            fontWeight: 700,
                        }}
                    >
                        Artistas

                        <span
                            style={{
                                marginLeft: 10,
                                fontSize: '1rem',
                                color: '#555',
                                fontFamily: 'DM Sans',
                                fontWeight: 400,
                            }}
                        >
                            ({label.artists.length})
                        </span>
                    </h2>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))',
                        gap: 16,
                    }}
                >
                    {label.artists.map((artist) => (
                        <a
                            key={artist.id}
                            href={`/explore/artists/${artist.id}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                padding: '1.2rem',
                                borderRadius: 18,
                                background: '#13131f',
                                border: '1px solid #1e1e2e',
                                textDecoration: 'none',
                                transition: '.2s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div
                                style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    background: '#1d1d33',
                                }}
                            >
                                <img
                                    src={artistSrc(artist.avatar)}
                                    alt={artist.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>

                            <div>
                                <div
                                    style={{
                                        fontWeight: 700,
                                        color: '#fff',
                                        marginBottom: 5,
                                    }}
                                >
                                    {artist.name}
                                </div>

                                <div
                                    style={{
                                        color: '#666',
                                        fontSize: 13,
                                    }}
                                >
                                    {artist.country}
                                    {artist.formed_year && ` · ${artist.formed_year}`}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}

