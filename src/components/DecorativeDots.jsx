import React from 'react';
import { Box } from '@mui/material';

const DecorativeDots = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Box sx={{
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #00569E, #00B2E4)',
    }} />
    <Box sx={{
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #00B2E4, #FFB60A)',
    }} />
    <Box sx={{
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #FFB60A, #FF6347)',
    }} />
    <Box sx={{
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #FF6347, #00569E)',
    }} />
  </Box>
);

export default DecorativeDots;
