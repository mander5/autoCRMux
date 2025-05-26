import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '30px',
        padding: '10px 18px',
        fontSize: '1rem',
        fontWeight: 500,
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#f0f0f0',
        color: '#333',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#e0e0e0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>←</span> Back to Home
    </button>
  );
};

export default BackButton;
