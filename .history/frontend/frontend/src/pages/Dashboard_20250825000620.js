import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const styles = {
        container: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', fontFamily: 'Arial, sans-serif', textAlign: 'center' },
        card: { padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff', border: '1px solid #ddd' },
        h2: { marginBottom: '10px' },
        p: { marginBottom: '30px', fontSize: '18px', color: '#555' },
        button: { padding: '10px 20px', fontSize: '16px', borderRadius: '5px', border: 'none', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.h2}>Dashboard</h2>
                <p style={styles.p}>Welcome! You are logged in.</p>
                <button style={styles.button} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;