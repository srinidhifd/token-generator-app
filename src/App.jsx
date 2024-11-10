import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import TokenForm from './components/TokenForm';
import TokenDisplay from './components/TokenDisplay';
import './App.css';

const App = () => {
  const [tokens, setTokens] = useState({ blue: [], red: [] }); 
  const [tokenRows, setTokenRows] = useState({ bluePerRow: 1, redPerRow: 1 });
  const [isGenerated, setIsGenerated] = useState(false); 

  const titleStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '2.5rem',
  };

  const containerStyle = {
    backgroundImage: `url('./bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw', // Full width of the viewport
    height: '100vh', // Full height of the viewport
    padding: '20px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Center the content vertically and horizontally
    overflowX: 'hidden',  // Ensure no scrollbars
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.5)', 
    borderRadius: '10px',
    padding: '20px',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    marginBottom: '20px',
  };

  const handleGenerate = (newTokens, newTokenRows) => {
    setTokens(newTokens);
    setTokenRows(newTokenRows);
    setIsGenerated(true);
  };

  const handleClear = () => {
    setTokens({ blue: [], red: [] });
    setTokenRows({ bluePerRow: 1, redPerRow: 1 });
    setIsGenerated(false);
  };

  return (
    <div style={containerStyle}>
      {/* Application Title */}
      <Box mt={4} mb={4} textAlign="center">
        <Typography variant="h3" style={titleStyle}>
          Token Generator Application
        </Typography>
      </Box>

      {/* Token Form with Glassmorphism */}
      <Box style={glassStyle}>
        <TokenForm setTokens={handleGenerate} setTokenRows={setTokenRows} onClear={handleClear} />
      </Box>

      {/* Conditionally display the token title and container only when generated */}
      {isGenerated && (
        <Box mt={4} style={glassStyle}>
          <TokenDisplay tokens={tokens} bluePerRow={tokenRows.bluePerRow} redPerRow={tokenRows.redPerRow} />
        </Box>
      )}
    </div>
  );
};

export default App;
