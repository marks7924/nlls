import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";

export const metadata: Metadata = {
  title: "New Life Language School | NLLS",
  description: "New Life Language School (NLLS) — A leading private language school in Egypt providing quality education from Early Years through Preparatory.",
  keywords: "New Life Language School, NLLS, private school, Egypt, language school, education",
  openGraph: {
    title: "New Life Language School | NLLS",
    description: "A leading private language school in Egypt providing quality education.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-slate-800 bg-slate-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
