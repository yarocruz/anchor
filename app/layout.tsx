import './globals.css'
import React from "react";
import Navbar from "@/app/auth/Navbar";

export const metadata = {
  title: 'Anchor',
  description: 'Old school bookmarking',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
      {children}
      </body>
    </html>
  )
}
