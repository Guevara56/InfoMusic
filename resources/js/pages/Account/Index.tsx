import PublicLayout from '@/layouts/public-layout';
import type { FormDataConvertible } from '@inertiajs/core';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import { Form } from '@inertiajs/react';
import { orders as accountOrders } from '@/routes/account';
import { enable, disable } from '@/routes/two-factor';
import { send } from '@/routes/verification';
import {
  User, Mail, Lock, Shield, Trash2, Eye, EyeOff,
  CheckCircle, AlertTriangle, KeyRound, ShieldCheck, ShieldBan, Save
} from 'lucide-react';

interface SharedData {
  auth: {
    user: {
      name: string;
      email: string;
      email_verified_at: string | null;
    };
  };
}

interface Props {
  mustVerifyEmail: boolean;
  status?: string;
  twoFactorEnabled: boolean;
  requiresConfirmation: boolean;
}

// ── SECCIÓN GENÉRICA ──────────────────────────────────────────
function Section({ title, icon: Icon, color = '#c8f050', children }: {
  title: string; icon: React.ElementType; color?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 14, overflow: 'hidden', marginBottom: '1.5rem' }}>
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #1e1e2e', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon size={15} style={{ color }} />
        <h2 style={{ fontSize: '0.85rem', fontWeight: 600, color, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
          {title}
        </h2>
      </div>
      <div style={{ padding: '1.5rem' }}>{children}</div>
    </div>
  );
}

export default function Account({ mustVerifyEmail, status, twoFactorEnabled, requiresConfirmation }: Props) {
  const [deleteError, setDeleteError] = useState('');
  const { auth } = usePage().props as unknown as SharedData;
  const user = auth.user;

  // 2FA hook
  const { qrCodeSvg, hasSetupData, manualSetupKey, clearSetupData, fetchSetupData, recoveryCodesList, fetchRecoveryCodes, errors: twoFaErrors } = useTwoFactorAuth();
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [show2FAPasswordModal, setShow2FAPasswordModal] = useState(false);
  const [twoFaPassword, setTwoFaPassword] = useState('');
  const [twoFaPasswordError, setTwoFaPasswordError] = useState('');

  // Password state
  const [passwords, setPasswords] = useState({ current_password: '', password: '', password_confirmation: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwProcessing, setPwProcessing] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);

  // Delete state
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeletePwd, setShowDeletePwd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const inputStyle = (error?: string): React.CSSProperties => ({
    width: '100%', padding: '10px 14px 10px 40px',
    background: error ? 'rgba(239,68,68,0.05)' : '#0d0d18',
    border: `1px solid ${error ? '#ef4444' : '#2a2a3a'}`,
    borderRadius: 8, color: '#e8e8f0', fontSize: 14, outline: 'none',
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwProcessing(true);
    router.put('/settings/password', passwords, {
      preserveScroll: true,
      onSuccess: () => {
        setPasswords({ current_password: '', password: '', password_confirmation: '' });
        setPwSuccess(true);
        setTimeout(() => setPwSuccess(false), 3000);
      },
      onFinish: () => setPwProcessing(false),
    });
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();

    setDeleteError('');

    router.delete('/settings/profile', {
      data: {
        password: deletePassword,
      },

      preserveScroll: true,

      onError: (errors) => {
        if (errors.password) {
          setDeleteError(
            'La contraseña introducida es incorrecta.'
          );
        }
      },

      onSuccess: () => {
        setDeleteError('');
      },
    });
  };
  const inertiaPost = (url: string, data: Record<string, FormDataConvertible> = {}) =>
  new Promise<void>((resolve, reject) => {
    router.post(url, data, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => resolve(),
      onError: (errors) => reject(errors),
      onCancel: () => reject(new Error('Request cancelled')),
    });
  });

const handleEnable2FA = async () => {
  setTwoFaPasswordError('');

  try {
    await inertiaPost('/user/confirm-password', {
      password: twoFaPassword,
    });

    await inertiaPost(enable.url());

    await fetchSetupData();

    setShow2FAPasswordModal(false);
    setShowSetupModal(true);
    setTwoFaPassword('');
  } catch {
    setTwoFaPasswordError(
      'La contraseña es incorrecta o no se pudo iniciar la configuración de 2FA.'
    );
  }
};
  const btnPrimary: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '10px 20px', background: '#c8f050', color: '#0a0a0f',
    border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13,
    cursor: 'pointer', transition: 'background 0.2s',
  };

  const btnSecondary: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '10px 20px', background: 'rgba(200,240,80,0.08)',
    color: '#c8f050', border: '1px solid rgba(200,240,80,0.25)',
    borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer',
  };

  return (
    <PublicLayout>
      <Head title="Mi perfil — InfoMusic" />

      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, marginBottom: 6 }}>
          Mi perfil
        </h1>
        <p style={{ color: '#555', fontSize: 14, marginBottom: '2rem' }}>
          Gestiona tu cuenta, seguridad y preferencias desde un solo lugar.
        </p>

        {/* ── INFORMACIÓN PERSONAL ── */}
        <Section title="Información personal" icon={User}>
          {/* Usamos el Form de Inertia que ya existe en settings/profile */}
          <Form
            method="patch"
            action="/settings/profile"
            options={{ preserveScroll: true }}
            className=""
          >
            {({ processing, recentlySuccessful, errors }) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* Avatar / iniciales */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #1e1e3a, #2a2a5a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: '#c8f050', flexShrink: 0 }}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{user.email}</div>
                    <div style={{ fontSize: 11, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4, color: user.email_verified_at ? '#c8f050' : '#ef4444' }}>
                      {user.email_verified_at ? <CheckCircle size={11} /> : <AlertTriangle size={11} />}
                      {user.email_verified_at ? 'Correo verificado' : 'Correo sin verificar'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {/* Nombre */}
                  <div>
                    <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Nombre</label>
                    <div style={{ position: 'relative' }}>
                      <User size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                      <input name="name" defaultValue={user.name} required
                        style={inputStyle(errors.name)} placeholder="Tu nombre"
                        onFocus={e => (e.target.style.borderColor = '#c8f050')}
                        onBlur={e => (e.target.style.borderColor = errors.name ? '#ef4444' : '#2a2a3a')}
                      />
                    </div>
                    {errors.name && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Email</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                      <input name="email" type="email" defaultValue={user.email} required
                        style={inputStyle(errors.email)} placeholder="tu@email.com"
                        onFocus={e => (e.target.style.borderColor = '#c8f050')}
                        onBlur={e => (e.target.style.borderColor = errors.email ? '#ef4444' : '#2a2a3a')}
                      />
                    </div>
                    {errors.email && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Email no verificado */}
                {mustVerifyEmail && !user.email_verified_at && (
                  <div style={{ padding: '10px 14px', background: 'rgba(240,200,80,0.08)', border: '1px solid rgba(240,200,80,0.2)', borderRadius: 8, fontSize: 13, color: '#f0c850' }}>
                    Tu correo no está verificado.{' '}
                    <Link href={send()} as="button" style={{ color: '#c8f050', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>
                      Reenviar verificación
                    </Link>
                    {status === 'verification-link-sent' && (
                      <span style={{ color: '#c8f050', marginLeft: 8 }}>¡Enviado!</span>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button type="submit" disabled={processing} style={btnPrimary}
                    onMouseEnter={e => (e.currentTarget.style.background = '#d4ff5f')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#c8f050')}>
                    <Save size={14} />
                    {processing ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                  <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                    <span style={{ fontSize: 13, color: '#c8f050', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle size={13} /> Guardado
                    </span>
                  </Transition>
                </div>
              </div>
            )}
          </Form>
        </Section>

        <Section title="Pedidos" icon={ShoppingBag}>
          <p
            style={{
              fontSize: 14,
              color: '#555',
              marginBottom: '1rem',
            }}
          >
            Consulta el historial de tus compras y revisa el estado de tus pedidos.
          </p>

          <Link
            href={accountOrders.url()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 20px',
              background: 'rgba(200,240,80,0.08)',
              color: '#c8f050',
              border: '1px solid rgba(200,240,80,0.25)',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 13,
              textDecoration: 'none',
            }}
          >
            <ShoppingBag size={14} />
            Ver historial de compras
          </Link>
        </Section>

        {/* ── SEGURIDAD ── */}
        <Section title="Seguridad" icon={Shield}>

          {/* Cambiar contraseña */}
          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #1e1e2e' }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#888', display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
              <Lock size={13} /> Cambiar contraseña
            </h3>

            {[
              { key: 'current_password', label: 'Contraseña actual', show: showCurrent, toggle: () => setShowCurrent(v => !v) },
              { key: 'password', label: 'Nueva contraseña', show: showNew, toggle: () => setShowNew(v => !v) },
              { key: 'password_confirmation', label: 'Confirmar nueva contraseña', show: showConfirm, toggle: () => setShowConfirm(v => !v) },
            ].map(({ key, label, show, toggle }) => (
              <div key={key}>
                <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>{label}</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                  <input type={show ? 'text' : 'password'}
                    style={{ ...inputStyle(), paddingRight: 40 }}
                    value={passwords[key as keyof typeof passwords]}
                    onChange={e => setPasswords(p => ({ ...p, [key]: e.target.value }))}
                    placeholder="••••••••"
                    onFocus={e => (e.target.style.borderColor = '#c8f050')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a3a')}
                  />
                  <button type="button" onClick={toggle}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#444', cursor: 'pointer', padding: 4 }}>
                    {show ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button type="submit" disabled={pwProcessing} style={btnSecondary}>
                <Lock size={13} />
                {pwProcessing ? 'Actualizando...' : 'Actualizar contraseña'}
              </button>
              {pwSuccess && (
                <span style={{ fontSize: 13, color: '#c8f050', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle size={13} /> Contraseña actualizada
                </span>
              )}
            </div>
          </form>
        </Section>

        {/* ── ZONA DE PELIGRO ── */}
        <Section title="Zona de peligro" icon={Trash2} color="#ef4444">
          {!confirmDelete ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Eliminar cuenta</div>
                <div style={{ fontSize: 12, color: '#555' }}>Esta acción es permanente e irreversible. Se eliminarán todos tus datos.</div>
              </div>
              <button onClick={() => setConfirmDelete(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: '#ef4444', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}>
                <Trash2 size={13} /> Eliminar cuenta
              </button>
            </div>
          ) : (
            <form onSubmit={handleDeleteAccount} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, fontSize: 13, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={14} /> Introduce tu contraseña para confirmar la eliminación.
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                <input type={showDeletePwd ? 'text' : 'password'}
                  style={{ ...inputStyle(), borderColor: 'rgba(239,68,68,0.4)', paddingRight: 40 }}
                  value={deletePassword}
                  onChange={e => setDeletePassword(e.target.value)}
                  placeholder="Tu contraseña actual"
                />
                <button type="button" onClick={() => setShowDeletePwd(v => !v)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#444', cursor: 'pointer', padding: 4 }}>
                  {showDeletePwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {deleteError && (
                <div
                  style={{
                    padding: '10px',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: 8,
                    color: '#ef4444',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  ⚠️ {deleteError}
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit"
                  style={{ padding: '10px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  Confirmar eliminación
                </button>
                <button type="button" onClick={() => { setConfirmDelete(false); setDeletePassword(''); }}
                  style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #2a2a3a', borderRadius: 8, color: '#888', fontSize: 13, cursor: 'pointer' }}>
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </Section>
      </div>
      {show2FAPasswordModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: 400,
              background: '#13131f',
              border: '1px solid #2a2a3a',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <h3
              style={{
                marginBottom: 12,
                color: '#fff',
              }}
            >
              Confirmar contraseña
            </h3>

            <p
              style={{
                color: '#888',
                fontSize: 13,
                marginBottom: 15,
              }}
            >
              Introduce tu contraseña para activar
              la autenticación en dos pasos.
            </p>

            <input
              type="password"
              value={twoFaPassword}
              onChange={(e) =>
                setTwoFaPassword(e.target.value)
              }
              style={inputStyle(twoFaPasswordError)}
            />

            {twoFaPasswordError && (
              <div
                style={{
                  marginTop: 10,
                  color: '#ef4444',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                ⚠️ {twoFaPasswordError}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                gap: 10,
                marginTop: 20,
              }}
            >
              <button
                onClick={handleEnable2FA}
                style={btnPrimary}
              >
                Continuar
              </button>

              <button
                onClick={() =>
                  setShow2FAPasswordModal(false)
                }
                style={btnSecondary}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
