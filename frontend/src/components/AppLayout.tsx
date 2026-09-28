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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Visible Ambient Background Canvas with Animated Light Orbs */}
      <div className="bg-ambient-canvas -z-50">
        <div className="ambient-orb orb-primary" />
        <div className="ambient-orb orb-secondary" />
        <div className="ambient-orb orb-tertiary" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Sidebar for Desktop */}
      <Sidebar onOpenKlaus={() => setIsKlausOpen(true)} />

      {/* Main Content Area with fluid max-width */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <Header onOpenKlaus={() => setIsKlausOpen(true)} />

        <main className="flex-1 pb-24 lg:pb-12 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
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
