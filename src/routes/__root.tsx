import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import * as React from 'react'
import { Toaster } from 'sonner'
import '../index.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Secure Checkout - RYZ PAY',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@400;500;600;700;800&display=swap',
      },
    ],
  }),
  notFoundComponent: () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-xl text-gray-400">The page you're looking for doesn't exist.</p>
          <a href="/" className="inline-block px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Go Home
          </a>
        </div>
      </div>
    )
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <Toaster position="top-center" richColors />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <Scripts />
      </body>
    </html>
  )
}


