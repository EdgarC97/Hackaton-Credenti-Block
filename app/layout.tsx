"use client"
import Navbar from "./components/Navegation";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {/* Comprueba si la ruta actual es parte del dashboard */}
        {!isDashboard && <Navbar />}
        {children}
      </body>
    </html>
  );
}