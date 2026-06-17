import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Clock, Calendar, Music2, ArrowLeft } from 'lucide-react';
import {
    FaSpotify,
    FaYoutube,
    FaApple,
} from 'react-icons/fa';

interface Genre { id: number; name: string; }
interface Artist { id: number; name: string; country: string; avatar: string | null; }
interface Song { id: number; title: string; duration: string; release_year: string; image: string | null; artist: Artist; genres: Genre[]; spotify_url?: string | null; apple_music_url?: string | null; youtube_url?: string | null; }
const sImg = (v: string | null) => !v ? '/images/default-song.svg' : v.startsWith('http') ? v : `/storage/${v}`;
const aImg = (v: string | null) => !v ? '/images/default-artist.svg' : v.startsWith('http') ? v : `/storage/${v}`;
const PLATFORM_CONFIG = {
    spotify: {
        icon: <FaSpotify size={16} />,
        color: '#1DB954',
        bg: 'rgba(29,185,84,0.12)',
        label: 'Spotify',
    },
    youtube: {
        icon: <FaYoutube size={16} />,
        color: '#FF0000',
        bg: 'rgba(255,0,0,0.12)',
        label: 'YouTube',
    },
    apple_music: {
        icon: <FaApple size={16} />,
        color: '#fc3c44',
        bg: 'rgba(252,60,68,0.12)',
        label: 'Apple Music',
    },
};

export default function SongShow({ song }: { song: Song }) {
    return (
        <PublicLayout>
            <Head title={`${song.title} — InfoMusic`} />

            <a
                href="/explore/songs"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: 13,
                    marginBottom: '1.5rem',
                }}
            >
                <ArrowLeft size={14} />
                Volver a canciones
            </a>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                    padding: '3rem',
                    marginBottom: '4rem',
                    borderRadius: 28,
                    background:
                        'linear-gradient(135deg,#12121c 0%,#1a1a2d 50%,#222240 100%)',
                    border: '1px solid #232338',
                    flexWrap: 'wrap',
                }}
            >
                {/* PORTADA */}
                <div
                    style={{
                        width: 250,
                        height: 250,
                        borderRadius: 24,
                        overflow: 'hidden',
                        flexShrink: 0,
                        boxShadow:
                            '0 15px 50px rgba(0,0,0,.6),0 0 40px rgba(200,240,80,.08)',
                    }}
                >
                    <img
                        src={sImg(song.image)}
                        alt={song.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>

                {/* INFO */}
                <div
                    style={{
                        flex: 1,
                        minWidth: 320,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.4rem',
                    }}
                >
                    <p
                        style={{
                            color: '#c8f050',
                            fontSize: 12,
                            letterSpacing: '.2em',
                            textTransform: 'uppercase',
                            margin: 0,
                            fontWeight: 700,
                        }}
                    >
                        Canción
                    </p>

                    <h1
                        style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 'clamp(3rem,7vw,5rem)',
                            lineHeight: .95,
                            margin: 0,
                        }}
                    >
                        {song.title}
                    </h1>

                    {/* DATOS */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 16,
                        }}
                    >
                        <div
                            style={{
                                padding: '14px 18px',
                                borderRadius: 16,
                                background: '#171722',
                                border: '1px solid #232338',
                                minWidth: 140,
                            }}
                        >
                            <div
                                style={{
                                    color: '#666',
                                    fontSize: 11,
                                    textTransform: 'uppercase',
                                    marginBottom: 6,
                                }}
                            >
                                Duración
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    fontWeight: 600,
                                }}
                            >
                                <Clock size={15} />
                                {song.duration}
                            </div>
                        </div>

                        <div
                            style={{
                                padding: '14px 18px',
                                borderRadius: 16,
                                background: '#171722',
                                border: '1px solid #232338',
                                minWidth: 140,
                            }}
                        >
                            <div
                                style={{
                                    color: '#666',
                                    fontSize: 11,
                                    textTransform: 'uppercase',
                                    marginBottom: 6,
                                }}
                            >
                                Lanzamiento
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    fontWeight: 600,
                                }}
                            >
                                <Calendar size={15} />
                                {song.release_year}
                            </div>
                        </div>
                    </div>

                    {/* ARTISTA */}
                    <a
                        href={`/explore/artists/${song.artist.id}`}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 12,
                            textDecoration: 'none',
                            width: 'fit-content',
                        }}
                    >
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={aImg(song.artist.avatar)}
                                alt={song.artist.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>

                        <div>
                            <div style={{ color: '#666', fontSize: 12 }}>
                                Artista
                            </div>

                            <div
                                style={{
                                    color: '#c8f050',
                                    fontWeight: 700,
                                }}
                            >
                                {song.artist.name}
                            </div>
                        </div>
                    </a>

                    {/* REDES MUSICALES */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 8,
                        }}
                    >
                        {song.spotify_url && (
                            <a
                                href={song.spotify_url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '8px 14px',
                                    borderRadius: 10,
                                    background:
                                        PLATFORM_CONFIG.spotify.bg,
                                    border:
                                        '1px solid rgba(29,185,84,.3)',
                                    color:
                                        PLATFORM_CONFIG.spotify.color,
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                {PLATFORM_CONFIG.spotify.icon}
                                Spotify
                            </a>
                        )}

                        {song.apple_music_url && (
                            <a
                                href={song.apple_music_url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '8px 14px',
                                    borderRadius: 10,
                                    background:
                                        PLATFORM_CONFIG.apple_music.bg,
                                    border:
                                        '1px solid rgba(252,60,68,.3)',
                                    color:
                                        PLATFORM_CONFIG.apple_music.color,
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                {PLATFORM_CONFIG.apple_music.icon}
                                Apple Music
                            </a>
                        )}

                        {song.youtube_url && (
                            <a
                                href={song.youtube_url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '8px 14px',
                                    borderRadius: 10,
                                    background:
                                        PLATFORM_CONFIG.youtube.bg,
                                    border:
                                        '1px solid rgba(255,0,0,.3)',
                                    color:
                                        PLATFORM_CONFIG.youtube.color,
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                {PLATFORM_CONFIG.youtube.icon}
                                YouTube
                            </a>
                        )}
                    </div>

                    {/* GÉNEROS */}
                    {song.genres?.length > 0 && (
                        <div
                            style={{
                                display: 'flex',
                                gap: 8,
                                flexWrap: 'wrap',
                            }}
                        >
                            {song.genres.map((genre) => (
                                <a
                                    key={genre.id}
                                    href={`/explore/genres/${genre.id}`}
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: 999,
                                        background:
                                            'rgba(200,240,80,.08)',
                                        border:
                                            '1px solid rgba(200,240,80,.15)',
                                        color: '#c8f050',
                                        textDecoration: 'none',
                                        fontSize: 13,
                                        fontWeight: 600,
                                    }}
                                >
                                    {genre.name}
                                </a>
                            ))}
                        </div>
                        
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}