/*
export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-5xl font-bold mb-4">Page Not Found</h1>
      </div>
    );
  }
    */

'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        href="/"
        className="text-blue-600 underline hover:text-blue-800 transition-colors"
      >
        Go back to Splash Page
      </Link>
    </div>
  );
}