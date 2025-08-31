// Login.js placeholder
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err)
            alert('Invalid Credentials');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" onChange={onChange} required />
            <input type="password" name="password" placeholder="Password" onChange={onChange} required />
            <button type="submit">Login</button>
        </form>
    );
};
export default Login;