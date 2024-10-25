import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Typography } from '@mui/material';

const formStyle = {
  padding: '20px',
  marginTop: '20px',
  backgroundColor: '#f7f7f7',
  borderRadius: '10px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  width: '92vw',
};

const buttonStyle = {
  width: '40%',
  margin: '10px',
  padding: '12px',
  fontSize: '16px',
  borderRadius: '5px',
};

const TokenForm = ({ setTokens, setTokenRows }) => {
  const [formData, setFormData] = useState({
    blueCount: '',
    bluePrefix: '',
    bluePerRow: '',
    redCount: '',
    redPrefix: '',
    redPerRow: '',
  });

  const [errors, setErrors] = useState({
    blueCount: '',
    bluePerRow: '',
    redCount: '',
    redPerRow: '',
    bluePrefix: '',
    redPrefix: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset error when a valid value is entered
    if (value !== '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateInputs = () => {
    let hasError = false;
    const { blueCount, bluePerRow, redCount, redPerRow, bluePrefix, redPrefix } = formData;
    const newErrors = {};

    // Check for empty fields
    if (!blueCount) {
      newErrors.blueCount = 'Please fill the number of blue tokens.';
      hasError = true;
    } else if (isNaN(blueCount)) {
      newErrors.blueCount = 'Enter a valid number for blue tokens.';
      hasError = true;
    }

    if (!bluePerRow) {
      newErrors.bluePerRow = 'Please fill the number of blue tokens per row.';
      hasError = true;
    } else if (isNaN(bluePerRow)) {
      newErrors.bluePerRow = 'Enter a valid number for blue tokens per row.';
      hasError = true;
    }

    if (!redCount) {
      newErrors.redCount = 'Please fill the number of red tokens.';
      hasError = true;
    } else if (isNaN(redCount)) {
      newErrors.redCount = 'Enter a valid number for red tokens.';
      hasError = true;
    }

    if (!redPerRow) {
      newErrors.redPerRow = 'Please fill the number of red tokens per row.';
      hasError = true;
    } else if (isNaN(redPerRow)) {
      newErrors.redPerRow = 'Enter a valid number for red tokens per row.';
      hasError = true;
    }

    if (parseInt(bluePerRow) > parseInt(blueCount)) {
      newErrors.bluePerRow = 'Tokens per row must not exceed total blue tokens.';
      hasError = true;
    }

    if (parseInt(redPerRow) > parseInt(redCount)) {
      newErrors.redPerRow = 'Tokens per row must not exceed total red tokens.';
      hasError = true;
    }

    // Check for empty token prefixes
    if (!bluePrefix) {
      newErrors.bluePrefix = 'Blue token prefix is required.';
      hasError = true;
    }

    if (!redPrefix) {
      newErrors.redPrefix = 'Red token prefix is required.';
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleGenerate = () => {
    if (!validateInputs()) return;

    const blueTokens = Array.from({ length: parseInt(formData.blueCount, 10) }, (_, i) => `${formData.bluePrefix}${i + 1}`);
    const redTokens = Array.from({ length: parseInt(formData.redCount, 10) }, (_, i) => `${formData.redPrefix}${i + 1}`);

    // Set tokens and per-row values
    setTokens({ blue: blueTokens, red: redTokens });
    setTokenRows({ bluePerRow: parseInt(formData.bluePerRow), redPerRow: parseInt(formData.redPerRow) });
  };

  const handleClear = () => {
    setFormData({
      blueCount: '',
      bluePrefix: '',
      bluePerRow: '',
      redCount: '',
      redPrefix: '',
      redPerRow: '',
    });
    setTokens({ blue: [], red: [] });
    setTokenRows({ bluePerRow: 1, redPerRow: 1 });
    setErrors({
      blueCount: '',
      bluePerRow: '',
      redCount: '',
      redPerRow: '',
      bluePrefix: '',
      redPrefix: '',
    });
  };

  return (
    <Paper elevation={4} style={formStyle}>
      <Typography variant="h5" align="center" gutterBottom>
        Token Generator Form
      </Typography>
      <Grid container spacing={2} mt={2}>
        {/* Blue Token Inputs */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Number of Blue Tokens"
            name="blueCount"
            value={formData.blueCount}
            onChange={handleInputChange}
            variant="outlined"
            error={!!errors.blueCount}
            helperText={errors.blueCount}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Blue Token Prefix"
            name="bluePrefix"
            value={formData.bluePrefix}
            onChange={handleInputChange}
            variant="outlined"
            error={!!errors.bluePrefix}
            helperText={errors.bluePrefix}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Blue Tokens Per Row"
            name="bluePerRow"
            value={formData.bluePerRow}
            onChange={handleInputChange}
            variant="outlined"
            error={!!errors.bluePerRow}
            helperText={errors.bluePerRow}
          />
        </Grid>

        {/* Red Token Inputs */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Number of Red Tokens"
            name="redCount"
            value={formData.redCount}
            onChange={handleInputChange}
            variant="outlined"
            error={!!errors.redCount}
            helperText={errors.redCount}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Red Token Prefix"
            name="redPrefix"
            value={formData.redPrefix}
            onChange={handleInputChange}
            variant="outlined"
            error={!!errors.redPrefix}
            helperText={errors.redPrefix}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Red Tokens Per Row"
            name="redPerRow"
            value={formData.redPerRow}
            onChange={handleInputChange}
            variant="outlined"
            error={!!errors.redPerRow}
            helperText={errors.redPerRow}
          />
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} container justifyContent="center">
          <Button variant="contained" color="error" style={buttonStyle} onClick={handleClear}>
            Clear
          </Button>
          <Button variant="contained" color="primary" style={buttonStyle} onClick={handleGenerate}>
            Generate Tokens
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TokenForm;
