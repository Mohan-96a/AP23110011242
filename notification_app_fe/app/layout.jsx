"use client";

import React from 'react';
import Providers from './providers';
import Header from './Header';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Campus Notification System</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f5f5f5' }}>
        <Providers>
          <Header />
          <main style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
