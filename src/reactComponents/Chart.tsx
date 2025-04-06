import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type CommitDayData = {
  date: string;
  count: number;
};

type Props = {
  username: string;
};

const CommitChartAllRepos: React.FC<Props> = ({ username }) => {
  const [commitData, setCommitData] = useState<CommitDayData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllRepoCommits = async () => {
      setLoading(true);
      setError('');
      setCommitData([]);

      try {
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!reposRes.ok) throw new Error('Failed to fetch repositories');
        const repos = await reposRes.json();
        const since = new Date();
        since.setDate(since.getDate() - 30);
        const sinceISO = since.toISOString();
        const allCommits: string[] = [];

        for (const repo of repos) {
          try {
            const commitsRes = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/commits?since=${sinceISO}`
            );

            if (commitsRes.ok) {
              const repoCommits = await commitsRes.json();
              repoCommits.forEach((commit: any) => {
                allCommits.push(commit.commit.committer.date);
              });
            }
          } catch {
            console.warn(`Failed to fetch commits for ${repo.name}`);
          }
        }

        const grouped: Record<string, number> = {};

        allCommits.forEach((dateString) => {
          const date = new Date(dateString).toISOString().split('T')[0];
          grouped[date] = (grouped[date] || 0) + 1;
        });

        const result: CommitDayData[] = Object.entries(grouped).map(([date, count]) => ({
          date,
          count,
        }));

        result.sort((a, b) => (a.date > b.date ? 1 : -1));

        setCommitData(result);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchAllRepoCommits();
    }
  }, [username]);

  if (loading)
    return <p className="text-sm text-gray-600 italic">Loading commit data...</p>;
  if (error)
    return <p className="text-red-500 text-sm font-medium">⚠️ {error}</p>;

  return (
    <div className="w-full md:w-[1100px] h-[300px] p-6 bg-white shadow-md rounded-2xl border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        📊 Commits in the Last 30 Days
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={commitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitChartAllRepos;
