import React, { useState, useMemo } from 'react';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Check, 
  X, 
  CornerDownLeft, 
  Calendar, 
  User, 
  Building,
  RotateCw,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import { exportDataToCsv } from '../data/mockStorage';

export default function BorrowTicketsPage({ 
  tickets, 
  isAdmin, 
  onViewTicket,
  onApproveTicket,
  onRejectTicket,
  onReturnTicket 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [returnModalTicket, setReturnModalTicket] = useState(null);
  const [returnCondition, setReturnCondition] = useState('Tài nguyên hoàn trả đầy đủ, nguyên trạng tốt');

  // Filtered tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      if (statusFilter !== 'ALL' && t.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCode = t.ticketCode.toLowerCase().includes(q);
        const matchName = t.borrowerName.toLowerCase().includes(q);
        const matchDept = t.department.toLowerCase().includes(q);
        const matchRes = t.resourceTitle.toLowerCase().includes(q);
        const matchPhone = t.phone.toLowerCase().includes(q);
        if (!matchCode && !matchName && !matchDept && !matchRes && !matchPhone) {
          return false;
        }
      }
      return true;
    });
  }, [tickets, statusFilter, searchQuery]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Đã duyệt':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-blue-800 dark:bg-teal-950 dark:text-teal-300">
            <CheckCircle2 className="w-3 h-3" />
            Đã duyệt
          </span>
        );
      case 'Chờ duyệt':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <Clock className="w-3 h-3" />
            Chờ duyệt
          </span>
        );
      case 'Đã trả':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <Check className="w-3 h-3" />
            Đã trả xong
          </span>
        );
      case 'Quá hạn':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
            <AlertCircle className="w-3 h-3" />
            Quá hạn trả
          </span>
        );
      case 'Từ chối':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
            <X className="w-3 h-3" />
            Từ chối
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const handleExportCsv = () => {
    const headers = [
      { key: 'ticketCode', label: 'Mã phiếu mượn' },
      { key: 'borrowerName', label: 'Họ tên người mượn' },
      { key: 'borrowerType', label: 'Đối tượng' },
      { key: 'department', label: 'Lớp / Tổ chuyên môn' },
      { key: 'phone', label: 'Số điện thoại' },
      { key: 'resourceTitle', label: 'Tên sách / Thiết bị' },
      { key: 'quantity', label: 'Số lượng' },
      { key: 'resourceUnit', label: 'Đơn vị tính' },
      { key: 'borrowDate', label: 'Ngày mượn' },
      { key: 'dueDate', label: 'Hạn trả' },
      { key: 'returnDate', label: 'Ngày thực trả' },
      { key: 'status', label: 'Trạng thái' },
      { key: 'conditionOnBorrow', label: 'Tình trạng lúc giao' },
      { key: 'conditionOnReturn', label: 'Tình trạng lúc trả' }
    ];
    exportDataToCsv('Danh_sach_phieu_muon_tra', filteredTickets, headers);
  };

  const handleConfirmReturn = () => {
    if (!returnModalTicket) return;
    onReturnTicket(returnModalTicket.id, {
      returnDate: new Date().toISOString().split('T')[0],
      conditionOnReturn: returnCondition
    });
    setReturnModalTicket(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <ClipboardList className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Danh Sách & Tra Cứu Phiếu Mượn Thiết Bị / Sách
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tra cứu tình trạng duyệt, hạn trả và in phiếu mượn giao nhận sách & đồ dùng học tập.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="py-2 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Xuất Excel / CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tra cứu theo mã phiếu (PM2026...), họ tên người mượn, lớp..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'Tất cả' },
            { id: 'Chờ duyệt', label: 'Chờ duyệt' },
            { id: 'Đã duyệt', label: 'Đang mượn' },
            { id: 'Đã trả', label: 'Đã trả' },
            { id: 'Quá hạn', label: 'Quá hạn' },
          ].map(s => {
            const isActive = statusFilter === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStatusFilter(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-650'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Tickets List Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3.5 px-4 w-36">Mã phiếu</th>
                <th className="py-3.5 px-4">Người mượn & Đơn vị</th>
                <th className="py-3.5 px-4">Sách / Thiết bị</th>
                <th className="py-3.5 px-3 text-center">Số lượng</th>
                <th className="py-3.5 px-3">Ngày mượn</th>
                <th className="py-3.5 px-3">Hạn trả</th>
                <th className="py-3.5 px-3 text-center">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-200">
              {filteredTickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
                  
                  {/* Mã phiếu */}
                  <td className="py-3.5 px-4">
                    <span 
                      onClick={() => onViewTicket(ticket)}
                      className="font-mono font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer block"
                    >
                      {ticket.ticketCode}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {ticket.borrowDate}
                    </span>
                  </td>

                  {/* Người mượn */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {ticket.borrowerName}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span className="font-medium text-teal-600 dark:text-teal-400">{ticket.borrowerType}</span>
                      <span>•</span>
                      <span>{ticket.department}</span>
                    </div>
                  </td>

                  {/* Sách / Thiết bị */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {ticket.resourceTitle}
                    </div>
                    <div className="text-[10px] text-slate-400 italic mt-0.5">
                      {ticket.purpose}
                    </div>
                  </td>

                  {/* Số lượng */}
                  <td className="py-3.5 px-3 text-center font-bold">
                    {ticket.quantity} {ticket.resourceUnit}
                  </td>

                  {/* Ngày mượn */}
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {ticket.borrowDate}
                  </td>

                  {/* Hạn trả */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className={ticket.status === 'Quá hạn' ? 'text-rose-600 font-bold' : 'text-slate-700 dark:text-slate-300 font-medium'}>
                      {ticket.dueDate}
                    </span>
                    {ticket.returnDate && (
                      <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        Trả: {ticket.returnDate}
                      </span>
                    )}
                  </td>

                  {/* Trạng thái */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    {getStatusBadge(ticket.status)}
                  </td>

                  {/* Thao tác */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      
                      {/* Xem & In phiếu */}
                      <button
                        type="button"
                        onClick={() => onViewTicket(ticket)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                        title="Xem & In phiếu mượn"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Admin Quick Actions */}
                      {isAdmin && ticket.status === 'Chờ duyệt' && (
                        <>
                          <button
                            type="button"
                            onClick={() => onApproveTicket(ticket.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                            title="Duyệt phiếu mượn"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onRejectTicket(ticket.id)}
                            className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                            title="Từ chối mượn"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {/* Admin Return action */}
                      {isAdmin && (ticket.status === 'Đã duyệt' || ticket.status === 'Quá hạn') && (
                        <button
                          type="button"
                          onClick={() => setReturnModalTicket(ticket)}
                          className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold shadow-xs flex items-center gap-1"
                          title="Xác nhận trả sách/thiết bị"
                        >
                          <CornerDownLeft className="w-3.5 h-3.5" />
                          Nhận trả
                        </button>
                      )}

                    </div>
                  </td>

                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-slate-500 dark:text-slate-400">
                    Không có phiếu mượn nào phù hợp với điều kiện tìm kiếm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Return Confirmation Modal */}
      {returnModalTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <CornerDownLeft className="w-5 h-5 text-teal-600" />
                Xác nhận Hoàn Trả Thiết Bị / Sách
              </h3>
              <button 
                type="button" 
                onClick={() => setReturnModalTicket(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-2 bg-slate-50 dark:bg-slate-750 p-3 rounded-xl">
              <div>
                <span className="text-slate-500">Mã phiếu: </span>
                <strong className="font-mono text-teal-600">{returnModalTicket.ticketCode}</strong>
              </div>
              <div>
                <span className="text-slate-500">Người mượn: </span>
                <strong className="text-slate-800 dark:text-slate-200">{returnModalTicket.borrowerName}</strong>
              </div>
              <div>
                <span className="text-slate-500">Tài nguyên trả: </span>
                <strong className="text-slate-800 dark:text-slate-200">{returnModalTicket.resourceTitle} ({returnModalTicket.quantity} {returnModalTicket.resourceUnit})</strong>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tình trạng kiểm tra khi nhận lại:
              </label>
              <textarea
                rows="2"
                value={returnCondition}
                onChange={(e) => setReturnCondition(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReturnModalTicket(null)}
                className="py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleConfirmReturn}
                className="py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
              >
                Xác nhận đã trả kho
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
