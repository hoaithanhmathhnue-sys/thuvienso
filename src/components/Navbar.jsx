import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  ClipboardList, 
  BarChart3, 
  ShieldCheck, 
  Info, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Globe, 
  Clock, 
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  isAdmin, 
  setIsAdmin,
  pendingCount = 0
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, isConfigured, logout } = useAuth();

  const navItems = [
    { id: 'catalog', label: 'Danh mục tài nguyên', icon: Layers },
    { id: 'tickets', label: 'Phiếu mượn - trả', icon: ClipboardList, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'dashboard', label: 'Thống kê & Báo cáo', icon: BarChart3 },
    { id: 'admin', label: 'Quản trị thư viện', icon: ShieldCheck, adminOnly: true },
    { id: 'about', label: 'Giới thiệu', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-teal-100 dark:border-slate-800 transition-colors">
      {/* Top Banner Contact Bar */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 text-white text-xs py-1.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="https://hoangdieust.vn/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-medium hover:text-amber-300 transition-colors">
              <Globe className="w-3.5 h-3.5 text-teal-200" />
              Website: <strong className="text-amber-300">hoangdieust.vn</strong>
            </a>
            <span className="hidden md:inline-block text-teal-300">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-teal-100">
              <Clock className="w-3.5 h-3.5 text-teal-200" />
              Phục vụ: Thứ 2 - Thứ 7 (7h00 - 17h00)
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* User Info hoặc Role Switcher */}
            {isConfigured && isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-teal-900/50 rounded-full px-2.5 py-1 border border-teal-400/30">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-4 h-4 rounded-full" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-teal-200" />
                  )}
                  <span className="text-[11px] font-medium text-teal-100 max-w-[120px] truncate">
                    {user?.displayName || user?.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] text-teal-200 hover:text-white hover:bg-teal-800/50 transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Thoát</span>
                </button>
              </div>
            ) : (
              /* Fallback: Role Switcher khi chưa cấu hình Firebase */
              <div className="flex items-center bg-teal-900/50 rounded-full p-0.5 border border-teal-400/30">
                <button
                  type="button"
                  onClick={() => setIsAdmin(false)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                    !isAdmin 
                      ? 'bg-white text-teal-900 shadow-sm' 
                      : 'text-teal-200 hover:text-white'
                  }`}
                >
                  Bạn đọc / GV
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdmin(true)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
                    isAdmin 
                      ? 'bg-amber-400 text-slate-900 font-bold shadow-sm' 
                      : 'text-teal-200 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  Thủ thư (Admin)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          
          {/* Brand Logo & Name */}
          <button 
            type="button"
            onClick={() => setActiveTab('catalog')}
            className="flex items-center gap-3 text-left group"
          >
            <img src="/logo.jpg" alt="Logo THPT Hoàng Diệu" className="w-11 h-11 rounded-xl object-cover shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  Thư Viện Số
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800">
                  THPT Hoàng Diệu
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-400 font-medium">
                Trường THPT Hoàng Diệu — TP. Cần Thơ
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.adminOnly && !isAdmin) return null;
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 font-semibold shadow-xs'
                      : 'text-slate-800 dark:text-slate-300 hover:bg-teal-50/50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />
                  {item.label}
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-500 dark:bg-teal-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-400 hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Role indicator badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-slate-700 text-xs">
              <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              <span className="text-slate-800 dark:text-slate-300 font-medium">
                {isAdmin ? 'Quyền: Thủ thư' : 'Chế độ: Độc giả'}
              </span>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-800 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-teal-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-teal-50/50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-teal-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Vai trò đang kích hoạt:</span>
            <span className="font-semibold text-teal-600 dark:text-teal-400">
              {isAdmin ? 'Quản trị viên (Thủ thư)' : 'Độc giả / Giáo viên'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
