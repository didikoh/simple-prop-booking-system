
import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const LoginForm = ({ setLogin }: any) => {
    const { setLoadingSpinner } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // 新增

    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add authentication logic here
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setLoadingSpinner(true);

        if (isAdmin) {
            try {
                const response = await axios.post(apiUrl + 'agent/login', { email, password });
                if (response.status === 200) {
                    // Handle successful login, e.g., store token, redirect, etc.
                    alert('Login successful!');
                    setError('');
                    setLogin(false);
                    navigate('/booking'); // 跳转到 /admin 页面
                } else {
                    alert('Login failed: ' + response.data.message);
                }
            }
            catch (error) {
                console.error('Login error:', error);
                setError('Login failed. Please check your credentials and try again.');
            }
        } else {
            try {
                const response = await axios.post(apiUrl + 'agent/login', { email, password });
                if (response.status === 200) {
                    // Handle successful login, e.g., store token, redirect, etc.
                    alert('Login successful!');
                    setError('');
                    setLogin(false);
                    navigate('/booking'); // 跳转到 /admin 页面
                } else {
                    alert('Login failed: ' + response.data.message);
                }
            }
            catch (error) {
                console.error('Login error:', error);
                setError('Login failed. Please check your credentials and try again.');
            }
        }
        setLoadingSpinner(false);
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
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={e => setIsAdmin(e.target.checked)}
                            />
                            Admin
                        </label>
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
                    <button className="button cancel" type="button" onClick={() => setLogin(false)}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;