import React from 'react';
import { 
  BarChart3, 
  Layers, 
  BookOpen, 
  Cpu, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Printer, 
  Download,
  CalendarCheck,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { exportDataToCsv } from '../data/mockStorage';

export default function DashboardPage({ resources, tickets, isAdmin, onViewTicket, onResetStats, onDeleteTicket }) {
  // Calculations
  const totalResourceTypes = resources.length;
  const totalPhysicalItems = resources.reduce((acc, r) => acc + (r.totalQty || 0), 0);
  const totalAvailableItems = resources.reduce((acc, r) => acc + (r.availableQty || 0), 0);
  
  const pendingTickets = tickets.filter(t => t.status === 'Chờ duyệt');
  const activeTickets = tickets.filter(t => t.status === 'Đã duyệt');
  const overdueTickets = tickets.filter(t => t.status === 'Quá hạn');
  const completedTickets = tickets.filter(t => t.status === 'Đã trả');

  // Distribution by Group
  const groupStats = {
    'Thiết bị': resources.filter(r => r.group === 'Thiết bị').length,
    'Sách thư viện': resources.filter(r => r.group === 'Sách thư viện').length,
    'Tài liệu tham khảo': resources.filter(r => r.group === 'Tài liệu tham khảo').length,
  };

  // Top Borrowed Items
  const topBorrowed = [...resources]
    .sort((a, b) => (b.borrowCount || 0) - (a.borrowCount || 0))
    .slice(0, 5);

  // Borrower types breakdown
  const teacherBorrows = tickets.filter(t => t.borrowerType === 'Giáo viên').length;
  const studentBorrows = tickets.filter(t => t.borrowerType === 'Học sinh').length;
  const otherBorrows = tickets.length - teacherBorrows - studentBorrows;

  const handlePrintDashboard = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Báo Cáo & Thống Kê Hoạt Động Thư Viện
          </h1>
          <p className="text-xs text-slate-700 dark:text-slate-400 mt-1">
            Tổng quan dữ liệu khai thác tài nguyên, lượt mượn trả và văn hóa đọc học đường.
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          {isAdmin && onResetStats && (
            <button
              type="button"
              onClick={onResetStats}
              className="py-2 px-3.5 rounded-xl border border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset thống kê về 0
            </button>
          )}
          <button
            type="button"
            onClick={handlePrintDashboard}
            className="py-2 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-teal-600" />
            In Báo Cáo
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Tổng đầu tài nguyên */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Danh mục tài nguyên</span>
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalResourceTypes}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Tổng <strong className="text-slate-700 dark:text-slate-200">{totalPhysicalItems}</strong> hiện vật lưu kho
          </p>
        </div>

        {/* Card 2: Đang cho mượn */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Đang cho mượn</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {activeTickets.length}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Phiếu đang phục vụ giảng dạy
          </p>
        </div>

        {/* Card 3: Chờ duyệt */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Chờ duyệt mượn</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-500">
            {pendingTickets.length}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Yêu cầu mới cần xử lý
          </p>
        </div>

        {/* Card 4: Quá hạn */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quá hạn trả</span>
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-500">
            {overdueTickets.length}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Cần liên hệ thu hồi
          </p>
        </div>

        {/* Card 5: Đã hoàn trả xong */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Đã trả đúng hạn</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {completedTickets.length}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Lượt hoàn tất thành công
          </p>
        </div>

      </div>

      {/* Main Charts & Rankings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Top 5 Sách & Thiết bị mượn nhiều nhất */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              Top Sách & Thiết Bị Được Khai Thác Nhiều Nhất
            </h3>
            <span className="text-xs text-slate-400 font-medium">Học kỳ hiện tại</span>
          </div>

          <div className="space-y-4">
            {topBorrowed.map((item, index) => {
              const maxCount = topBorrowed[0]?.borrowCount || 100;
              const percent = Math.round(((item.borrowCount || 0) / maxCount) * 100);
              return (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        index === 0 ? 'bg-amber-400 text-slate-900' :
                        index === 1 ? 'bg-slate-300 text-slate-800' :
                        index === 2 ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-400'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 hover:text-teal-600 cursor-pointer">
                        {item.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      {item.borrowCount} lượt
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Phân bố Cơ cấu Tài nguyên & Bạn đọc */}
        <div className="space-y-6">
          
          {/* Card: Cơ cấu tài nguyên theo nhóm */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Cơ cấu tài nguyên theo nhóm
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-800 dark:text-slate-300">Thiết bị dạy học:</span>
                  <strong>{groupStats['Thiết bị']} đầu mục</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(groupStats['Thiết bị'] / totalResourceTypes) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-800 dark:text-slate-300">Sách thư viện:</span>
                  <strong>{groupStats['Sách thư viện']} đầu mục</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: `${(groupStats['Sách thư viện'] / totalResourceTypes) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-800 dark:text-slate-300">Tài liệu tham khảo:</span>
                  <strong>{groupStats['Tài liệu tham khảo']} đầu mục</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(groupStats['Tài liệu tham khảo'] / totalResourceTypes) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card: Đối tượng bạn đọc tham gia */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              Tỷ lệ đối tượng mượn
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-slate-750 border border-blue-100 dark:border-slate-700">
                <span className="text-slate-500 text-[11px] block">Giáo viên</span>
                <strong className="text-lg text-teal-600 font-extrabold">{teacherBorrows}</strong>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 block">lượt mượn</span>
              </div>
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-slate-750 border border-indigo-100 dark:border-slate-700">
                <span className="text-slate-500 text-[11px] block">Học sinh</span>
                <strong className="text-lg text-indigo-600 font-extrabold">{studentBorrows}</strong>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 block">lượt mượn</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Overdue Alerts Section */}
      {overdueTickets.length > 0 && (
        <div className="bg-rose-50 dark:bg-rose-950/40 p-5 rounded-3xl border border-rose-200 dark:border-rose-900 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            Cảnh báo: Có {overdueTickets.length} phiếu mượn đã quá hạn trả quy định
          </div>
          <p className="text-xs text-rose-700 dark:text-rose-400">
            Đề nghị cán bộ Thư viện liên hệ nhắc nhở giáo viên/học sinh kịp thời bàn giao lại thiết bị để phục vụ các tiết dạy tiếp theo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
            {overdueTickets.map(t => (
              <div key={t.id} className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-rose-200 dark:border-rose-900 text-xs space-y-1">
                <div className="flex justify-between font-mono font-bold text-rose-600">
                  <span>{t.ticketCode}</span>
                  <span className="text-slate-500 font-normal">Hạn: {t.dueDate}</span>
                </div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{t.borrowerName} ({t.department})</div>
                <div className="text-[11px] text-slate-700 dark:text-slate-400 truncate">{t.resourceTitle}</div>
                <div className="pt-1 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">SĐT: {t.phone}</span>
                  <div className="flex items-center gap-2">
                    {isAdmin && onDeleteTicket && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Xóa phiếu ${t.ticketCode}?`)) {
                            onDeleteTicket(t.id, t);
                          }
                        }}
                        className="text-rose-500 hover:text-rose-700 font-semibold"
                        title="Xóa phiếu"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onViewTicket(t)}
                      className="text-teal-600 hover:underline font-semibold"
                    >
                      Xem phiếu ›
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
