import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UserSquare2, Home, Trophy, Settings, Activity, Shield, CalendarDays, ClipboardCheck, Scale, ArrowRightLeft, FileWarning, Gavel, ListOrdered, Medal, BarChart3, Ticket, BookOpen, MessageSquare, Files } from "lucide-react";
import { useAuthStore, type UserRole } from "../store/useAuthStore";

export function MainLayout() {
  const location = useLocation();
  const { role, setRole } = useAuthStore();

  const allNavItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Organizations", path: "/organizations", icon: Home },
    { name: "Teams", path: "/teams", icon: Users },
    { name: "Rosters", path: "/rosters", icon: Users },
    { name: "Players", path: "/players", icon: Activity },
    { name: "Equipment", path: "/equipment", icon: Shield },
    { name: "Lineups", path: "/lineups", icon: Users },
    { name: "Persons", path: "/persons", icon: UserSquare2 },
    { name: "Team Staff", path: "/team-staff", icon: ClipboardCheck },
    { name: "Seasons", path: "/seasons", icon: Trophy },
    { name: "Games", path: "/games", icon: CalendarDays },
    { name: "Game Officials", path: "/game-officials", icon: Scale },
    { name: "Playoffs", path: "/playoffs", icon: Medal },
    { name: "Advanced Stats", path: "/advanced-stats", icon: BarChart3 },
    { name: "Waivers", path: "/waivers", icon: FileWarning },
    { name: "Transfers", path: "/transfers", icon: ArrowRightLeft },
    { name: "Suspensions", path: "/suspensions", icon: Gavel },
    { name: "Player Draft", path: "/player-draft", icon: ListOrdered },
    { name: "Events", path: "/events", icon: Ticket },
    { name: "Practices", path: "/practices", icon: BookOpen },
    { name: "Documents", path: "/documents", icon: Files },
    { name: "Messages", path: "/messages", icon: MessageSquare },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const navItems = role === 'admin'
    ? allNavItems
    : allNavItems.filter(item => item.name === "Dashboard");

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col items-center justify-center gap-4">
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            ICE HOCKEY LM
          </h1>
          <div className="w-full text-sm">
            <label htmlFor="role-select" className="block text-xs font-semibold text-slate-500 mb-1">
              Test Role
            </label>
            <select
              id="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-700 outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="admin">Admin</option>
              <option value="scorekeeper">Scorekeeper</option>
              <option value="coach">Coach</option>
              <option value="player">Player</option>
              <option value="referee">Referee</option>
            </select>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shadow-sm shrink-0">
          <div className="flex-1">
             {/* Search or breadcrumbs could go here */}
          </div>
          <div className="flex items-center gap-4">
             {/* Avatar placeholder */}
             <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                AD
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {role !== 'admin' && location.pathname !== '/' ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">Access Denied</h2>
                <p className="text-slate-500">You do not have permission to view this page.</p>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
