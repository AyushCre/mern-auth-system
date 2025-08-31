import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // Set the token in the request header
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                
                // Fetch user data from the protected route
                const res = await axios.get('http://localhost:5001/api/auth/user', config);
                setUser(res.data); // Set user data in state

            } catch (err) {
                console.error('Error fetching user data:', err);
                localStorage.removeItem('token'); // Remove invalid token
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const styles = {
        container: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', fontFamily: 'Arial, sans-serif', textAlign: 'center' },
        card: { padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff', border: '1px solid #ddd', minWidth: '300px' },
        h2: { marginBottom: '10px' },
        p: { marginBottom: '30px', fontSize: '18px', color: '#555' },
        button: { padding: '10px 20px', fontSize: '16px', borderRadius: '5px', border: 'none', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer' }
    };

    // Show a loading message while fetching data
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.h2}>Dashboard</h2>
                <p style={styles.p}>Welcome, {user.name}! You are logged in.</p>
                <button style={styles.button} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;