'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Celebration() {
    const triggerRef = useRef(null);
    const isInView = useInView(triggerRef, { amount: 0.5, once: false });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (isInView) {
            setActive(true);
        }
    }, [isInView]);

    useEffect(() => {
        if (!active || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles: Particle[] = [];
        let fireworks: Firework[] = [];

        class Firework {
            x: number;
            y: number;
            targetX: number;
            targetY: number;
            shade: number;
            history: { x: number, y: number }[];

            constructor(sx: number, sy: number, tx: number, ty: number) {
                this.x = sx;
                this.y = sy;
                this.targetX = tx;
                this.targetY = ty;
                this.shade = Math.random() * 360; // Random hue
                this.history = [];
            }

            update(index: number) {
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > 5) this.history.shift();

                const vx = (this.targetX - this.x) * 0.08;
                const vy = (this.targetY - this.y) * 0.08;

                this.x += vx;
                this.y += vy;

                if (Math.abs(this.targetX - this.x) < 5 && Math.abs(this.targetY - this.y) < 5) {
                    fireworks.splice(index, 1);
                    createParticles(this.targetX, this.targetY, this.shade);
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                if (this.history.length > 0) {
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        ctx.lineTo(this.history[i].x, this.history[i].y);
                    }
                    ctx.lineTo(this.x, this.y);
                }
                ctx.strokeStyle = `hsl(${this.shade}, 100%, 50%)`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            shade: number;
            alpha: number;
            decay: number;

            constructor(x: number, y: number, hue: number) {
                this.x = x;
                this.y = y;
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.shade = hue;
                this.alpha = 1;
                this.decay = Math.random() * 0.015 + 0.01;
            }

            update(index: number) {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.05; // Gravity
                this.alpha -= this.decay;

                if (this.alpha <= 0) {
                    particles.splice(index, 1);
                }
            }

            draw() {
                if (!ctx) return;
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = `hsl(${this.shade}, 100%, 60%)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function createParticles(x: number, y: number, hue: number) {
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(x, y, hue));
            }
        }

        function loop() {
            if (!ctx || !canvas) return;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Randomly launch fireworks
            if (Math.random() < 0.05) {
                const sx = Math.random() * canvas.width;
                const sy = canvas.height;
                const tx = Math.random() * canvas.width;
                const ty = Math.random() * canvas.height / 2;
                fireworks.push(new Firework(sx, sy, tx, ty));
            }

            for (let i = fireworks.length - 1; i >= 0; i--) {
                fireworks[i].update(i);
                if (fireworks[i]) fireworks[i].draw();
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update(i);
                if (particles[i]) particles[i].draw();
            }

            if (active) {
                requestAnimationFrame(loop);
            }
        }

        loop();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [active]);

    return (
        <div ref={triggerRef} className="relative w-full h-[50vh] flex items-center justify-center mt-20">
            {active && (
                <div
                    onClick={() => setActive(false)}
                    className="fixed inset-0 z-50 cursor-pointer bg-black/20 backdrop-blur-[2px]"
                >
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 pointer-events-none"
                    />

                    {/* Floating Hearts Effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: '110vh', x: Math.random() * 100 + 'vw', scale: 0, opacity: 0 }}
                                animate={{
                                    y: '-10vh',
                                    scale: [0, 1, 0.5],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 5 + Math.random() * 5,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                    delay: Math.random() * 2
                                }}
                                className="absolute text-pink-500/60 drop-shadow-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={30 + Math.random() * 40} height={30 + Math.random() * 40} viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4"
                    >
                        <div className="text-center">
                            <h1 className="text-6xl md:text-8xl font-bold font-[family-name:var(--font-great-vibes)] text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse py-4 leading-normal">
                                Happy Anniversary!
                            </h1>
                            <p className="text-white text-xl md:text-3xl mt-4 font-mono tracking-[0.3em] uppercase text-shadow-glow">
                                Forever & Always
                            </p>
                        </div>
                    </motion.div>

                    <div className="absolute bottom-10 w-full text-center text-white/70 animate-bounce text-sm font-mono pointer-events-none">
                        ( Click to close celebration )
                    </div>
                </div>
            )}
            <div className="absolute bottom-0 w-full text-center pb-8 opacity-50 text-xs">
                ❤️ Made with love by Antigravity ❤️
            </div>
        </div>
    );
}
