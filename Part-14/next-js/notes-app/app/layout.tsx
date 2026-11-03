import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import Navbar from "./components/NavBar"
import Notification from "./components/Notification"
import { NotificationProvider } from "./components/NotificationContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <Navbar />
            <Notification />
            {children}            
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}