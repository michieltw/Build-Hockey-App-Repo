import React from "react";
import { AppDatabase, UserRole } from "../types";
import { Menu, LogOut, Shield } from "lucide-react";

interface HeaderProps {
  db: AppDatabase;
  onSwitchRole: (role: UserRole, personId: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onResetDb: () => void;
  isDarkMode: boolean;
  onLogoClick: () => void;
  onLogout?: () => void;
}

export function Header({ db, activeTab, setActiveTab, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setActiveTab("dashboard")}
          >
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-headline font-bold text-xl tracking-tight">
              Blackout Manager
            </span>
          </div>
          <nav className="hidden md:flex gap-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-2 rounded-md ${activeTab === "dashboard" ? "bg-primary text-white" : "text-slate-600"}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("scorekeeper")}
              className={`px-3 py-2 rounded-md ${activeTab === "scorekeeper" ? "bg-primary text-white" : "text-slate-600"}`}
            >
              Scorekeeper
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              Log uit
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
