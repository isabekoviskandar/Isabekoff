'use client';

import { useEffect, useState } from 'react';
import { getRecentCommits, getGitHubStats, GitHubCommit, GitHubStats } from '@/lib/github';
import styles from './Dashboard.module.css';
import GlowCard from './ui/GlowCard';
import ContributionGraph from './ui/ContributionGraph';
import TerminalFeed from './ui/TerminalFeed';

export default function Dashboard() {
    const [commits, setCommits] = useState<GitHubCommit[]>([]);
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [commitsData, statsData] = await Promise.all([
                    getRecentCommits(5),
                    getGitHubStats()
                ]);
                setCommits(commitsData);
                setStats(statsData);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentSection = document.getElementById('dashboard');
        if (currentSection) observer.observe(currentSection);

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.dashboard} id="dashboard">
            <div className="container">
                <div className="bento-grid">
                    {/* Creative Stats Tile - 4 cols */}
                    <GlowCard className={`bento-item span-4 ${isVisible ? styles.fadeIn : ''} ${styles.delay1}`}>
                        <div className={styles.statsContainer}>
                            <h3 className={styles.tileTitle}>
                                <span className={styles.icon}>⚡</span>
                                Activity Status
                            </h3>

                            {loading || !stats ? (
                                <div className={styles.loading}>Initializing...</div>
                            ) : (
                                <div className={styles.creativeStats}>
                                    <div className={styles.statMetric}>
                                        <span className={styles.metricLabel}>Total Stars</span>
                                        <span className={styles.metricValue}>{stats.total_stars}</span>
                                        <div className={styles.micrometric}>
                                            <span className={styles.inc}>+12%</span> this month
                                        </div>
                                    </div>

                                    <div className={styles.miniGrid}>
                                        <div className={styles.miniStat}>
                                            <span className={styles.miniLabel}>Repos</span>
                                            <span className={styles.miniValue}>{stats.public_repos}</span>
                                        </div>
                                        <div className={styles.miniStat}>
                                            <span className={styles.miniLabel}>Followers</span>
                                            <span className={styles.miniValue}>{stats.followers}</span>
                                        </div>
                                    </div>

                                    <div className={styles.contributionPreview}>
                                        <div className={styles.previewLabel}>Contribution Intensity</div>
                                        <ContributionGraph />
                                    </div>
                                </div>
                            )}
                        </div>
                    </GlowCard>

                    {/* Terminal Feed - 8 cols */}
                    <GlowCard className={`bento-item span-8 ${isVisible ? styles.fadeIn : ''} ${styles.delay2}`}>
                        <div className={styles.terminalWrapper}>
                            {loading ? (
                                <div className={styles.loading}>Booting terminal...</div>
                            ) : (
                                <TerminalFeed commits={commits} />
                            )}
                        </div>
                    </GlowCard>

                    {/* Connect Tile - Full Width 12 cols for cleaner bottom */}
                    <GlowCard className={`bento-item span-12 ${isVisible ? styles.fadeIn : ''} ${styles.delay3}`}>
                        <div className={styles.connectWrapper}>
                            <div className={styles.connectContent}>
                                <h3 className={styles.tileTitle}>
                                    <span className={styles.icon}>🤝</span>
                                    Initialize Handshake
                                </h3>
                                <p className={styles.connectText}>
                                    Ready to deploy your next project? Let's compile some great ideas together.
                                </p>
                            </div>

                            <div className={styles.socialGrid}>
                                <a
                                    href="https://github.com/isabekoviskandar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialCard}
                                >
                                    <span className={styles.socialIcon}>🐙</span>
                                    <span className={styles.socialName}>GitHub</span>
                                    <span className={styles.socialArrow}>→</span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/iskandar-isabekov-60745229b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialCard}
                                >
                                    <span className={styles.socialIcon}>💼</span>
                                    <span className={styles.socialName}>LinkedIn</span>
                                    <span className={styles.socialArrow}>→</span>
                                </a>
                                <a
                                    href="mailto:iskandarisabrkov@gmail.com"
                                    className={styles.socialCard}
                                >
                                    <span className={styles.socialIcon}>✉️</span>
                                    <span className={styles.socialName}>Email</span>
                                    <span className={styles.socialArrow}>→</span>
                                </a>
                            </div>
                        </div>
                    </GlowCard>
                </div>
            </div>
        </section>
    );
}
