import InputError from '@/components/input-error';
import { Head, useForm } from '@inertiajs/react';
import { Music2, Mail, Lock, User, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm]   = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    const inputStyle = (hasError: boolean): React.CSSProperties => ({
        width: '100%', padding: '11px 14px 11px 42px',
        background: hasError ? 'rgba(239,68,68,0.05)' : '#0d0d18',
        border: `1px solid ${hasError ? '#ef4444' : '#2a2a3a'}`,
        borderRadius: 9, color: '#e8e8f0', fontSize: 14,
        outline: 'none', transition: 'border-color 0.2s',
    });

    const focus = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = '#c8f050');
    const blur  = (field: string) => (e: React.FocusEvent<HTMLInputElement>) =>
        (e.target.style.borderColor = (errors as Record<string,string>)[field] ? '#ef4444' : '#2a2a3a');

    return (
        <>
            <Head title="Crear cuenta — InfoMusic" />

            <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'DM Sans', sans-serif" }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:wght@700;900&display=swap');`}</style>

                <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,240,80,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>

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
                            Crear cuenta
                        </h1>
                        <p style={{ textAlign: 'center', color: '#555', fontSize: 14, marginBottom: '2rem' }}>
                            Únete a InfoMusic y descubre tu música
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                            {/* Nombre */}
                            <div>
                                <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6, fontWeight: 500 }}>Nombre completo</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                                    <input type="text" required autoFocus
                                        style={inputStyle(!!errors.name)}
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Tu nombre"
                                        onFocus={focus} onBlur={blur('name')}
                                    />
                                </div>
                                <InputError message={errors.name} />
                            </div>

                            {/* Email */}
                            <div>
                                <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                                    <input type="email" required
                                        style={inputStyle(!!errors.email)}
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="tu@email.com"
                                        onFocus={focus} onBlur={blur('email')}
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Contraseña */}
                            <div>
                                <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6, fontWeight: 500 }}>Contraseña</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                                    <input type={showPassword ? 'text' : 'password'} required
                                        style={{ ...inputStyle(!!errors.password), paddingRight: 42 }}
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        placeholder="Mínimo 8 caracteres"
                                        onFocus={focus} onBlur={blur('password')}
                                    />
                                    <button type="button" onClick={() => setShowPassword(v => !v)}
                                        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#444', cursor: 'pointer', padding: 4 }}>
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirmar contraseña */}
                            <div>
                                <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6, fontWeight: 500 }}>Confirmar contraseña</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                                    <input type={showConfirm ? 'text' : 'password'} required
                                        style={{ ...inputStyle(!!errors.password_confirmation), paddingRight: 42 }}
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        placeholder="Repite tu contraseña"
                                        onFocus={focus} onBlur={blur('password_confirmation')}
                                    />
                                    <button type="button" onClick={() => setShowConfirm(v => !v)}
                                        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#444', cursor: 'pointer', padding: 4 }}>
                                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                <InputError message={errors.password_confirmation} />
                            </div>

                            {/* Botón */}
                            <button type="submit" disabled={processing}
                                style={{ padding: '13px', background: processing ? '#6a7a28' : '#c8f050', color: '#0a0a0f', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: processing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4, transition: 'background 0.2s' }}
                                onMouseEnter={e => { if (!processing) (e.currentTarget.style.background = '#d4ff5f'); }}
                                onMouseLeave={e => { if (!processing) (e.currentTarget.style.background = '#c8f050'); }}
                            >
                                <UserPlus size={16} />
                                {processing ? 'Creando cuenta...' : 'Crear cuenta'}
                            </button>
                        </form>

                        <p style={{ textAlign: 'center', fontSize: 13, color: '#555', marginTop: '1.5rem' }}>
                            ¿Ya tienes cuenta?{' '}
                            <a href="/login" style={{ color: '#c8f050', textDecoration: 'none', fontWeight: 600 }}>Inicia sesión</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}