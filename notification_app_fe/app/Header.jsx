"use client";

import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: { xs: 'center', sm: 'space-between' } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          Campus Notifications
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
