import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
 
interface Genre { id: number; name: string; songs_count: number; }
 
const COLORS = ['#c8f050','#50c8f0','#f050c8','#f0c850','#50f0c8','#c850f0','#f08050','#50f080','#8050f0','#f05080'];
 
export default function GenresIndex({ genres }: { genres: Genre[] }) {
    return (
        <PublicLayout>
            <Head title="Géneros — InfoMusic" />
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 900, marginBottom: 6 }}>Géneros</h1>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>{genres.length} géneros musicales</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
                {genres.map((genre, i) => {
                    const color = COLORS[i % COLORS.length];
                    return (
                        <a key={genre.id} href={`/explore/genres/${genre.id}`} style={{
                            padding: '1.8rem 1.4rem', borderRadius: 14, textDecoration: 'none',
                            background: `${color}12`, border: `1px solid ${color}25`,
                            transition: 'all 0.2s', display: 'block',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = `${color}12`; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <div style={{ fontSize: '1.4rem', fontFamily: 'Playfair Display, serif', fontWeight: 700, color, marginBottom: 6 }}>{genre.name}</div>
                            <div style={{ fontSize: 12, color: '#666' }}>{genre.songs_count} canciones</div>
                        </a>
                    );
                })}
            </div>
        </PublicLayout>
    );
}
