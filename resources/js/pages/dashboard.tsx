import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Music2, Mic2, ShoppingBag, Users, ShoppingCart, Disc3, Radio, TrendingUp, ArrowRight, Package } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

interface Stats {
    artists: number; songs: number; products: number; users: number;
    orders: number; genres: number; labels: number; revenue: number;
}
interface RecentOrder  { id: number; user: string; total: number; status: string; created_at: string; }
interface RecentArtist { id: number; name: string; country: string; avatar: string | null; label: string | null; }
interface RecentSong   { id: number; title: string; artist: string; release_year: string; duration: string; }

interface Props {
    stats: Stats;
    recentOrders: RecentOrder[];
    recentArtists: RecentArtist[];
    recentSongs: RecentSong[];
    ordersByStatus: Record<string, number>;
}

const STATUS_COLORS: Record<string, string> = {
    pending: '#f0c850', paid: '#c8f050', shipped: '#50c8f0',
    delivered: '#50f080', cancelled: '#ef4444',
};
const STATUS_LABELS: Record<string, string> = {
    pending: 'Pendiente', paid: 'Pagado', shipped: 'Enviado',
    delivered: 'Entregado', cancelled: 'Cancelado',
};

function aImg(avatar: string | null) {
    if (!avatar) return '/images/default-artist.svg';
    return avatar.startsWith('http') ? avatar : `/storage/${avatar}`;
}

export default function Dashboard() {
    const { stats, recentOrders, recentArtists, recentSongs, ordersByStatus } = usePage<Props>().props;

    const statCards = [
        { label: 'Artistas',    value: stats.artists,  icon: Mic2,        color: '#c8f050', href: '/artists' },
        { label: 'Canciones',   value: stats.songs,    icon: Music2,      color: '#50c8f0', href: '/songs' },
        { label: 'Productos',   value: stats.products, icon: ShoppingBag, color: '#f0c850', href: '/products' },
        { label: 'Pedidos',     value: stats.orders,   icon: ShoppingCart,color: '#50f0c8', href: '#' },
        { label: 'Usuarios',    value: stats.users,    icon: Users,       color: '#c850f0', href: '/users' },
        { label: 'Géneros',     value: stats.genres,   icon: Disc3,       color: '#f08050', href: '/genres' },
        { label: 'Discográf.', value: stats.labels,   icon: Radio,       color: '#8050f0', href: '/labels' },
        { label: 'Ingresos',    value: `${Number(stats.revenue).toFixed(0)} €`, icon: TrendingUp, color: '#f050c8', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-6 space-y-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground text-sm mt-1">Panel de administración de InfoMusic</p>
                    </div>
                    <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        ← Volver al inicio
                    </Link>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statCards.map(({ label, value, icon: Icon, color, href }) => (
                        <Link key={label} href={href} className="block">
                            <div className="rounded-xl border bg-card p-4 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                                        <Icon size={18} style={{ color }} />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold">{value}</div>
                                <div className="text-xs text-muted-foreground mt-1">{label}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* ÚLTIMOS PEDIDOS */}
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold flex items-center gap-2">
                                <ShoppingCart size={16} /> Últimos pedidos
                            </h2>
                        </div>
                        {recentOrders.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No hay pedidos todavía.</p>
                        ) : (
                            <div className="space-y-3">
                                {recentOrders.map(order => (
                                    <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                                        <div>
                                            <div className="text-sm font-medium">#{order.id} · {order.user}</div>
                                            <div className="text-xs text-muted-foreground">{order.created_at}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold">{Number(order.total).toFixed(2)} €</div>
                                            <div className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                                                style={{ background: `${STATUS_COLORS[order.status] ?? '#888'}20`, color: STATUS_COLORS[order.status] ?? '#888' }}>
                                                {STATUS_LABELS[order.status] ?? order.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Estado de pedidos */}
                        {Object.keys(ordersByStatus).length > 0 && (
                            <div className="mt-4 pt-4 border-t">
                                <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Por estado</div>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(ordersByStatus).map(([status, count]) => (
                                        <span key={status} className="text-xs px-2 py-1 rounded-full"
                                            style={{ background: `${STATUS_COLORS[status] ?? '#888'}15`, color: STATUS_COLORS[status] ?? '#888' }}>
                                            {STATUS_LABELS[status] ?? status}: {count}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ÚLTIMAS CANCIONES */}
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold flex items-center gap-2">
                                <Music2 size={16} /> Últimas canciones
                            </h2>
                            <Link href="/songs" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                                Ver todas <ArrowRight size={12} />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentSongs.map((song, i) => (
                                <div key={song.id} className="flex items-center gap-3 py-1 border-b last:border-0">
                                    <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium truncate">{song.title}</div>
                                        <div className="text-xs text-muted-foreground">{song.artist} · {song.release_year}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground flex-shrink-0">{song.duration}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ÚLTIMOS ARTISTAS */}
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold flex items-center gap-2">
                                <Mic2 size={16} /> Últimos artistas
                            </h2>
                            <Link href="/artists" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                                Ver todos <ArrowRight size={12} />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentArtists.map(artist => (
                                <div key={artist.id} className="flex items-center gap-3 py-1 border-b last:border-0">
                                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                                        <img src={aImg(artist.avatar)} alt={artist.name}
                                            className="w-full h-full object-cover"
                                            onError={e => { (e.target as HTMLImageElement).src = '/images/default-artist.svg'; }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium truncate">{artist.name}</div>
                                        <div className="text-xs text-muted-foreground">{artist.country}{artist.label ? ` · ${artist.label}` : ''}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ACCESOS RÁPIDOS */}
                    <div className="rounded-xl border bg-card p-5">
                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <Package size={16} /> Accesos rápidos
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Añadir artista',    href: '/artists/create',           icon: Mic2,        color: '#c8f050' },
                                { label: 'Añadir canción',    href: '/songs/create',             icon: Music2,      color: '#50c8f0' },
                                { label: 'Añadir producto',   href: '/products/create',          icon: ShoppingBag, color: '#f0c850' },
                                { label: 'Gestionar géneros', href: '/genres',                   icon: Disc3,       color: '#c850f0' },
                                { label: 'Discográficas',     href: '/labels',                   icon: Radio,       color: '#f08050' },
                                { label: 'Usuarios',          href: '/users',                    icon: Users,       color: '#50f080' },
                            ].map(({ label, href, icon: Icon, color }) => (
                                <Link key={href} href={href}
                                    className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm transition-all hover:-translate-y-0.5"
                                    style={{ borderColor: `${color}30` }}
                                    onMouseEnter={e => (e.currentTarget.style.background = `${color}08`)}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                                        <Icon size={15} style={{ color }} />
                                    </div>
                                    <span className="text-sm font-medium">{label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}