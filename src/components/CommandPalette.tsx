'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CommandPalette.module.css';

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { setTheme, toggleBackgroundEffect } = useTheme();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        const toggleEvent = () => setOpen((open) => !open);

        document.addEventListener('keydown', down);
        document.addEventListener('openCmdK', toggleEvent);

        return () => {
            document.removeEventListener('keydown', down);
            document.removeEventListener('openCmdK', toggleEvent);
        };
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <AnimatePresence>
            {open && (
                <div className={styles.overlay} onClick={() => setOpen(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className={styles.modalWrapper}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Command className={styles.commandMenu}>
                            <div className={styles.inputWrapper}>
                                <span className={styles.searchIcon}>›</span>
                                <Command.Input
                                    autoFocus
                                    placeholder="Type a command or search..."
                                    className={styles.input}
                                />
                                <div className={styles.badges}>
                                    <span className={styles.badge}>ESC</span>
                                </div>
                            </div>

                            <Command.List className={styles.list}>
                                <Command.Empty className={styles.empty}>No results found.</Command.Empty>

                                <Command.Group heading="Navigation">
                                    <Command.Item className={styles.item} onSelect={() => runCommand(() => router.push('/'))}>
                                        <span className={styles.itemIcon}>🏠</span>
                                        Home
                                    </Command.Item>
                                    <Command.Item className={styles.item} onSelect={() => runCommand(() => router.push('/about'))}>
                                        <span className={styles.itemIcon}>👨‍💻</span>
                                        About Me
                                    </Command.Item>
                                    <Command.Item className={styles.item} onSelect={() => runCommand(() => {
                                        router.push('/#projects');
                                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                    })}>
                                        <span className={styles.itemIcon}>⚡</span>
                                        Projects
                                    </Command.Item>
                                </Command.Group>

                                <Command.Group heading="Appearance">
                                    <Command.Item className={styles.item} onSelect={() => runCommand(() => setTheme('latte'))}>
                                        <span className={styles.itemIcon}>☀️</span>
                                        Light Theme (Latte)
                                    </Command.Item>
                                    <Command.Item className={styles.item} onSelect={() => runCommand(() => setTheme('mocha'))}>
                                        <span className={styles.itemIcon}>🌙</span>
                                        Dark Theme (Mocha)
                                    </Command.Item>
                                    <Command.Item className={styles.item} onSelect={() => runCommand(toggleBackgroundEffect)}>
                                        <span className={styles.itemIcon}>✨</span>
                                        Toggle Magic Aura
                                    </Command.Item>
                                </Command.Group>

                                <Command.Group heading="Socials">
                                    <Command.Item className={styles.item} onSelect={() => runCommand(() => window.open('https://github.com/isabekoviskandar', '_blank'))}>
                                        <span className={styles.itemIcon}>🐙</span>
                                        GitHub
                                    </Command.Item>
                                    <Command.Item className={styles.item} onSelect={() => runCommand(() => window.open('https://www.linkedin.com/in/iskandar-isabekov-60745229b/', '_blank'))}>
                                        <span className={styles.itemIcon}>💼</span>
                                        LinkedIn
                                    </Command.Item>
                                </Command.Group>
                            </Command.List>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
