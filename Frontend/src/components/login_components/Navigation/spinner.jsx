const Spinner = () => {
    const spinnerContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height to center spinner vertically
    };
  
    const spinnerStyle = {
      width: '50px',
      height: '50px',
      border: '8px solid #f3f3f3', // Light grey
      borderTop: '8px solid #3498db', // Blue
      borderRadius: '50%',
      animation: 'spin 2s linear infinite',
    };
  
    return (
      <div style={spinnerContainerStyle}>
        <div style={spinnerStyle}></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  };
  
  export default Spinner;
  