import './globals.css'
import React from "react";
import Navbar from "@/app/auth/Navbar";

export const metadata = {
  title: 'Hypertext',
  description: 'Old school bookmarking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <Navbar />
      {children}
      </body>
    </html>
  )
}
