'use client';

import { GitHubCommit } from '@/lib/github';
import styles from './TerminalFeed.module.css';

interface TerminalFeedProps {
    commits: GitHubCommit[];
}

export default function TerminalFeed({ commits }: TerminalFeedProps) {
    return (
        <div className={styles.terminal}>
            <div className={styles.header}>
                <div className={styles.dots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                </div>
                <div className={styles.title}>bash — activity.log</div>
            </div>
            <div className={styles.content}>
                {commits.map((commit, index) => (
                    <div key={commit.sha} className={styles.line} style={{ animationDelay: `${index * 0.1}s` }}>
                        <span className={styles.prompt}>➜</span>
                        <span className={styles.command}>git commit -m</span>
                        <span className={styles.msg}>"{commit.commit.message}"</span>
                        <div className={styles.meta}>
                            <span className={styles.hash}>{commit.sha.substring(0, 7)}</span>
                            <span className={styles.repo}>@ {commit.repository?.name}</span>
                        </div>
                    </div>
                ))}
                <div className={styles.cursorLine}>
                    <span className={styles.prompt}>➜</span>
                    <span className={styles.cursor} />
                </div>
            </div>
        </div>
    );
}
