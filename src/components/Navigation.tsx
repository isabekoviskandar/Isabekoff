'use client';

import { useTheme } from '@/contexts/ThemeContext';
import styles from './Navigation.module.css';
import { useState, useRef, useEffect } from 'react';

const THEMES = ['mocha', 'macchiato', 'frappe', 'latte'];
const ACCENTS = [
    'rosewater', 'flamingo', 'pink', 'mauve', 'red',
    'maroon', 'peach', 'yellow', 'green', 'teal',
    'sky', 'sapphire', 'blue', 'lavender'
];

export default function Navigation() {
    const { theme, setTheme, accentColor, setAccentColor, backgroundEffect, toggleBackgroundEffect } = useTheme();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    // Close settings when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.breadcrumb}>
                    <span className={styles.prompt}>~/</span>
                    <span className={styles.path}>home</span>
                </div>

                <div className={styles.controls} ref={settingsRef}>
                    <button
                        className={styles.cmdTrigger}
                        onClick={() => document.dispatchEvent(new Event('openCmdK'))}
                        title="Open Command Palette (Ctrl+K)"
                    >
                        <span>Search</span>
                        <span className={styles.cmdKey}>⌘K</span>
                    </button>

                    <button
                        className={`${styles.settingsToggle} ${isSettingsOpen ? styles.active : ''}`}
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        aria-label="Appearance Settings"
                    >
                        <span className={styles.icon}>🎨</span>
                    </button>

                    <div className={`${styles.settingsPanel} ${isSettingsOpen ? styles.open : ''}`}>
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>Interface</h3>
                            <span className={styles.panelSubtitle}>Customize your experience</span>
                        </div>

                        <div className={styles.settingGroup}>
                            <span className={styles.settingLabel}>Theme Base</span>
                            <div className={styles.themeGrid}>
                                {THEMES.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t as any)}
                                        className={`${styles.themeOption} ${theme === t ? styles.active : ''}`}
                                        title={`Switch to ${t} theme`}
                                    >
                                        <div className={`${styles.themePreview} ${styles[t]}`} />
                                        <span className={styles.themeName}>{t}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.separator} />

                        <div className={styles.settingGroup}>
                            <span className={styles.settingLabel}>Accent Color</span>
                            <div className={styles.colorGrid}>
                                {ACCENTS.map((c) => (
                                    <button
                                        key={c}
                                        className={`${styles.colorDot} ${accentColor === c ? styles.active : ''}`}
                                        style={{ backgroundColor: `var(--${c})` }}
                                        onClick={() => setAccentColor(c as any)}
                                        title={c}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.separator} />

                        <div className={styles.settingGroup}>
                            <div className={styles.effectRow}>
                                <span className={styles.settingLabel} style={{ marginBottom: 0 }}>Magical aura</span>
                                <button
                                    className={`${styles.switch} ${backgroundEffect ? styles.active : ''}`}
                                    onClick={toggleBackgroundEffect}
                                    title="Toggle background animation"
                                >
                                    <div className={styles.knob} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
