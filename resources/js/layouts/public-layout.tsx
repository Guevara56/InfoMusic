import { Link, usePage, router } from '@inertiajs/react';
import { type ReactNode, useState, useRef, useEffect } from 'react';
import { Music2, Disc3, Mic2, Radio, ShoppingBag, LayoutDashboard, LogIn, ShoppingCart, Plus, Minus, Trash2, X, Info, Shield, FileText, Cookie, Check, Moon, Sun } from 'lucide-react';
import Profilebutton from '@/components/ui/Profilebutton';
import Cookies from 'js-cookie';

interface PublicLayoutProps {
    children: ReactNode;
}

interface AuthUser {
    id: number;
    name: string;
    role: string;
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    category: string | null;
    artist: string | null;
    image: string | null;
}

interface SharedProps {
    auth: { user: AuthUser | null };
    cart: { items: CartItem[]; total: number; count: number };
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { auth, cart } = usePage().props as unknown as SharedProps;
    const user = auth?.user;
    const isAdmin = user?.role === 'admin';

    const [cartOpen, setCartOpen] = useState(false);
    const cartRef = useRef<HTMLDivElement>(null);

    const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
        const saved = localStorage.getItem('infomusic_theme');
        if (saved === 'light' || saved === 'dark') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const [showCookieBanner, setShowCookieBanner] = useState(
        () => localStorage.getItem('infomusic_cookie_consent') === null
    );

    useEffect(() => {
        localStorage.setItem('infomusic_theme', themeMode);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(themeMode);
    }, [themeMode]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
                setCartOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const toggleThemeMode = () => {
        const newMode = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newMode);
        Cookies.set('themeMode', newMode);
    };

    const handleCookieChoice = (choice: 'accepted' | 'rejected') => {
        localStorage.setItem('infomusic_cookie_consent', choice);
        setShowCookieBanner(false);
    };

    const handleRemove = (productId: number) => {
        router.delete(`/cart/${productId}/remove`, { preserveScroll: true });
    };

    const handleQuantity = (productId: number, quantity: number) => {
        router.patch(`/cart/${productId}`, { quantity }, { preserveScroll: true });
    };

    const theme = themeMode === 'dark'
        ? {
            background: '#0a0a0f',
            backgroundSecondary: '#13131f',
            backgroundTertiary: '#09090e',
            text: '#e8e8f0',
            textSecondary: '#888',
            textMuted: '#555',
            border: '#1a1a2a',
            borderStrong: '#2a2a3a',
            card: '#13131f',
            navbar: 'rgba(10,10,15,0.95)',
            footer: '#09090e',
            accent: '#c8f050',
        }
        : {
            background: '#f4f4f8',
            backgroundSecondary: '#ffffff',
            backgroundTertiary: '#ebebf0',
            text: '#111118',
            textSecondary: '#44444f',
            textMuted: '#888899',
            border: '#e0e0ea',
            borderStrong: '#c8c8d8',
            card: '#ffffff',
            navbar: 'rgba(244,244,248,0.95)',
            footer: '#ebebf0',
            accent: '#8ab800',
        };

    const navLinks = [
        { href: '/explore/artists', label: 'Artistas', icon: Mic2 },
        { href: '/explore/songs', label: 'Canciones', icon: Music2 },
        { href: '/explore/genres', label: 'Géneros', icon: Disc3 },
        { href: '/explore/labels', label: 'Discográficas', icon: Radio },
        { href: '/explore/shop', label: 'Tienda', icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen" style={{ background: theme.background, color: theme.text, fontFamily: "'DM Sans', sans-serif", transition: 'all .25s ease' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=Playfair+Display:wght@700;900&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #0a0a0f; }
                ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 2px; }
                .nav-link { display: flex; align-items: center; gap: 6px; color: #888; text-decoration: none; font-size: 13px; font-weight: 500; letter-spacing: 0.03em; padding: 6px 10px; border-radius: 6px; transition: all 0.2s ease; }
                .nav-link:hover { color: #e8e8f0; background: rgba(255,255,255,0.05); }
                .card { border-radius:10px; overflow:hidden; transition:all .25s ease; text-decoration:none; color:inherit; display:block; }
                .card:hover { border-color: rgba(200,240,80,0.32); transform: translateY(-3px); box-shadow: 0 14px 42px rgba(0,0,0,0.42); }
                .tag { display: inline-block; padding: 2px 8px; background: rgba(200,240,80,0.1); color: #c8f050; border-radius: 4px; font-size: 11px; font-weight: 500; letter-spacing: 0.05em; }
                .section-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; margin-bottom: 1.2rem; letter-spacing: -0.02em; }
                .avatar-circle { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #1e1e3a, #2a2a5a); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: #c8f050; flex-shrink: 0; }
                .cart-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border: 1px solid #2a2a3a; color: #ccc; border-radius: 8px; background: transparent; cursor: pointer; font-size: 13px; position: relative; transition: all 0.2s; }
                .cart-btn:hover { border-color: #3a3a4a; color: #e8e8f0; }
                .cart-badge { position: absolute; top: -6px; right: -6px; background: #c8f050; color: #0a0a0f; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; }
                .cart-panel { position: absolute; top: calc(100% + 12px); right: 0; width: 360px; background: #13131f; border: 1px solid #2a2a3a; border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); z-index: 200; overflow: hidden; }
                .qty-btn { width: 24px; height: 24px; border-radius: 4px; border: 1px solid #2a2a3a; background: transparent; color: #888; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
                .qty-btn:hover { border-color: #c8f050; color: #c8f050; }
                .qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
                .remove-btn { width: 24px; height: 24px; border-radius: 4px; border: none; background: transparent; color: #555; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
                .remove-btn:hover { color: #ef4444; }
                .account-link { color: #888; text-decoration: none; transition: all 0.2s ease; }
                .account-link:hover { color: #c8f050; transform: translateX(-3px); }
                .order-detail-link { color: #c8f050; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s ease; display: inline-block; }
                .order-detail-link:hover { transform: translateX(4px); color: #d7ff5f; text-shadow: 0 0 10px rgba(200,240,80,0.4); }
                .footer-link { color: #888; text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 7px; transition: color 0.18s ease; }
                .footer-link:hover { color: #c8f050; }
                .cookie-panel { position: fixed; left: 24px; right: 24px; bottom: 24px; z-index: 500; display: flex; justify-content: center; pointer-events: none; }
                .cookie-card { max-width: 860px; width: 100%; pointer-events: auto; background: rgba(19,19,31,0.96); border: 1px solid #2a2a3a; border-radius: 12px; box-shadow: 0 22px 70px rgba(0,0,0,0.55); padding: 16px; display: grid; grid-template-columns: auto 1fr auto; gap: 14px; align-items: center; backdrop-filter: blur(14px); }
                .cookie-icon { width: 38px; height: 38px; border-radius: 8px; background: rgba(200,240,80,0.1); border: 1px solid rgba(200,240,80,0.24); display: flex; align-items: center; justify-content: center; color: #c8f050; }
                @media (max-width: 760px) {
                    nav { padding: 0 1rem !important; }
                    .nav-link { padding: 6px 7px; }
                    .cart-panel { width: min(340px, calc(100vw - 32px)); right: -54px; }
                    .cookie-card { grid-template-columns: 1fr; }
                    .cookie-icon { display: none; }
                }
            `}</style>

            <nav style={{ borderBottom: `1px solid ${theme.border}`, padding: '0 2rem', position: 'sticky', top: 0, zIndex: 100, background: theme.navbar, backdropFilter: 'blur(12px)' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem', height: 60 }}>

                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginRight: 12 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: '#c8f050', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Music2 size={16} color="#0a0a0f" strokeWidth={2.5} />
                        </div>
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: theme.text }}>InfoMusic</span>
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <a key={href} href={href} className="nav-link">
                                <Icon size={14} /> {label}
                            </a>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>

                        {user && (
                            <div ref={cartRef} style={{ position: 'relative' }}>
                                <button className="cart-btn" style={{ border: `1px solid ${theme.borderStrong}`, color: theme.text }} onClick={() => setCartOpen(o => !o)}>
                                    <ShoppingCart size={14} />
                                    Carrito
                                    {cart?.count > 0 && (
                                        <span className="cart-badge">{cart.count}</span>
                                    )}
                                </button>

                                {cartOpen && (
                                    <div className="cart-panel" style={{ background: theme.backgroundSecondary, border: `1px solid ${theme.borderStrong}` }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.2rem', borderBottom: `1px solid ${theme.border}` }}>
                                            <span style={{ fontWeight: 600, fontSize: 14 }}>Mi carrito</span>
                                            <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer', display: 'flex' }}>
                                                <X size={16} />
                                            </button>
                                        </div>

                                        {!cart?.items?.length ? (
                                            <div style={{ padding: '2.5rem 1.2rem', textAlign: 'center', color: theme.textMuted }}>
                                                <ShoppingBag size={32} style={{ margin: '0 auto 0.8rem', opacity: 0.3 }} />
                                                <p style={{ fontSize: 13 }}>Tu carrito está vacío</p>
                                                <a href="/explore/shop" onClick={() => setCartOpen(false)} style={{ display: 'inline-block', marginTop: 12, fontSize: 12, color: '#c8f050', textDecoration: 'none' }}>
                                                    Ver tienda
                                                </a>
                                            </div>
                                        ) : (
                                            <>
                                                <div style={{ maxHeight: 320, overflowY: 'auto', padding: '0.6rem 0' }}>
                                                    {cart.items.map(item => (
                                                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.7rem 1.2rem' }}>
                                                            <div style={{ width: 36, height: 36, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: '#1a1a2e' }}>
                                                                {item.image ? (
                                                                    <img
                                                                        src={item.image.startsWith('http') ? item.image : `/storage/${item.image}`}
                                                                        alt={item.name}
                                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                        onError={e => { (e.target as HTMLImageElement).src = '/images/default-product.svg'; }}
                                                                    />
                                                                ) : (
                                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <ShoppingBag size={16} color="#2a2a4a" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                                                                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 1 }}>{item.artist}</div>
                                                                <div style={{ fontSize: 12, color: '#c8f050', fontWeight: 600, marginTop: 2 }}>{Number(item.price).toFixed(2)} €</div>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                                                                <button className="qty-btn" disabled={item.quantity <= 1} onClick={() => handleQuantity(item.id, item.quantity - 1)}>
                                                                    <Minus size={10} />
                                                                </button>
                                                                <span style={{ fontSize: 12, width: 16, textAlign: 'center' }}>{item.quantity}</span>
                                                                <button className="qty-btn" disabled={item.quantity >= 99} onClick={() => handleQuantity(item.id, item.quantity + 1)}>
                                                                    <Plus size={10} />
                                                                </button>
                                                            </div>
                                                            <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                                                                <Trash2 size={13} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div style={{ borderTop: '1px solid #1e1e2e', padding: '1rem 1.2rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                                                        <span style={{ fontSize: 13, color: theme.textSecondary }}>Total</span>
                                                        <span style={{ fontSize: 15, fontWeight: 700, color: '#c8f050' }}>{Number(cart.total).toFixed(2)} €</span>
                                                    </div>
                                                    <a
                                                        href="/cart"
                                                        onClick={() => setCartOpen(false)}
                                                        style={{ display: 'block', width: '100%', padding: '10px', background: '#c8f050', borderRadius: 8, color: '#0a0a0f', fontSize: 13, fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}
                                                    >
                                                        Ver carrito y pagar
                                                    </a>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {isAdmin && (
                            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: '#c8f050', color: '#0a0a0f', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                                <LayoutDashboard size={14} /> Dashboard
                            </Link>
                        )}

                        {!user && (
                            <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', border: `1px solid ${theme.borderStrong}`, color: theme.text, borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                                <LogIn size={14} /> Entrar
                            </Link>
                        )}

                        {user && <Profilebutton user={user} />}

                        <button
                            onClick={toggleThemeMode}
                            title={themeMode === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
                            style={{ width: 38, height: 38, borderRadius: 10, border: `1px solid ${theme.borderStrong}`, background: theme.backgroundSecondary, color: theme.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .2s ease' }}
                        >
                            {themeMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        </button>
                    </div>
                </div>
            </nav>

            <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem' }}>
                {children}
            </main>

            <footer style={{ borderTop: `1px solid ${theme.border}`, marginTop: '4rem', background: theme.footer }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.4rem 2rem', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '2rem' }}>
                    <div>
                        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: '#c8f050', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Music2 size={16} color="#0a0a0f" strokeWidth={2.5} />
                            </div>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, color: theme.text }}>InfoMusic</span>
                        </Link>
                        <p style={{ color: theme.textSecondary, fontSize: 13, lineHeight: 1.7, maxWidth: 420 }}>
                            Un espacio para descubrir artistas, canciones, géneros y productos musicales con una experiencia sencilla, cuidada y hecha para explorar.
                        </p>
                    </div>

                    <div>
                        <h3 style={{ color: theme.text, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Explorar</h3>
                        <div style={{ display: 'grid', gap: 10 }}>
                            <Link href="/explore/artists" className="footer-link"><Mic2 size={14} /> Artistas</Link>
                            <Link href="/explore/songs" className="footer-link"><Music2 size={14} /> Canciones</Link>
                            <Link href="/explore/shop" className="footer-link"><ShoppingBag size={14} /> Tienda</Link>
                            <Link href="/about" className="footer-link"><Info size={14} /> Sobre nosotros</Link>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ color: theme.text, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Información</h3>
                        <div style={{ display: 'grid', gap: 10 }}>
                            <Link href="/about#contacto" className="footer-link"><Radio size={14} /> Contacto</Link>
                            <Link href="/about#privacidad" className="footer-link"><Shield size={14} /> Privacidad</Link>
                            <Link href="/about#cookies" className="footer-link"><Cookie size={14} /> Cookies</Link>
                            <Link href="/about#legal" className="footer-link"><FileText size={14} /> Aviso legal</Link>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: `1px solid ${theme.border}`, padding: '1rem 2rem', color: theme.textMuted, fontSize: 12 }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                        <span>© {new Date().getFullYear()} InfoMusic · Proyecto TFG</span>
                        <span>Hecho con Laravel, Inertia y React.</span>
                    </div>
                </div>
            </footer>

            {showCookieBanner && (
                <div className="cookie-panel">
                    <div className="cookie-card" style={{ background: theme.backgroundSecondary, border: `1px solid ${theme.borderStrong}` }}>
                        <div className="cookie-icon">
                            <Cookie size={19} />
                        </div>
                        <div>
                            <div style={{ color: theme.text, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Preferencias de cookies</div>
                            <p style={{ color: theme.textSecondary, fontSize: 13, lineHeight: 1.55 }}>
                                Usamos cookies técnicas para que la web funcione y, si aceptas, cookies de mejora para recordar preferencias como apariencia o navegación.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => handleCookieChoice('rejected')}
                                style={{ padding: '9px 14px', borderRadius: 8, border: '1px solid #2a2a3a', background: 'transparent', color: '#bbb', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                            >
                                Rechazar
                            </button>
                            <button
                                onClick={() => handleCookieChoice('accepted')}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 8, border: '1px solid #c8f050', background: '#c8f050', color: '#0a0a0f', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                            >
                                <Check size={14} /> Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}