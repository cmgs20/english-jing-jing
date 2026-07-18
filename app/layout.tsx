import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://englishjingjing.com'),
  title: 'English jing jing',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="stylesheet" href="/palette.css" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
