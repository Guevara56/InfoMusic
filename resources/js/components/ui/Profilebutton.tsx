import { Link } from '@inertiajs/react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
    user: {
        id: number;
        name: string;
        role: string;
    };
}

export default function Profilebutton({ user }: Props) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            style={{
                position: 'relative',
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 12px',
                    background: 'transparent',
                    border: '1px solid #2a2a3a',
                    borderRadius: 8,
                    color: '#ccc',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                }}
            >
                <div
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#c8f050',
                        color: '#0a0a0f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 11,
                    }}
                >
                    {user.name.charAt(0).toUpperCase()}
                </div>

                {user.name}

                <ChevronDown size={14} />
            </button>

            {open && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        width: 200,
                        background: '#13131f',
                        border: '1px solid #2a2a3a',
                        borderRadius: 12,
                        overflow: 'hidden',
                        boxShadow: '0 20px 50px rgba(0,0,0,.45)',
                        zIndex: 300,
                    }}
                >
                    <Link
                        href="/account"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '12px 14px',
                            color: '#e8e8f0',
                            textDecoration: 'none',
                            fontSize: 13,
                        }}
                    >
                        <User size={15} />
                        Tu cuenta
                    </Link>

                    <div
                        style={{
                            height: 1,
                            background: '#1e1e2e',
                        }}
                    />

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '12px 14px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: 13,
                            textAlign: 'left',
                        }}
                    >
                        <LogOut size={15} />
                        Cerrar sesión
                    </Link>
                </div>
            )}
        </div>
    );
}