import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'task tracker app',
  description: 'application for track and organize your tasks',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}