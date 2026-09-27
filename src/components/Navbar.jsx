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
  PhoneCall, 
  Mail, 
  Clock, 
  UserCheck, 
  Sparkles,
  QrCode
} from 'lucide-react';

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

  const navItems = [
    { id: 'catalog', label: 'Danh mục tài nguyên', icon: Layers },
    { id: 'tickets', label: 'Phiếu mượn - trả', icon: ClipboardList, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'dashboard', label: 'Thống kê & Báo cáo', icon: BarChart3 },
    { id: 'admin', label: 'Quản trị thư viện', icon: ShieldCheck, adminOnly: true },
    { id: 'about', label: 'Giới thiệu', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Banner Contact Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-xs py-1.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-blue-200" />
              Hotline: <strong className="text-yellow-300">0236 3 888 999</strong>
            </span>
            <span className="hidden sm:inline-block text-blue-300">•</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-200" />
              webmaster@thcs.pdtstudio.store
            </span>
            <span className="hidden md:inline-block text-blue-300">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-blue-100">
              <Clock className="w-3.5 h-3.5 text-blue-200" />
              Phục vụ: Thứ 2 - Thứ 7 (7h00 - 17h00)
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Role Switcher */}
            <div className="flex items-center bg-blue-900/50 rounded-full p-0.5 border border-blue-400/30">
              <button
                type="button"
                onClick={() => setIsAdmin(false)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                  !isAdmin 
                    ? 'bg-white text-blue-900 shadow-sm' 
                    : 'text-blue-200 hover:text-white'
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
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                Thủ thư (Admin)
              </button>
            </div>
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
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  Thư Viện & Thiết Bị
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                  PDT Studio
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Kết nối sách & thiết bị dạy học trực tuyến
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
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  {item.label}
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions: Theme toggle & Mobile menu button */}
          <div className="flex items-center gap-2">
            {/* Quick Dark Mode toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Role indicator badge on desktop */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {isAdmin ? 'Quyền: Thủ thư' : 'Chế độ: Độc giả'}
              </span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
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
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Vai trò đang kích hoạt:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {isAdmin ? 'Quản trị viên (Thủ thư)' : 'Độc giả / Giáo viên'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
