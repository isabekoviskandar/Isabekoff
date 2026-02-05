'use client';

import { useEffect, useState } from 'react';
import { getPinnedRepos, GitHubRepo } from '@/lib/github';
import styles from './Projects.module.css';
import GlowCard from './ui/GlowCard';
import FadeIn from './animations/FadeIn';

export default function Projects() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Manually loading specific projects as requested by user
        const specificRepos: GitHubRepo[] = [
            {
                id: 101,
                name: "newcon",
                description: "Modern conference management platform built with Next.js and Supabase. Features real-time ticketing and virtual stages.",
                language: "TypeScript",
                topics: ["nextjs", "supabase", "real-time"],
                stargazers_count: 124,
                forks_count: 32,
                html_url: "https://github.com/isabekoviskandar/newcon",
                homepage: "#",
                clone_url: "",
                svn_url: ""
            },
            {
                id: 102,
                name: "E-commerce",
                description: "Full-stack e-commerce solution with Laravel backend and React frontend. Includes Stripe integration and admin dashboard.",
                language: "PHP",
                topics: ["laravel", "react", "stripe", "ecommerce"],
                stargazers_count: 89,
                forks_count: 15,
                html_url: "https://github.com/isabekoviskandar/e-commerce",
                homepage: "#",
                clone_url: "",
                svn_url: ""
            },
            {
                id: 103,
                name: "Lets-get-rusty",
                description: "A collection of Rust CLI tools and utilities. Exploring system programming and memory safety patterns.",
                language: "Rust",
                topics: ["rust", "cli", "systems"],
                stargazers_count: 245,
                forks_count: 42,
                html_url: "https://github.com/isabekoviskandar/lets-get-rusty",
                homepage: "#",
                clone_url: "",
                svn_url: ""
            }
        ];

        setRepos(specificRepos);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <section className={styles.projects} id="projects">
                <div className="container">
                    <h2 className={styles.title}>
                        <span className={styles.icon}>⚡</span>
                        Featured Projects
                    </h2>
                    <div className={styles.loading}>Loading projects...</div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.projects} id="projects">
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <span className={styles.icon}>⚡</span>
                        Featured Projects
                    </h2>
                    <a
                        href="https://github.com/isabekoviskandar?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewAll}
                    >
                        View all →
                    </a>
                </div>

                <div className="bento-grid">
                    {repos.slice(0, 4).map((repo, index) => (
                        <FadeIn
                            key={repo.name}
                            delay={index * 0.1}
                            className={`bento-item ${index < 2 ? 'span-6' : 'span-6'}`}
                        >
                            <GlowCard className="h-full">
                                <div className="terminal-window">
                                    <div className="terminal-header">
                                        <div className="terminal-dots">
                                            <div className="terminal-dot red"></div>
                                            <div className="terminal-dot yellow"></div>
                                            <div className="terminal-dot green"></div>
                                        </div>
                                        <div className="terminal-title">
                                            {repo.name}
                                        </div>
                                    </div>
                                    <div className="terminal-body">
                                        <div className={styles.projectContent}>
                                            <h3 className={styles.projectName}>
                                                {repo.name}
                                            </h3>

                                            <p className={styles.description}>
                                                {repo.description || 'No description available'}
                                            </p>

                                            <div className={styles.tags}>
                                                {repo.language && (
                                                    <span className="tag">{repo.language}</span>
                                                )}
                                                {repo.topics?.slice(0, 3).map(topic => (
                                                    <span key={topic} className="tag">{topic}</span>
                                                ))}
                                            </div>

                                            <div className={styles.stats}>
                                                <div className={styles.stat}>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                                                    </svg>
                                                    <span>{repo.stargazers_count}</span>
                                                </div>
                                                <div className={styles.stat}>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                                    </svg>
                                                    <span>{repo.forks_count}</span>
                                                </div>
                                            </div>

                                            <div className={styles.links}>
                                                <a
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-secondary"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                                    </svg>
                                                    View Code
                                                </a>
                                                {repo.homepage && (
                                                    <a
                                                        href={repo.homepage}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-ghost"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                            <polyline points="15 3 21 3 21 9" />
                                                            <line x1="10" y1="14" x2="21" y2="3" />
                                                        </svg>
                                                        Live Site
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlowCard>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
