import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UserSquare2, Home, Trophy, Settings } from "lucide-react";

export function MainLayout() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Organizations", path: "/organizations", icon: Home },
    { name: "Teams", path: "/teams", icon: Users },
    { name: "Persons", path: "/persons", icon: UserSquare2 },
    { name: "Seasons", path: "/seasons", icon: Trophy },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-center">
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            ICE HOCKEY LM
          </h1>
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
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
