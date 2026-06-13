import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Music2, Shield, Cookie, FileText, Mail, MapPin, ExternalLink } from 'lucide-react';

// Navegación interna
const sections = [
    { id: 'about',   label: 'Sobre nosotros', icon: Music2 },
    { id: 'privacy', label: 'Privacidad',      icon: Shield },
    { id: 'cookies', label: 'Cookies',         icon: Cookie },
    { id: 'legal',   label: 'Aviso legal',     icon: FileText },
];

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SectionTitle({ id, icon: Icon, title, color = '#c8f050' }: { id: string; icon: React.ElementType; title: string; color?: string }) {
    return (
        <div id={id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem', paddingTop: '1rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} style={{ color }} />
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 900, margin: 0 }}>{title}</h2>
        </div>
    );
}

function Divider() {
    return <div style={{ borderTop: '1px solid #1e1e2e', margin: '3rem 0' }} />;
}

function Paragraph({ children }: { children: React.ReactNode }) {
    return <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>{children}</p>;
}

function SubTitle({ children }: { children: React.ReactNode }) {
    return <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#e8e8f0', marginBottom: '0.6rem', marginTop: '1.5rem' }}>{children}</h3>;
}

export default function About() {
    return (
        <PublicLayout>
            <Head title="Sobre nosotros — InfoMusic" />

            <div style={{ maxWidth: 820, margin: '0 auto' }}>

                {/* HERO */}
                <div style={{ textAlign: 'center', padding: '3rem 0 4rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,240,80,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: '#c8f050', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Music2 size={28} color="#0a0a0f" strokeWidth={2.5} />
                    </div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                        InfoMusic
                    </h1>
                    <p style={{ color: '#666', fontSize: '1rem', maxWidth: 520, margin: '0 auto' }}>
                        Tu enciclopedia musical. Artistas, canciones, géneros, discográficas y tienda oficial en un solo lugar.
                    </p>
                </div>

                {/* NAV INTERNA */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
                    {sections.map(({ id, label, icon: Icon }) => (
                        <button key={id} onClick={() => scrollTo(id)}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(200,240,80,0.07)', border: '1px solid rgba(200,240,80,0.2)', borderRadius: 20, color: '#c8f050', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,240,80,0.14)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(200,240,80,0.07)')}>
                            <Icon size={13} /> {label}
                        </button>
                    ))}
                </div>

                {/* ── SOBRE NOSOTROS ── */}
                <SectionTitle id="about" icon={Music2} title="Sobre nosotros" />

                <Paragraph>
                    InfoMusic es una plataforma musical desarrollada como Trabajo de Fin de Grado (TFG) del ciclo formativo de Desarrollo de Aplicaciones Web. Nació con el objetivo de crear una enciclopedia musical completa donde los usuarios puedan descubrir artistas, explorar canciones, navegar por géneros y adquirir productos oficiales de sus artistas favoritos.
                </Paragraph>
                <Paragraph>
                    El proyecto integra tecnologías modernas como Laravel, React, TypeScript e Inertia.js en el backend y frontend respectivamente, con una base de datos relacional MySQL y pasarela de pago Stripe para las transacciones comerciales.
                </Paragraph>

                <SubTitle>Nuestra misión</SubTitle>
                <Paragraph>
                    Ofrecer una experiencia musical completa: información detallada sobre artistas y sus discografías, exploración por géneros y discográficas, y acceso a merchandising oficial, todo en una interfaz moderna e intuitiva.
                </Paragraph>

                <SubTitle>Tecnologías utilizadas</SubTitle>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginBottom: '1rem' }}>
                    {['Laravel 12', 'React + TypeScript', 'Inertia.js', 'MySQL', 'Stripe', 'Tailwind CSS', 'Vite', 'Laravel Fortify'].map(tech => (
                        <div key={tech} style={{ padding: '10px 14px', background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 8, fontSize: 13, color: '#aaa', fontWeight: 500 }}>
                            {tech}
                        </div>
                    ))}
                </div>

                <SubTitle>Contacto</SubTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#888' }}>
                        <Mail size={14} color="#555" /> info@infomusic.com
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#888' }}>
                        <MapPin size={14} color="#555" /> España
                    </div>
                </div>

                <Divider />

                {/* ── PRIVACIDAD ── */}
                <SectionTitle id="privacy" icon={Shield} title="Política de privacidad" color="#50c8f0" />

                <Paragraph>
                    En InfoMusic nos comprometemos a proteger tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal de acuerdo con el Reglamento General de Protección de Datos (RGPD) y la legislación española vigente.
                </Paragraph>

                <SubTitle>Datos que recopilamos</SubTitle>
                <Paragraph>
                    Recopilamos únicamente los datos necesarios para el funcionamiento del servicio: nombre, dirección de correo electrónico, dirección de envío y datos de pago procesados de forma segura a través de Stripe. No almacenamos datos de tarjetas bancarias en nuestros servidores.
                </Paragraph>

                <SubTitle>Finalidad del tratamiento</SubTitle>
                <Paragraph>
                    Los datos personales se utilizan exclusivamente para gestionar tu cuenta de usuario, procesar pedidos y envíos, enviarte comunicaciones relacionadas con tu cuenta o pedidos, y mejorar la experiencia de uso de la plataforma.
                </Paragraph>

                <SubTitle>Tus derechos</SubTitle>
                <Paragraph>
                    Tienes derecho a acceder, rectificar, suprimir y portar tus datos personales, así como a oponerte a su tratamiento. Puedes ejercer estos derechos contactando con nosotros en info@infomusic.com. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).
                </Paragraph>

                <SubTitle>Conservación de datos</SubTitle>
                <Paragraph>
                    Conservamos tus datos mientras mantengas una cuenta activa en InfoMusic. Una vez elimines tu cuenta, procederemos a eliminar tus datos personales en un plazo máximo de 30 días, salvo obligación legal de conservación.
                </Paragraph>

                <SubTitle>Seguridad</SubTitle>
                <Paragraph>
                    Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales contra accesos no autorizados, pérdida o destrucción. Las contraseñas se almacenan cifradas mediante bcrypt y las comunicaciones se realizan sobre HTTPS.
                </Paragraph>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button onClick={() => scrollTo('about')} style={{ fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        ↑ Volver arriba
                    </button>
                </div>

                <Divider />

                {/* ── COOKIES ── */}
                <SectionTitle id="cookies" icon={Cookie} title="Política de cookies" color="#f0c850" />

                <Paragraph>
                    InfoMusic utiliza cookies y tecnologías similares para mejorar tu experiencia de navegación. A continuación te explicamos qué cookies utilizamos y para qué.
                </Paragraph>

                <SubTitle>¿Qué son las cookies?</SubTitle>
                <Paragraph>
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y ofrecerte una experiencia personalizada.
                </Paragraph>

                <SubTitle>Cookies que utilizamos</SubTitle>
                <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 10, overflow: 'hidden', marginBottom: '1rem' }}>
                    {[
                        { nombre: 'infomusic-session', tipo: 'Esencial', desc: 'Mantiene tu sesión activa mientras navegas.' },
                        { nombre: 'XSRF-TOKEN', tipo: 'Esencial', desc: 'Protege contra ataques CSRF.' },
                        { nombre: 'appearance', tipo: 'Preferencia', desc: 'Recuerda tu preferencia de tema (claro/oscuro).' },
                        { nombre: '__stripe_mid', tipo: 'Pago', desc: 'Necesaria para el procesamiento seguro de pagos con Stripe.' },
                        { nombre: 'remember_web', tipo: 'Funcional', desc: 'Recuerda tu sesión si marcas "Recuérdame" al iniciar sesión.' },
                    ].map((cookie, i, arr) => (
                        <div key={cookie.nombre} style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', gap: 16, padding: '0.8rem 1.2rem', borderBottom: i < arr.length - 1 ? '1px solid #1a1a2a' : 'none', fontSize: 13 }}>
                            <span style={{ fontFamily: 'monospace', color: '#c8f050', fontSize: 12 }}>{cookie.nombre}</span>
                            <span style={{ color: '#f0c850', fontSize: 11, fontWeight: 600 }}>{cookie.tipo}</span>
                            <span style={{ color: '#777' }}>{cookie.desc}</span>
                        </div>
                    ))}
                </div>

                <SubTitle>Cookies de terceros</SubTitle>
                <Paragraph>
                    Stripe puede instalar cookies propias para el procesamiento de pagos. Consulta la política de privacidad de Stripe en{' '}
                    <a href="https://stripe.com/es/privacy" target="_blank" rel="noreferrer" style={{ color: '#c8f050', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        stripe.com/es/privacy <ExternalLink size={11} />
                    </a>.
                </Paragraph>

                <SubTitle>Gestión de cookies</SubTitle>
                <Paragraph>
                    Puedes configurar tu navegador para rechazar o eliminar cookies. Ten en cuenta que deshabilitar las cookies esenciales puede afectar al funcionamiento de la plataforma, especialmente al inicio de sesión y al carrito de compra.
                </Paragraph>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button onClick={() => scrollTo('about')} style={{ fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>
                        ↑ Volver arriba
                    </button>
                </div>

                <Divider />

                {/* ── AVISO LEGAL ── */}
                <SectionTitle id="legal" icon={FileText} title="Aviso legal" color="#c850f0" />

                <Paragraph>
                    En cumplimiento con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se facilita la siguiente información:
                </Paragraph>

                <SubTitle>Titular del sitio web</SubTitle>
                <Paragraph>
                    InfoMusic es un proyecto académico desarrollado como Trabajo de Fin de Grado del ciclo formativo de Desarrollo de Aplicaciones Web. No constituye una empresa ni entidad jurídica con actividad comercial real.
                </Paragraph>

                <SubTitle>Propiedad intelectual</SubTitle>
                <Paragraph>
                    Los contenidos del sitio web, incluyendo textos, imágenes, diseño y código fuente, son propiedad de sus respectivos autores. Queda prohibida la reproducción total o parcial sin autorización expresa. Los nombres de artistas, discográficas y productos son propiedad de sus respectivos titulares y se utilizan con fines exclusivamente educativos y demostrativos.
                </Paragraph>

                <SubTitle>Simulación de pagos</SubTitle>
                <Paragraph>
                    InfoMusic opera en modo de simulación. Los pagos se procesan a través de Stripe en modo test, por lo que no se realizan cargos reales. Las tarjetas de crédito utilizadas en las pruebas son ficticias y proporcionadas por Stripe para este fin.
                </Paragraph>

                <SubTitle>Limitación de responsabilidad</SubTitle>
                <Paragraph>
                    InfoMusic no se hace responsable de los daños o perjuicios que pudieran derivarse del uso de la plataforma, de errores u omisiones en los contenidos, ni de la disponibilidad del servicio. El acceso a la plataforma es de carácter voluntario y a riesgo del usuario.
                </Paragraph>

                <SubTitle>Legislación aplicable</SubTitle>
                <Paragraph>
                    Este aviso legal se rige por la legislación española. Para cualquier controversia derivada del uso de este sitio web, las partes se someten a los juzgados y tribunales competentes conforme a la normativa vigente.
                </Paragraph>

                <SubTitle>Modificaciones</SubTitle>
                <Paragraph>
                    InfoMusic se reserva el derecho de modificar este aviso legal en cualquier momento. Se recomienda revisar periódicamente esta página para estar informado de posibles cambios.
                </Paragraph>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => scrollTo('about')} style={{ fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>
                        ↑ Volver arriba
                    </button>
                </div>

                {/* FOOTER INTERNO */}
                <div style={{ borderTop: '1px solid #1e1e2e', paddingTop: '2rem', paddingBottom: '1rem', display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {sections.map(({ id, label }) => (
                        <button key={id} onClick={() => scrollTo(id)}
                            style={{ fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}