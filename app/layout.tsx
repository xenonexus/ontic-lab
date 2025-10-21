import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Ontic — Explore the limits of life',
  description: 'Responsive chat UI with faux-3D figure, DNA typing indicator, and handedness toggle',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-transparent antialiased">
        {children}
      </body>
    </html>
  );
}
