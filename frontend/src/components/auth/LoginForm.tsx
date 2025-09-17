
import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';

const LoginForm = ({ setLogin }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add authentication logic here
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const response = await axios.post(apiUrl + 'agent/login', { email, password });
            if (response.status === 200) {
                // Handle successful login, e.g., store token, redirect, etc.
                alert('Login successful!');
                setError('');
                setLogin(false);
            } else {
                alert('Login failed: ' + response.data.message);
            }
        }
        catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials and try again.');
        }

        // Example: send login request
        // fetch('/api/login', { ... })
    };

    return (
        <div className="login-form-overlay">
            <div className="login-form-modal">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2 className="title">Login</h2>
                    {error && <div className="error">{error}</div>}
                    <div className="field">
                        <label className="label" htmlFor="email">Email:</label>
                        <input
                            className="input"
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="password">Password:</label>
                        <input
                            className="input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="button" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;