// src/app/layout.tsx (or pages/_app.tsx for Pages Router)
'use client';

import React, { ReactNode } from 'react';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import { AuthProvider } from 'src/hooks/useAuth';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-background text-foreground">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Print3DCo — Instant 3D Printing Service</title>
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
