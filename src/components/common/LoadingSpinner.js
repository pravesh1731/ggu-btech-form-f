import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      textAlign: 'center'
    }}>
      <div style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }}></div>
      <p style={{ color: '#4a5568', fontSize: '16px' }}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
