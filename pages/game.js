import { useEffect, useRef, useState } from 'react'; import { saveScore } from '../lib/storage'; import { useRouter } from 'next/router';
export default function Game() { const canvasRef = useRef(null); const [score, setScore] = useState(0); const [gameOver, setGameOver] = useState(false); const router = useRouter();

useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let birdY = 150;
    let birdVelocity = 0;
    let gravity = 0.6;
    let pipes = [];
    let pipeWidth = 50;
    let gap = 150;
    let frame = 0;
    let chasing = false;

    const username = localStorage.getItem('currentUser');
    if (!username) {
        router.push('/login');
        return;
    }

    const jump = () => {
        birdVelocity = -10;
    };

    const handleKeyDown = (e) => {
        if (e.code === 'Space') jump();
    };
    window.addEventListener('keydown', handleKeyDown);

    const loop = () => {
        if (gameOver) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw bird
        ctx.fillStyle = 'yellow';
        ctx.fillRect(80, birdY, 30, 30);

        birdVelocity += gravity;
        birdY += birdVelocity;

        if (birdY + 30 > canvas.height || birdY < 0) {
            setGameOver(true);
            saveScore(username, score);
            return;
        }

        // Create pipes
        if (frame % 90 === 0) {
            let topHeight = Math.random() * (canvas.height - gap - 50);
            pipes.push({ x: canvas.width, topHeight });
        }

        // Move pipes
        pipes.forEach(pipe => pipe.x -= 5);

        // Draw pipes
        pipes.forEach(pipe => {
            ctx.fillStyle = 'green';
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
            ctx.fillRect(pipe.x, pipe.topHeight + gap, pipeWidth, canvas.height);

            if (pipe.x < 110 && pipe.x + pipeWidth > 80) {
                if (birdY < pipe.topHeight || birdY + 30 > pipe.topHeight + gap) {
                    setGameOver(true);
                    saveScore(username, score);
                    return;
                }
            }
        });

        // Remove off-screen pipes
        pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);

        // Draw chaser if score >= 20
        if (score >= 20) {
            chasing = true;
            ctx.fillStyle = 'red';
            ctx.font = '30px Arial';
            ctx.fillText('MANU CHASING!', canvas.width - 250, 50);
            ctx.fillRect(50, birdY, 20, 20);
        }

        // Update score
        if (frame % 90 === 0) {
            setScore(prev => prev + 1);
        }

        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Score: ' + score, 20, 40);

        frame++;
        requestAnimationFrame(loop);
    };

    loop();

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, [gameOver]);

return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-800 text-white">
        {gameOver ? (
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-4">Game Over</h1>
                <p className="text-2xl mb-6">Your Score: {score}</p>
                <button onClick={() => router.push('/leaderboard')} className="bg-white text-black px-6 py-2 rounded-2xl hover:bg-gray-300">View Leaderboard</button>
            </div>
        ) : (
            <canvas ref={canvasRef} width={600} height={400} className="border-4 border-white rounded-2xl"></canvas>
        )}
    </main>
);
}
