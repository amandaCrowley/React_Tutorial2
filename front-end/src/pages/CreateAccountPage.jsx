import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function CreateAccountPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    async function createAccount() {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return; //If the password and confirm password don't match, set an error message and return to prevent creating the account
        } 

        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles'); //Navigate to the articles page after creating the account
        } catch (e) {
            setError(e.message); //Set the error message to display to the user
        }
    }

    return (
    <>
    <h1>Create Account</h1>

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

    <input 
        type="password" 
        placeholder="Confirm your password" 
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}/>

    <button onClick={createAccount}>Create Account</button>

    <Link to="/login">Already have an account? Log in here</Link>
    </>
  );
}