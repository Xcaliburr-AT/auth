import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        color: '#343a40',
    };

    const headingStyle = {
        fontSize: '72px',
        margin: '0',
    };

    const subheadingStyle = {
        fontSize: '24px',
        marginBottom: '24px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const linkStyle = {
        color: '#007bff',
        textDecoration: 'none',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>404</h1>
            <p style={subheadingStyle}>Page Not Found</p>
            <button style={buttonStyle} onClick={handleGoHome}>Go to Home</button>
            <p style={{ marginTop: '20px' }}>
                Or go back to <a style={linkStyle} onClick={() => navigate(-1)}>previous page</a>
            </p>
        </div>
    );
};

export default NotFoundPage;
