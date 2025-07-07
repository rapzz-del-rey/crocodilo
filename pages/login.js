import { useState } from 'react'; import { useRouter } from 'next/router'; import { saveUser, getUser } from '../lib/storage';
export default function Login() { const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [isRegister, setIsRegister] = useState(false); const router = useRouter();

const handleSubmit = () => {
    if (isRegister) {
        if (getUser(username)) {
            alert('User already exists!');
            return;
        }
        saveUser(username, password);
        alert('Registered successfully! You can now login.');
        setIsRegister(false);
    } else {
        const user = getUser(username);
        if (user && user.password === password) {
            localStorage.setItem('currentUser', username);
            router.push('/game');
        } else {
            alert('Invalid credentials!');
        }
    }
};

return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 text-white">
        <h1 className="text-4xl font-bold mb-6">{isRegister ? 'Register' : 'Login'}</h1>
        <input className="mb-4 px-4 py-2 rounded-xl text-black" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="mb-4 px-4 py-2 rounded-xl text-black" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleSubmit} className="bg-white text-black px-6 py-2 rounded-xl mb-4 hover:bg-gray-300">
            {isRegister ? 'Register' : 'Login'}
        </button>
        <button onClick={() => setIsRegister(!isRegister)} className="underline">{isRegister ? 'Already have an account? Login' : 'No account? Register'}</button>
    </main>
);
}
