'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import styles from './page.module.css';

export default function About() {
    return (
        <main>
            <Navigation />

            <section className={styles.about}>
                <div className="container">
                    <FadeIn className={styles.intro}>
                        <div className={styles.textBlock}>
                            <h1 className={styles.title}>More than just<br />code.</h1>
                            <p className={styles.subtitle}>
                                I build digital experiences that blend performance with premium aesthetics.
                            </p>
                            <p>
                                My journey began with simple HTML scripts and evolved into architecting complex backend systems for enterprise-scale applications.
                                Today, I specialize in the TALL stack (Tailwind, Alpine, Laravel, Livewire) and maintain a deep love for the React ecosystem.
                            </p>
                            <p>
                                Currently, I'm focused on exploring system programming with Rust and creating developer tools that improve productivity.
                            </p>
                        </div>

                        <div className={styles.visual}>
                            <div className={styles.gridPattern} />
                            <div className={styles.codeBlock}>
                                <span className={styles.line}>
                                    <span className={styles.keyword}>class</span> <span className={styles.function}>Developer</span> {'{'}
                                </span>
                                <span className={styles.line} style={{ paddingLeft: '1rem' }}>
                                    <span className={styles.keyword}>const</span> <span className={styles.function}>passion</span> = <span className={styles.string}>"Building"</span>;
                                </span>
                                <span className={styles.line} style={{ paddingLeft: '1rem' }}>
                                    <span className={styles.keyword}>const</span> <span className={styles.function}>location</span> = <span className={styles.string}>"Uzbekistan"</span>;
                                </span>
                                <span className={styles.line}>{'}'}</span>
                            </div>
                        </div>
                    </FadeIn>

                    <div className={styles.grid}>
                        <FadeIn delay={0.2} className={styles.card}>
                            <h3 className={styles.cardTitle}>⚡ Tech Stack</h3>
                            <div className={styles.techList}>
                                <span className={styles.techTag}>Laravel</span>
                                <span className={styles.techTag}>PHP 8.2</span>
                                <span className={styles.techTag}>Next.js</span>
                                <span className={styles.techTag}>TypeScript</span>
                                <span className={styles.techTag}>PostgreSQL</span>
                                <span className={styles.techTag}>Redis</span>
                                <span className={styles.techTag}>Docker</span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3} className={styles.card}>
                            <h3 className={styles.cardTitle}>🛠️ Tools via CMD</h3>
                            <div className={styles.techList}>
                                <span className={styles.techTag}>Neovim</span>
                                <span className={styles.techTag}>Tmux</span>
                                <span className={styles.techTag}>Zsh</span>
                                <span className={styles.techTag}>Git</span>
                                <span className={styles.techTag}>Linux</span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.4} className={styles.card}>
                            <h3 className={styles.cardTitle}>🌱 Learning</h3>
                            <div className={styles.techList}>
                                <span className={styles.techTag}>Rust</span>
                                <span className={styles.techTag}>Actix-web</span>
                                <span className={styles.techTag}>WebAssembly</span>
                                <span className={styles.techTag}>System Architecture</span>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
