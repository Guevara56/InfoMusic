import { Link, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { Music2, Disc3, Mic2, Radio, ShoppingBag, LayoutDashboard, LogIn, ShoppingCart } from 'lucide-react';

interface PublicLayoutProps {
    children: ReactNode;
}
interface AuthUser {
    name: string;
    role: string;
}

interface PageProps {
    auth: {
        user: AuthUser | null;
    };
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { auth } = usePage().props as PageProps;
const user = auth?.user;
    const isAdmin = user?.role === 'admin';

    const navLinks = [
        { href: '/explore/artists', label: 'Artistas',       icon: Mic2 },
        { href: '/explore/songs',   label: 'Canciones',      icon: Music2 },
        { href: '/explore/genres',  label: 'Géneros',        icon: Disc3 },
        { href: '/explore/labels',  label: 'Discográficas',  icon: Radio },
        { href: '/explore/shop',    label: 'Tienda',         icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen" style={{ background: '#0a0a0f', color: '#e8e8f0', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=Playfair+Display:wght@700;900&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #0a0a0f; }
                ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 2px; }

                .nav-link {
                    display: flex; align-items: center; gap: 6px;
                    color: #888; text-decoration: none; font-size: 13px;
                    font-weight: 500; letter-spacing: 0.03em;
                    padding: 6px 10px; border-radius: 6px;
                    transition: all 0.2s ease;
                }
                .nav-link:hover { color: #e8e8f0; background: rgba(255,255,255,0.05); }

                .accent { color: #c8f050; }
                .card {
                    background: #13131f; border: 1px solid #1e1e2e;
                    border-radius: 12px; overflow: hidden;
                    transition: all 0.25s ease; text-decoration: none;
                    color: inherit; display: block;
                }
                .card:hover { border-color: #2e2e4e; transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
                .tag { display: inline-block; padding: 2px 8px; background: rgba(200,240,80,0.1); color: #c8f050; border-radius: 4px; font-size: 11px; font-weight: 500; letter-spacing: 0.05em; }
                .section-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; margin-bottom: 1.2rem; letter-spacing: -0.02em; }
                .avatar-circle { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #1e1e3a, #2a2a5a); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: #c8f050; flex-shrink: 0; }
            `}</style>

            {/* NAV */}
            <nav style={{ borderBottom: '1px solid #1a1a2a', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem', height: 60 }}>

                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginRight: 12 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: '#c8f050', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Music2 size={16} color="#0a0a0f" strokeWidth={2.5} />
                        </div>
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: '#e8e8f0' }}>InfoMusic</span>
                    </Link>

                    {/* Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <a key={href} href={href} className="nav-link">
                                <Icon size={14} />
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Auth */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>

                        {/* Carrito — solo si está logueado */}
                        {user && (
                            <Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: '1px solid #2a2a3a', color: '#ccc', borderRadius: 8, textDecoration: 'none', fontSize: 13 }}>
                                <ShoppingCart size={14} />
                                Carrito
                            </Link>
                        )}

                        {/* Dashboard — SOLO si es admin */}
                        {isAdmin && (
                            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: '#c8f050', color: '#0a0a0f', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                                <LayoutDashboard size={14} />
                                Dashboard
                            </Link>
                        )}

                        {/* Login — solo si NO está logueado */}
                        {!user && (
                            <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', border: '1px solid #2a2a3a', color: '#ccc', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                                <LogIn size={14} />
                                Entrar
                            </Link>
                        )}

                        {/* Nombre usuario si está logueado (no admin) */}
                        {user && !isAdmin && (
                            <span style={{ fontSize: 13, color: '#666', padding: '6px 10px' }}>
                                {user.name}
                            </span>
                        )}
                    </div>
                </div>
            </nav>

            {/* CONTENT */}
            <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem' }}>
                {children}
            </main>

            {/* FOOTER */}
            <footer style={{ borderTop: '1px solid #1a1a2a', marginTop: '4rem', padding: '2rem', textAlign: 'center', color: '#444', fontSize: 13 }}>
                © {new Date().getFullYear()} InfoMusic · TFG
            </footer>
        </div>
    );
}