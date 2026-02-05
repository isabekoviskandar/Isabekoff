// GitHub API integration utilities
const GITHUB_USERNAME = 'isabekoviskandar';
const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubRepo {
    name: string;
    description: string;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string;
    topics: string[];
}

export interface GitHubCommit {
    sha: string;
    commit: {
        message: string;
        author: {
            name: string;
            date: string;
        };
    };
    html_url: string;
    repository?: {
        name: string;
        full_name: string;
    };
    stats?: {
        additions: number;
        deletions: number;
    };
}

export interface GitHubStats {
    public_repos: number;
    followers: number;
    following: number;
    total_stars: number;
}

// Cache to minimize API calls
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data as T;
    }
    return null;
}

function setCache(key: string, data: any) {
    cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Fetch user's pinned repositories
 */
export async function getPinnedRepos(): Promise<GitHubRepo[]> {
    const cacheKey = 'pinned_repos';
    const cached = getCached<GitHubRepo[]>(cacheKey);
    if (cached) return cached;

    try {
        // GitHub doesn't have a direct API for pinned repos, so we'll get all repos and filter by stars
        const response = await fetch(
            `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos: GitHubRepo[] = await response.json();

        // Filter and sort by stars, get top repos
        const topRepos = repos
            .filter(repo => !repo.name.includes(GITHUB_USERNAME)) // Exclude profile readme repo
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);

        setCache(cacheKey, topRepos);
        return topRepos;
    } catch (error) {
        console.error('Error fetching pinned repos:', error);
        return [];
    }
}

/**
 * Fetch recent commits across all repositories
 */
export async function getRecentCommits(limit: number = 5): Promise<GitHubCommit[]> {
    const cacheKey = `recent_commits_${limit}`;
    const cached = getCached<GitHubCommit[]>(cacheKey);
    if (cached) return cached;

    try {
        // Get user's events to find recent commits
        const response = await fetch(
            `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=100`
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const events = await response.json();

        // Filter for push events and extract commits
        const commits: GitHubCommit[] = [];

        for (const event of events) {
            if (event.type === 'PushEvent' && commits.length < limit) {
                const repoName = event.repo.name;

                for (const commit of event.payload.commits || []) {
                    if (commits.length >= limit) break;

                    commits.push({
                        sha: commit.sha,
                        commit: {
                            message: commit.message,
                            author: {
                                name: event.actor.login,
                                date: event.created_at,
                            },
                        },
                        html_url: `https://github.com/${repoName}/commit/${commit.sha}`,
                        repository: {
                            name: repoName.split('/')[1],
                            full_name: repoName,
                        },
                    });
                }
            }
        }

        setCache(cacheKey, commits);
        return commits;
    } catch (error) {
        console.error('Error fetching recent commits:', error);
        return [];
    }
}

/**
 * Fetch detailed commit information including stats
 */
export async function getCommitDetails(repoFullName: string, sha: string): Promise<GitHubCommit | null> {
    const cacheKey = `commit_${repoFullName}_${sha}`;
    const cached = getCached<GitHubCommit>(cacheKey);
    if (cached) return cached;

    try {
        const response = await fetch(
            `${GITHUB_API_BASE}/repos/${repoFullName}/commits/${sha}`
        );

        if (!response.ok) {
            return null;
        }

        const commit = await response.json();
        setCache(cacheKey, commit);
        return commit;
    } catch (error) {
        console.error('Error fetching commit details:', error);
        return null;
    }
}

/**
 * Fetch GitHub profile statistics
 */
export async function getGitHubStats(): Promise<GitHubStats> {
    const cacheKey = 'github_stats';
    const cached = getCached<GitHubStats>(cacheKey);
    if (cached) return cached;

    try {
        const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
        const reposResponse = await fetch(
            `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100`
        );

        if (!userResponse.ok || !reposResponse.ok) {
            throw new Error('GitHub API error');
        }

        const user = await userResponse.json();
        const repos: GitHubRepo[] = await reposResponse.json();

        const total_stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        const stats: GitHubStats = {
            public_repos: user.public_repos,
            followers: user.followers,
            following: user.following,
            total_stars,
        };

        setCache(cacheKey, stats);
        return stats;
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return {
            public_repos: 0,
            followers: 0,
            following: 0,
            total_stars: 0,
        };
    }
}

/**
 * Get repository details
 */
export async function getRepoDetails(repoName: string): Promise<GitHubRepo | null> {
    const cacheKey = `repo_${repoName}`;
    const cached = getCached<GitHubRepo>(cacheKey);
    if (cached) return cached;

    try {
        const response = await fetch(
            `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`
        );

        if (!response.ok) {
            return null;
        }

        const repo = await response.json();
        setCache(cacheKey, repo);
        return repo;
    } catch (error) {
        console.error('Error fetching repo details:', error);
        return null;
    }
}
