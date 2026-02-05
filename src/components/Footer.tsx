'use client';

import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.statusBar}>
                <div className={styles.mode}>
                    <span className={styles.modeText}>NORMAL</span>
                </div>
                <div className={styles.fileInfo}>
                    <span className={styles.icon}>📄</span>
                    <span>portfolio.tsx</span>
                    <span className={styles.readOnly}>[RO]</span>
                </div>
                <div className={styles.spacer} />
                <div className={styles.meta}>
                    <span className={styles.label}>utf-8</span>
                </div>
                <div className={styles.meta}>
                    <span className={styles.icon}>🚀</span>
                    <span>Next.js 16</span>
                </div>
                <div className={styles.position}>
                    <span>100%</span>
                    <span className={styles.coords}>© 2025</span>
                </div>
            </div>
            <div className={styles.commandLine}>
                <span className={styles.prompt}>:</span>
                <span className={styles.command}>wa</span>
                <span className={styles.message}>"Built in Tashkent, Uzbekistan" written</span>
            </div>
        </footer>
    );
}
