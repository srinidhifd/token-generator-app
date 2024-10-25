import React from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';

// Adjusted token styles to ensure consistent box sizing and handle long words
const tokenStyle = (tokensPerRow, type) => ({
  backgroundColor: type === 'blue' ? 'rgba(0, 123, 255, 0.2)' : 'rgba(255, 99, 71, 0.2)', // Blue and Red background
  color: type === 'blue' ? '#007bff' : '#ff6347', // Blue and Red text colors
  borderRadius: '5px',
  padding: '5px 10px',
  textAlign: 'center',
  marginTop: '20px',
  flexGrow: 1,
  whiteSpace: 'normal', // Allow words to break normally within the container
  wordBreak: 'break-word', // Break long words or tokens
  minWidth: '50px', // Ensure a minimum width based on average content
  margin: '5px',
  fontSize: tokensPerRow > 20 ? '10px' : '14px', // Adjust font size based on number of tokens per row
});

const containerStyle = {
  padding: '20px',
  marginTop: '20px',
  backgroundColor: '#f7f7f7',
  borderRadius: '5px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  width: '93vw',
  maxWidth: '100vw', // Full width of the viewport
  overflowX: 'auto', // Enable horizontal scroll when necessary
};

const TokenDisplay = ({ tokens, bluePerRow, redPerRow }) => {
  const { blue, red } = tokens;

  // Function to display tokens in the specified number of tokens per row
  const renderTokens = (tokens, perRow, type) => {
    const rows = [];
    for (let i = 0; i < tokens.length; i += perRow) {
      rows.push(tokens.slice(i, i + perRow));
    }

    return rows.map((row, rowIndex) => (
      <Grid
        container
        item
        spacing={1}
        key={`row-${rowIndex}`}
        justifyContent={tokens.length < perRow ? 'flex-start' : 'flex-start'} // Left-align if fewer tokens than perRow
        wrap="nowrap" // Prevent wrapping in case of a high token count
      >
        {row.map((token, tokenIndex) => (
          <Grid
            item
            key={`token-${tokenIndex}`}
            style={{
              flex: '1 1 auto', // Make the boxes flexible
              maxWidth: `calc(100% / ${perRow})`, // Dynamically adjust the width based on tokens per row
              minWidth: '80px', // Ensure a minimum box width for long prefixes
            }}
          >
            <Paper style={tokenStyle(perRow, type)}>{token}</Paper>
          </Grid>
        ))}
      </Grid>
    ));
  };

  return (
    <Box mt={4}>
      <Paper style={containerStyle}>
        <Typography variant="h6" gutterBottom align="center">
          Generated Tokens
        </Typography>

        {/* Blue Tokens with the correct per-row count */}
        {renderTokens(blue, bluePerRow, 'blue')}

        {/* Red Tokens with the correct per-row count */}
        {renderTokens(red, redPerRow, 'red')}
      </Paper>
    </Box>
  );
};

export default TokenDisplay;
