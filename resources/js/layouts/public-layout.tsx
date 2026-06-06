import { Link, usePage, router } from '@inertiajs/react';
import { type ReactNode, useState, useRef, useEffect } from 'react';
import { Music2, Disc3, Mic2, Radio, ShoppingBag, LayoutDashboard, LogIn, ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import Profilebutton from '@/components/ui/Profilebutton';



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

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
                setCartOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleRemove = (productId: number) => {
        router.delete(`/cart/${productId}/remove`, { preserveScroll: true });
    };

    const handleQuantity = (productId: number, quantity: number) => {
        router.patch(`/cart/${productId}`, { quantity }, { preserveScroll: true });
    };

    const navLinks = [
        { href: '/explore/artists', label: 'Artistas',      icon: Mic2 },
        { href: '/explore/songs',   label: 'Canciones',     icon: Music2 },
        { href: '/explore/genres',  label: 'Géneros',       icon: Disc3 },
        { href: '/explore/labels',  label: 'Discográficas', icon: Radio },
        { href: '/explore/shop',    label: 'Tienda',        icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen" style={{ background: '#0a0a0f', color: '#e8e8f0', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=Playfair+Display:wght@700;900&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #0a0a0f; }
                ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 2px; }
                .nav-link { display: flex; align-items: center; gap: 6px; color: #888; text-decoration: none; font-size: 13px; font-weight: 500; letter-spacing: 0.03em; padding: 6px 10px; border-radius: 6px; transition: all 0.2s ease; }
                .nav-link:hover { color: #e8e8f0; background: rgba(255,255,255,0.05); }
                .card { background: #13131f; border: 1px solid #1e1e2e; border-radius: 12px; overflow: hidden; transition: all 0.25s ease; text-decoration: none; color: inherit; display: block; }
                .card:hover { border-color: #2e2e4e; transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
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
                .account-link {color: #888;text-decoration: none;transition: all 0.2s ease;
                .account-link:hover {color: #c8f050;transform: translateX(-3px);}
                .order-detail-link {color: #c8f050;text-decoration: none;font-size: 13px;font-weight: 600;transition: all 0.2s ease;display: inline-block;}
                .order-detail-link:hover {transform: translateX(4px);color: #d7ff5f;text-shadow: 0 0 10px rgba(200,240,80,0.4);
}
            }
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

                    {/* Nav links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <a key={href} href={href} className="nav-link">
                                <Icon size={14} /> {label}
                            </a>
                        ))}
                    </div>

                    {/* Auth + carrito */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>

                        {/* CARRITO DROPDOWN — solo si está logueado */}
                        {user && (
                            <div ref={cartRef} style={{ position: 'relative' }}>
                                <button className="cart-btn" onClick={() => setCartOpen(o => !o)}>
                                    <ShoppingCart size={14} />
                                    Carrito
                                    {cart?.count > 0 && (
                                        <span className="cart-badge">{cart.count}</span>
                                    )}
                                </button>

                                {/* PANEL */}
                                {cartOpen && (
                                    <div className="cart-panel">
                                        {/* Header */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.2rem', borderBottom: '1px solid #1e1e2e' }}>
                                            <span style={{ fontWeight: 600, fontSize: 14 }}>Mi carrito</span>
                                            <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex' }}>
                                                <X size={16} />
                                            </button>
                                        </div>

                                        {/* Items */}
                                        {!cart?.items?.length ? (
                                            <div style={{ padding: '2.5rem 1.2rem', textAlign: 'center', color: '#555' }}>
                                                <ShoppingBag size={32} style={{ margin: '0 auto 0.8rem', opacity: 0.3 }} />
                                                <p style={{ fontSize: 13 }}>Tu carrito está vacío</p>
                                                <a href="/explore/shop" onClick={() => setCartOpen(false)} style={{ display: 'inline-block', marginTop: 12, fontSize: 12, color: '#c8f050', textDecoration: 'none' }}>
                                                    Ver tienda →
                                                </a>
                                            </div>
                                        ) : (
                                            <>
                                                <div style={{ maxHeight: 320, overflowY: 'auto', padding: '0.6rem 0' }}>
                                                    {cart.items.map(item => (
                                                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.7rem 1.2rem' }}>
                                                            <div style={{ width: 36, height: 36, borderRadius: 6, background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                                <ShoppingBag size={16} color="#2a2a4a" />
                                                            </div>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                                                                <div style={{ fontSize: 11, color: '#555', marginTop: 1 }}>{item.artist}</div>
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

                                                {/* Footer */}
                                                <div style={{ borderTop: '1px solid #1e1e2e', padding: '1rem 1.2rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                                                        <span style={{ fontSize: 13, color: '#888' }}>Total</span>
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

                        {/* Dashboard — SOLO admin */}
                        {isAdmin && (
                            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: '#c8f050', color: '#0a0a0f', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                                <LayoutDashboard size={14} /> Dashboard
                            </Link>
                        )}

                        {/* Login — solo si NO logueado */}
                        {!user && (
                            <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', border: '1px solid #2a2a3a', color: '#ccc', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                                <LogIn size={14} /> Entrar
                            </Link>
                        )}

                        {/* Perfil usuario */}
                        {user && (
                            <Profilebutton user={user} />
                        )}
                    </div>
                </div>
            </nav>

            <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem' }}>
                {children}
            </main>

            <footer style={{ borderTop: '1px solid #1a1a2a', marginTop: '4rem', padding: '2rem', textAlign: 'center', color: '#444', fontSize: 13 }}>
                © {new Date().getFullYear()} InfoMusic · TFG
            </footer>
        </div>
    );
}