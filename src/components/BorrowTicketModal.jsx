import React from 'react';
import { X, Printer, CheckCircle, Clock, AlertTriangle, FileText, QrCode } from 'lucide-react';

export default function BorrowTicketModal({ ticket, isOpen, onClose }) {
  if (!isOpen || !ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Đã duyệt':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-blue-800 dark:bg-teal-950 dark:text-teal-300">Đã duyệt (Đang mượn)</span>;
      case 'Chờ duyệt':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">Chờ duyệt</span>;
      case 'Đã trả':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Đã trả xong</span>;
      case 'Quá hạn':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">Quá hạn trả</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        
        {/* Header Action Bar (no-print) */}
        <div className="no-print bg-slate-100 dark:bg-slate-750 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span className="font-bold text-sm text-slate-800 dark:text-white">Chi tiết Phiếu Mượn</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="py-1.5 px-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              In Phiếu (A4/A5)
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas */}
        <div id="printable-ticket" className="p-8 text-slate-800 dark:text-slate-100 space-y-6 bg-white dark:bg-slate-800 print:text-black print:bg-white print:p-0">
          
          {/* School Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 text-center sm:text-left print:border-black">
            <div>
              <p className="text-xs uppercase font-semibold tracking-wider text-slate-600 dark:text-slate-400 print:text-black">
                SỞ GIÁO DỤC VÀ ĐÀO TẠO • TRƯỜNG THCS CHUYỂN ĐỔI SỐ
              </p>
              <h2 className="text-base font-extrabold uppercase text-slate-900 dark:text-white print:text-black">
                HỆ THỐNG THƯ VIỆN & THIẾT BỊ DẠY HỌC
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-black">
                Hotline hỗ trợ: 0236 3 888 999 • Email: webmaster@thcs.pdtstudio.store
              </p>
            </div>

            {/* QR Code on Ticket */}
            <div className="hidden sm:flex flex-col items-center">
              <div className="w-16 h-16 border border-slate-300 p-1 rounded-md bg-white">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(ticket.ticketCode)}`}
                  alt="QR Ticket"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-mono text-[9px] text-slate-500 mt-0.5 print:text-black">Mã QR phiếu</span>
            </div>
          </div>

          {/* Ticket Title */}
          <div className="text-center space-y-1">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white print:text-black uppercase">
              PHIẾU MƯỢN THIẾT BỊ & TÀI NGUYÊN THƯ VIỆN
            </h1>
            <p className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400 print:text-black">
              Mã số: {ticket.ticketCode}
            </p>
            <div className="no-print pt-1 flex justify-center">
              {getStatusBadge(ticket.status)}
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-750 print:bg-transparent p-4 rounded-2xl border border-slate-200 dark:border-slate-700 print:border-black">
            <div className="space-y-2">
              <p>
                <span className="text-slate-500 dark:text-slate-400 print:text-black">Người mượn: </span>
                <strong className="text-slate-900 dark:text-white print:text-black">{ticket.borrowerName}</strong>
              </p>
              <p>
                <span className="text-slate-500 dark:text-slate-400 print:text-black">Đối tượng: </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">{ticket.borrowerType}</span>
              </p>
              <p>
                <span className="text-slate-500 dark:text-slate-400 print:text-black">Lớp / Tổ chuyên môn: </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">{ticket.department}</span>
              </p>
              <p>
                <span className="text-slate-500 dark:text-slate-400 print:text-black">Số điện thoại: </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">{ticket.phone}</span>
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="text-slate-500 dark:text-slate-400 print:text-black">Ngày mượn: </span>
                <strong className="text-slate-900 dark:text-white print:text-black">{ticket.borrowDate}</strong>
              </p>
              <p>
                <span className="text-slate-500 dark:text-slate-400 print:text-black">Hạn trả quy định: </span>
                <strong className="text-amber-600 dark:text-amber-400 print:text-black">{ticket.dueDate}</strong>
              </p>
              {ticket.returnDate && (
                <p>
                  <span className="text-slate-500 dark:text-slate-400 print:text-black">Ngày thực trả: </span>
                  <strong className="text-emerald-600 dark:text-emerald-400 print:text-black">{ticket.returnDate}</strong>
                </p>
              )}
              <p>
                <span className="text-slate-500 dark:text-slate-400 print:text-black">Mục đích: </span>
                <span className="italic text-slate-700 dark:text-slate-300 print:text-black">{ticket.purpose}</span>
              </p>
            </div>
          </div>

          {/* Resource Details Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-300 dark:border-slate-600 print:border-black">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700 print:bg-slate-200 text-slate-700 dark:text-slate-200 print:text-black font-bold">
                  <th className="border border-slate-300 dark:border-slate-600 print:border-black p-2 w-12 text-center">STT</th>
                  <th className="border border-slate-300 dark:border-slate-600 print:border-black p-2">Mã tài nguyên</th>
                  <th className="border border-slate-300 dark:border-slate-600 print:border-black p-2">Tên sách / Thiết bị</th>
                  <th className="border border-slate-300 dark:border-slate-600 print:border-black p-2 text-center w-20">Số lượng</th>
                  <th className="border border-slate-300 dark:border-slate-600 print:border-black p-2 text-center w-20">Đơn vị</th>
                  <th className="border border-slate-300 dark:border-slate-600 print:border-black p-2">Tình trạng bàn giao</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 dark:border-slate-600 print:border-black p-2 text-center">1</td>
                  <td className="border border-slate-300 dark:border-slate-600 print:border-black p-2 font-mono font-bold">{ticket.resourceId}</td>
                  <td className="border border-slate-300 dark:border-slate-600 print:border-black p-2 font-bold">{ticket.resourceTitle}</td>
                  <td className="border border-slate-300 dark:border-slate-600 print:border-black p-2 text-center font-bold text-teal-600 print:text-black">{ticket.quantity}</td>
                  <td className="border border-slate-300 dark:border-slate-600 print:border-black p-2 text-center">{ticket.resourceUnit}</td>
                  <td className="border border-slate-300 dark:border-slate-600 print:border-black p-2">{ticket.conditionOnBorrow || 'Hoạt động tốt'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Condition on return & Note */}
          <div className="text-xs space-y-1 bg-slate-50 dark:bg-slate-750 print:bg-transparent p-3 rounded-xl border border-slate-200 dark:border-slate-700 print:border-black">
            <p>
              <span className="font-semibold text-slate-700 dark:text-slate-300 print:text-black">Tình trạng khi trả: </span>
              <span>{ticket.conditionOnReturn || 'Chưa hoàn trả (Đang trong thời gian mượn)'}</span>
            </p>
            {ticket.note && (
              <p>
                <span className="font-semibold text-slate-700 dark:text-slate-300 print:text-black">Ghi chú lưu ý: </span>
                <span className="italic text-slate-600 dark:text-slate-400 print:text-black">{ticket.note}</span>
              </p>
            )}
          </div>

          {/* Signatures */}
          <div className="pt-6 grid grid-cols-2 text-center text-xs">
            <div className="space-y-16">
              <p className="font-bold text-slate-900 dark:text-white print:text-black uppercase">
                NGƯỜI MƯỢN
              </p>
              <p className="italic text-slate-500 dark:text-slate-400 print:text-black">
                {ticket.borrowerName}
              </p>
            </div>

            <div className="space-y-16">
              <p className="font-bold text-slate-900 dark:text-white print:text-black uppercase">
                CÁN BỘ PHỤ TRÁCH THƯ VIỆN
              </p>
              <p className="italic text-slate-500 dark:text-slate-400 print:text-black">
                (Ký và ghi rõ họ tên)
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 print:border-black text-[10px] text-center text-slate-500 print:text-black">
            * Độc giả có trách nhiệm bảo quản sách và thiết bị mượn cẩn thận, hoàn trả đúng thời hạn quy định của nhà trường.
          </div>

        </div>

      </div>
    </div>
  );
}
