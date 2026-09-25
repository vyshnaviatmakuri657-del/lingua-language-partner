"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import KlausChatModal from "./KlausChatModal";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isKlausOpen, setIsKlausOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col antialiased">
      {/* Sidebar for Desktop */}
      <Sidebar onOpenKlaus={() => setIsKlausOpen(true)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <Header onOpenKlaus={() => setIsKlausOpen(true)} />

        <main className="flex-1 pb-20 lg:pb-10 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <MobileNav onOpenKlaus={() => setIsKlausOpen(true)} />
      </div>

      {/* Global Klaus AI Tutor Modal */}
      <KlausChatModal
        isOpen={isKlausOpen}
        onClose={() => setIsKlausOpen(false)}
      />
    </div>
  );
}
export default AppLayout;
