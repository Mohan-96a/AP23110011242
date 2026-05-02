import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import NotificationDashboard from './dashboard';

export default function RootLayout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Campus Notification System</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f5f5f5' }}>
        <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Campus Notifications
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          <NotificationDashboard />
        </Box>
      </body>
    </html>
  );
}
