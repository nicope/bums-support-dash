import './globals.css'

export const metadata = {
  title: 'Bums & Roses — Support Dashboard',
  description: 'Weekly support performance tracking',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f1a] text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
