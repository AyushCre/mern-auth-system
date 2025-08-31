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
            const res = await axios.post('http://localhost:5001/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Invalid Credentials');
        }
    };

    const styles = {
        container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontFamily: 'Arial, sans-serif' },
        form: { display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
        h2: { textAlign: 'center', marginBottom: '20px' },
        input: { marginBottom: '15px', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' },
        button: { padding: '10px', fontSize: '16px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={onSubmit}>
                <h2 style={styles.h2}>Login</h2>
                <input style={styles.input} type="email" name="email" placeholder="Email" onChange={onChange} required />
                <input style={styles.input} type="password" name="password" placeholder="Password" onChange={onChange} required />
                <button style={styles.button} type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;