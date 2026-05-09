import { Link } from "@inertiajs/react";
import { useEffect, useRef } from "react";

/* ── Aurora Canvas ── */
function AuroraCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let raf;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Aurora blobs — warna sesuai landing page asli: purple, orange, magenta, pink, violet, amber
        const blobs = [
            { x: 0.15, y: 0.55, rx: 0.55, ry: 0.45, color: [109, 40, 217],  sp: 0.00018, ph: 0.0  },
            { x: 0.72, y: 0.45, rx: 0.60, ry: 0.50, color: [234, 88,  12],  sp: 0.00022, ph: 1.2  },
            { x: 0.45, y: 0.70, rx: 0.50, ry: 0.40, color: [192, 38, 211],  sp: 0.00015, ph: 2.5  },
            { x: 0.80, y: 0.20, rx: 0.45, ry: 0.35, color: [220, 38, 127],  sp: 0.00020, ph: 0.8  },
            { x: 0.30, y: 0.25, rx: 0.40, ry: 0.38, color: [124, 58, 237],  sp: 0.00017, ph: 3.7  },
            { x: 0.60, y: 0.80, rx: 0.42, ry: 0.32, color: [245, 158,  11], sp: 0.00019, ph: 1.9  },
        ];

        const draw = (ts) => {
            const t = ts * 0.001;
            const W = canvas.width;
            const H = canvas.height;

            ctx.fillStyle = "#0c0118";
            ctx.fillRect(0, 0, W, H);

            blobs.forEach((b) => {
                const dx = Math.sin(t * b.sp * 60000 + b.ph) * 0.12;
                const dy = Math.cos(t * b.sp * 47000 + b.ph * 1.3) * 0.10;
                const cx = (b.x + dx) * W;
                const cy = (b.y + dy) * H;
                const rx = b.rx * W;
                const ry = b.ry * H;
                const alpha = 0.38 + Math.sin(t * b.sp * 30000 + b.ph) * 0.12;

                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
                grad.addColorStop(0,   `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${(alpha * 0.9).toFixed(3)})`);
                grad.addColorStop(0.4, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${(alpha * 0.5).toFixed(3)})`);
                grad.addColorStop(1,   `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0)`);

                ctx.save();
                ctx.globalCompositeOperation = "screen";
                ctx.beginPath();
                ctx.ellipse(cx, cy, rx, ry, t * b.sp * 15000, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.restore();
            });

            // Vignette
            const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 1.1);
            vig.addColorStop(0, "rgba(0,0,0,0)");
            vig.addColorStop(1, "rgba(0,0,0,0.55)");
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, W, H);

            raf = requestAnimationFrame(draw);
        };

        raf = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                display: "block",
            }}
        />
    );
}

/* ── Welcome Page ── */
export default function Welcome() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@700&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .lp-root {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    min-height: 100vh;
                    background: #0c0118;
                    color: #fff;
                    overflow-x: hidden;
                    position: relative;
                }

                .lp-grain {
                    position: fixed;
                    inset: 0;
                    z-index: 1;
                    pointer-events: none;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
                    background-size: 200px 200px;
                    opacity: 0.45;
                    mix-blend-mode: overlay;
                }

                .lp-page {
                    position: relative;
                    z-index: 2;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                /* NAV */
                .lp-nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 28px 60px;
                    animation: lpFadeDown 0.7s ease both;
                }
                .lp-logo {
                    font-family: 'Caveat', cursive;
                    font-size: 44px;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: -1px;
                    line-height: 1;
                    text-decoration: none;
                    filter: drop-shadow(0 0 18px rgba(168,85,247,0.6));
                }
                .lp-logo-dot {
                    display: inline-block;
                    width: 9px; height: 9px;
                    background: linear-gradient(135deg, #facc15, #f97316);
                    border-radius: 50%;
                    margin-bottom: 5px;
                    vertical-align: middle;
                    box-shadow: 0 0 14px rgba(249,115,22,0.9);
                    animation: lpDotPop 3s ease-in-out infinite;
                }
                @keyframes lpDotPop {
                    0%,100% { transform: scale(1); }
                    50%     { transform: scale(1.4); box-shadow: 0 0 22px rgba(249,115,22,1); }
                }
                .lp-nav-links {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    animation: lpFadeDown 0.7s 0.1s ease both;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                .lp-nav-link {
                    color: rgba(255,255,255,0.8);
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                    padding: 9px 18px;
                    border-radius: 50px;
                    transition: background 0.2s, color 0.2s;
                }
                .lp-nav-link:hover { background: rgba(255,255,255,0.1); color: #fff; }
                .lp-nav-signup {
                    background: rgba(168,85,247,0.25) !important;
                    border: 1px solid rgba(168,85,247,0.5);
                    color: #e9d5ff !important;
                    backdrop-filter: blur(8px);
                }
                .lp-nav-signup:hover {
                    background: rgba(168,85,247,0.45) !important;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 20px rgba(168,85,247,0.4);
                }

                /* HERO */
                .lp-hero {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    padding: 0 60px;
                    position: relative;
                    min-height: calc(100vh - 100px);
                }
                .lp-hero-content { max-width: 580px; z-index: 2; }

                .lp-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(168,85,247,0.15);
                    border: 1px solid rgba(168,85,247,0.35);
                    border-radius: 50px;
                    padding: 6px 16px 6px 10px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #d8b4fe;
                    letter-spacing: 0.07em;
                    text-transform: uppercase;
                    margin-bottom: 30px;
                    backdrop-filter: blur(8px);
                    animation: lpFadeUp 0.7s 0.25s ease both;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                .lp-badge-dot {
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: #a855f7;
                    box-shadow: 0 0 10px rgba(168,85,247,1);
                    animation: lpPulse 2s infinite;
                    flex-shrink: 0;
                }

                .lp-headline {
                    font-size: clamp(38px, 5.5vw, 64px);
                    font-weight: 800;
                    line-height: 1.08;
                    letter-spacing: -0.035em;
                    color: #fff;
                    margin-bottom: 22px;
                    animation: lpFadeUp 0.7s 0.38s ease both;
                    opacity: 0;
                    animation-fill-mode: forwards;
                    text-shadow: 0 2px 40px rgba(0,0,0,0.3);
                }
                .lp-headline-accent {
                    background: linear-gradient(100deg, #f9a8d4 0%, #c084fc 40%, #fbbf24 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    background-size: 200% auto;
                    animation: lpShimmer 4s linear infinite;
                }
                @keyframes lpShimmer {
                    0%   { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }

                .lp-sub {
                    font-size: 17px;
                    line-height: 1.75;
                    color: rgba(255,255,255,0.65);
                    margin-bottom: 48px;
                    max-width: 460px;
                    animation: lpFadeUp 0.7s 0.48s ease both;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }

                .lp-cta {
                    display: flex;
                    align-items: center;
                    gap: 22px;
                    animation: lpFadeUp 0.7s 0.58s ease both;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }

                .lp-btn-get-started {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: linear-gradient(135deg, #a855f7 0%, #7c3aed 60%, #6d28d9 100%);
                    color: #fff;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    padding: 15px 34px;
                    border-radius: 50px;
                    border: none;
                    cursor: pointer;
                    letter-spacing: 0.02em;
                    text-decoration: none;
                    position: relative;
                    overflow: hidden;
                    box-shadow:
                        0 0 0 1px rgba(168,85,247,0.4),
                        0 8px 32px rgba(124,58,237,0.55),
                        inset 0 1px 0 rgba(255,255,255,0.2);
                    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
                }
                .lp-btn-get-started::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
                    transition: left 0.45s ease;
                }
                .lp-btn-get-started:hover::before { left: 100%; }
                .lp-btn-get-started:hover {
                    transform: translateY(-4px) scale(1.04);
                    box-shadow:
                        0 0 0 1px rgba(168,85,247,0.6),
                        0 20px 60px rgba(124,58,237,0.7),
                        inset 0 1px 0 rgba(255,255,255,0.25);
                }
                .lp-btn-get-started:active { transform: scale(0.97); }

                .lp-btn-arrow {
                    width: 24px; height: 24px;
                    background: rgba(255,255,255,0.18);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
                    flex-shrink: 0;
                }
                .lp-btn-get-started:hover .lp-btn-arrow { transform: translateX(4px); }

                .lp-link-signin {
                    font-size: 14px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.6);
                    text-decoration: none;
                    padding-bottom: 2px;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    transition: color 0.2s, border-color 0.2s;
                }
                .lp-link-signin:hover { color: #fff; border-color: rgba(255,255,255,0.7); }

                .lp-stats {
                    display: flex;
                    align-items: center;
                    gap: 28px;
                    margin-top: 60px;
                    animation: lpFadeUp 0.7s 0.7s ease both;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                .lp-stat { display: flex; flex-direction: column; gap: 3px; }
                .lp-stat-value { font-size: 20px; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
                .lp-stat-label { font-size: 11px; color: rgba(255,255,255,0.45); font-weight: 500; }
                .lp-stat-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.12); }

                .lp-visual {
                    position: absolute;
                    right: 0; top: 50%;
                    transform: translateY(-50%);
                    width: 52%; height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    pointer-events: none;
                    animation: lpFadeInRight 1s 0.4s ease both;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                .lp-visual img {
                    width: 100%;
                    max-width: 680px;
                    object-fit: contain;
                    object-position: right center;
                    filter: drop-shadow(0 20px 80px rgba(0,0,0,0.5));
                }

                .lp-scroll-hint {
                    position: absolute;
                    bottom: 32px; left: 60px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    animation: lpFadeUp 0.7s 1.1s ease both;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                .lp-scroll-wheel {
                    width: 22px; height: 36px;
                    border: 1.5px solid rgba(255,255,255,0.25);
                    border-radius: 11px;
                    display: flex;
                    justify-content: center;
                    padding-top: 6px;
                }
                .lp-scroll-dot {
                    width: 3px; height: 7px;
                    background: rgba(255,255,255,0.55);
                    border-radius: 2px;
                    animation: lpScrollDot 2s ease-in-out infinite;
                }
                .lp-scroll-text {
                    font-size: 10px;
                    color: rgba(255,255,255,0.35);
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    font-weight: 600;
                }

                @keyframes lpFadeUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes lpFadeDown {
                    from { opacity: 0; transform: translateY(-18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes lpFadeInRight {
                    from { opacity: 0; transform: translateY(-50%) translateX(50px); }
                    to   { opacity: 1; transform: translateY(-50%) translateX(0); }
                }
                @keyframes lpPulse {
                    0%,100% { opacity: 1; transform: scale(1); }
                    50%     { opacity: 0.5; transform: scale(0.8); }
                }
                @keyframes lpScrollDot {
                    0%,100% { transform: translateY(0); opacity: 1; }
                    80%     { transform: translateY(10px); opacity: 0; }
                }

                @media (max-width: 768px) {
                    .lp-nav { padding: 20px 24px; }
                    .lp-nav-links .lp-nav-link:not(.lp-nav-signup) { display: none; }
                    .lp-hero { padding: 40px 24px; align-items: flex-start; min-height: auto; }
                    .lp-visual, .lp-scroll-hint { display: none; }
                    .lp-stats { flex-wrap: wrap; gap: 16px; }
                }
            `}</style>

            <div className="lp-root">
                <AuroraCanvas />
                <div className="lp-grain" />

                <div className="lp-page">
                    <nav className="lp-nav">
                        <Link href="/" className="lp-logo">
                            Gest<span className="lp-logo-dot" />on
                        </Link>
                        <div className="lp-nav-links">
                            <Link href="/login"    className="lp-nav-link">Sign in</Link>
                            <Link href="/register" className="lp-nav-link lp-nav-signup">Sign up free</Link>
                            <Link href="/about"    className="lp-nav-link">About</Link>
                            <Link href="/contact"  className="lp-nav-link">Contact Us</Link>
                        </div>
                    </nav>

                    <section className="lp-hero">
                        <div className="lp-hero-content">
                            <div className="lp-badge">
                                <span className="lp-badge-dot" />
                                CRM untuk Tim Sales Indonesia
                            </div>

                            <h1 className="lp-headline">
                                Sederhanakan Proses,<br />
                                <span className="lp-headline-accent">Maksimalkan Hasil</span>
                            </h1>

                            <p className="lp-sub">
                                Dari input data hingga laporan akhir, Gestion hadir untuk
                                mempercepat langkah tim Anda — semua dalam satu platform yang cerdas.
                            </p>

                            <div className="lp-cta">
                                <Link href="/register" className="lp-btn-get-started">
                                    Get Started
                                    <span className="lp-btn-arrow">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2.5 6h7M6.5 3l3 3-3 3"
                                                stroke="white" strokeWidth="1.6"
                                                strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </Link>
                                <Link href="/login" className="lp-link-signin">
                                    Sudah punya akun? Sign in
                                </Link>
                            </div>

                            <div className="lp-stats">
                                <div className="lp-stat">
                                    <span className="lp-stat-value">2 Role</span>
                                    <span className="lp-stat-label">Admin &amp; Sales</span>
                                </div>
                                <div className="lp-stat-divider" />
                                <div className="lp-stat">
                                    <span className="lp-stat-value">Real-time</span>
                                    <span className="lp-stat-label">Dashboard Analytics</span>
                                </div>
                                <div className="lp-stat-divider" />
                                <div className="lp-stat">
                                    <span className="lp-stat-value">100%</span>
                                    <span className="lp-stat-label">Web Based</span>
                                </div>
                            </div>
                        </div>

                        <div className="lp-visual">
                            <img
                                src="/images/phone-hero.png"
                                alt="Gestion App Preview"
                                onError={(e) => { e.target.style.display = "none"; }}
                            />
                        </div>

                        <div className="lp-scroll-hint">
                            <div className="lp-scroll-wheel">
                                <div className="lp-scroll-dot" />
                            </div>
                            <span className="lp-scroll-text">Scroll</span>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}