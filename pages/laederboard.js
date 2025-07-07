import { getLeaderboard } from '../lib/storage'; import Link from 'next/link'; import { useEffect, useState } from 'react';
export default function Leaderboard() { const [leaderboard, setLeaderboard] = useState([]);

useEffect(() => {
    setLeaderboard(getLeaderboard());
}, []);

return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4">
        <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>
        <ul className="text-2xl">
            {leaderboard.map((entry, index) => (
                <li key={index} className="mb-2">{index + 1}. {entry.username} - {entry.score}</li>
            ))}
        </ul>
        <Link href="/" className="mt-8 bg-white text-black px-4 py-2 rounded-2xl hover:bg-gray-300">Back to Home</Link>
    </main>
);
}
