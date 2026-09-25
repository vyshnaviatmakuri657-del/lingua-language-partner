import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Lingua — AI Language Learning Platform",
  description: "Learn a language. Use it in real life. Powered by native language instruction and Klaus AI tutor.",
  keywords: ["language learning", "AI tutor", "Telugu", "Hindi", "Korean", "Spanish", "French", "Lingua", "Klaus"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
