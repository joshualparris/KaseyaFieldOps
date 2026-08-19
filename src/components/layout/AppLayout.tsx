import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Layers, PlayCircle, Library, Settings } from 'lucide-react';

export function AppLayout() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Products', path: '/modules', icon: Layers },
    { name: 'Shift', path: '/shift', icon: PlayCircle },
    { name: 'Reference', path: '/reference', icon: Library },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-surface border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold text-textMain tracking-tight">Kaseya Field Ops</h1>
          <p className="text-xs text-textMuted mt-1">Avance Business Technology</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-textMain hover:bg-slate-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border text-xs text-textMuted text-center">
          v1.0.0
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative pb-16 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border flex justify-around items-center h-16 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-primary' : 'text-textMuted'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
