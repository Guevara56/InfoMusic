import InputError from '@/components/input-error';
import { Head, useForm } from '@inertiajs/react';
import { Music2, Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({ status, canResetPassword, canRegister }: LoginProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    const inputStyle = (hasError: boolean): React.CSSProperties => ({
        width: '100%', padding: '11px 14px 11px 42px',
        background: hasError ? 'rgba(239,68,68,0.05)' : '#0d0d18',
        border: `1px solid ${hasError ? '#ef4444' : '#2a2a3a'}`,
        borderRadius: 9, color: '#e8e8f0', fontSize: 14,
        outline: 'none', transition: 'border-color 0.2s',
    });

    return (
        <>
            <Head title="Iniciar sesión — InfoMusic" />

            <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'DM Sans', sans-serif" }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:wght@700;900&display=swap');`}</style>

                {/* Fondo decorativo */}
                <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,240,80,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>

                    {/* Logo */}
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <a href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#c8f050', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Music2 size={20} color="#0a0a0f" strokeWidth={2.5} />
                            </div>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: '#e8e8f0' }}>InfoMusic</span>
                        </a>
                    </div>

                    {/* Card */}
                    <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 18, padding: '2.5rem' }}>
                        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.7rem', fontWeight: 900, marginBottom: 6, textAlign: 'center', color: '#e8e8f0' }}>
                            Bienvenido
                        </h1>
                        <p style={{ textAlign: 'center', color: '#555', fontSize: 14, marginBottom: '2rem' }}>
                            Inicia sesión en tu cuenta
                        </p>

                        {status && (
                            <div style={{ padding: '10px 14px', background: 'rgba(200,240,80,0.1)', border: '1px solid rgba(200,240,80,0.3)', borderRadius: 8, color: '#c8f050', fontSize: 13, marginBottom: '1.5rem', textAlign: 'center' }}>
                                {status}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                            {/* Email */}
                            <div>
                                <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                                    <input
                                        type="email" required autoFocus
                                        style={inputStyle(!!errors.email)}
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="tu@email.com"
                                        onFocus={e => (e.target.style.borderColor = '#c8f050')}
                                        onBlur={e => (e.target.style.borderColor = errors.email ? '#ef4444' : '#2a2a3a')}
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Contraseña */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <label style={{ fontSize: 12, color: '#666', fontWeight: 500 }}>Contraseña</label>
                                    {canResetPassword && (
                                        <a href="/forgot-password" style={{ fontSize: 12, color: '#c8f050', textDecoration: 'none' }}>¿Olvidaste tu contraseña?</a>
                                    )}
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                                    <input
                                        type={showPassword ? 'text' : 'password'} required
                                        style={{ ...inputStyle(!!errors.password), paddingRight: 42 }}
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        placeholder="Tu contraseña"
                                        onFocus={e => (e.target.style.borderColor = '#c8f050')}
                                        onBlur={e => (e.target.style.borderColor = errors.password ? '#ef4444' : '#2a2a3a')}
                                    />
                                    <button type="button" onClick={() => setShowPassword(v => !v)}
                                        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#444', cursor: 'pointer', padding: 4 }}>
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Recuérdame */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <input type="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)}
                                    style={{ width: 16, height: 16, accentColor: '#c8f050', cursor: 'pointer' }} />
                                <span style={{ fontSize: 13, color: '#777' }}>Recuérdame</span>
                            </label>

                            {/* Botón */}
                            <button type="submit" disabled={processing}
                                style={{ padding: '13px', background: processing ? '#6a7a28' : '#c8f050', color: '#0a0a0f', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: processing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4, transition: 'background 0.2s' }}
                                onMouseEnter={e => { if (!processing) (e.currentTarget.style.background = '#d4ff5f'); }}
                                onMouseLeave={e => { if (!processing) (e.currentTarget.style.background = '#c8f050'); }}
                            >
                                <LogIn size={16} />
                                {processing ? 'Entrando...' : 'Iniciar sesión'}
                            </button>
                        </form>

                        {canRegister && (
                            <p style={{ textAlign: 'center', fontSize: 13, color: '#555', marginTop: '1.5rem' }}>
                                ¿No tienes cuenta?{' '}
                                <a href="/register" style={{ color: '#c8f050', textDecoration: 'none', fontWeight: 600 }}>Regístrate</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}