import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    async function login() {
       
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles'); //Navigate to the articles page after logging in
        } catch (e) {
            setError(e.message); //Set the error message to display to the user
        }
    }

    return (
    <>
    <h1>Login</h1>
    <p>Please enter your credentials to log in.</p>

    {error && <p style={{ color: 'red' }}>{error}</p>}

    <input 
        type="email" 
        placeholder="Your email address" 
        value={email}
        onChange={e => setEmail(e.target.value)}/>
    <input 
        type="password" 
        placeholder="Your password" 
        value={password}
        onChange={e => setPassword(e.target.value)}/>

    <button onClick={login}>Log In</button>

    <Link to="/create-account">Don't have an account? Create one here</Link>
    </>
  );
}