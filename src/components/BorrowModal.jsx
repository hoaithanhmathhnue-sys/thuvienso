import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  BookOpen, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Building, 
  Layers, 
  CheckCircle, 
  Printer, 
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react';

export default function BorrowModal({ 
  resource, 
  isOpen, 
  onClose, 
  onSubmitSuccess,
  onViewTicket 
}) {
  if (!isOpen || !resource) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 7);
  const defaultDueDateStr = defaultDueDate.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerType: 'Giáo viên',
    department: '',
    phone: '',
    email: '',
    quantity: 1,
    borrowDate: todayStr,
    dueDate: defaultDueDateStr,
    purpose: 'Dạy học thực hành trên lớp',
    conditionOnBorrow: 'Thiết bị/sách nguyên vẹn, hoạt động tốt',
    note: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [createdTicket, setCreatedTicket] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.borrowerName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên người mượn!');
      return;
    }
    if (!formData.department.trim()) {
      setErrorMsg('Vui lòng nhập Lớp học hoặc Tổ chuyên môn!');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Vui lòng nhập số điện thoại liên hệ!');
      return;
    }

    const qty = Number(formData.quantity);
    if (qty <= 0 || qty > resource.availableQty) {
      setErrorMsg(`Số lượng mượn hợp lệ từ 1 đến ${resource.availableQty} ${resource.unit}!`);
      return;
    }

    if (formData.dueDate < formData.borrowDate) {
      setErrorMsg('Ngày hẹn trả không thể trước ngày mượn!');
      return;
    }

    try {
      const resultTicket = onSubmitSuccess({
        ...formData,
        resourceId: resource.id,
        quantity: qty
      });

      // Bắn pháo hoa ăn mừng đăng ký mượn thành công
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }

      setCreatedTicket(resultTicket);
    } catch (err) {
      setErrorMsg(err.message || 'Đã có lỗi xảy ra khi tạo phiếu mượn!');
    }
  };

  const handleClose = () => {
    setCreatedTicket(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-600 via-indigo-600 to-blue-700 p-5 text-white flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Đăng Ký Mượn Sách & Thiết Bị</h2>
              <p className="text-xs text-blue-100">
                Phiếu đăng ký điện tử – Thư Viện Số THPT Hoàng Diệu
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Item Preview Strip */}
        <div className="bg-teal-50 dark:bg-slate-750 px-5 py-3 border-b border-blue-100 dark:border-slate-700 flex items-center gap-4">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-600 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-blue-200 dark:bg-teal-900 text-blue-800 dark:text-blue-200">
                {resource.code}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {resource.category}
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
              {resource.title}
            </h4>
            <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-3 mt-0.5">
              <span>Vị trí: <strong>{resource.location}</strong></span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Còn sẵn: {resource.availableQty} {resource.unit}
              </span>
            </div>
          </div>
        </div>

        {/* If Ticket Created Successfully: Show Success Card */}
        {createdTicket ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Đăng ký mượn thành công!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Yêu cầu mượn của bạn đã được ghi nhận vào Thư Viện Số THPT Hoàng Diệu.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-600 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-600">
                <span className="text-slate-500 dark:text-slate-400">Mã phiếu mượn:</span>
                <span className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">
                  {createdTicket.ticketCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Người mượn:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{createdTicket.borrowerName} ({createdTicket.department})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Sách / Thiết bị:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{createdTicket.resourceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Số lượng:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{createdTicket.quantity} {createdTicket.resourceUnit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Thời hạn trả:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{createdTicket.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Trạng thái:</span>
                <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {createdTicket.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              * Quý thầy cô/học sinh vui lòng đến phòng Thư viện & Thiết bị gặp Thủ thư để nhận tài nguyên và ký biên bản giao nhận.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => onViewTicket(createdTicket)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Printer className="w-4 h-4" />
                Xem & In Phiếu Mượn
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="py-2.5 px-5 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
              >
                Hoàn tất
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Row 1: Đối tượng & Họ tên */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Đối tượng mượn <span className="text-rose-500">*</span>
                </label>
                <select
                  name="borrowerType"
                  value={formData.borrowerType}
                  onChange={handleChange}
                  className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="Giáo viên">Giáo viên</option>
                  <option value="Học sinh">Học sinh</option>
                  <option value="Cán bộ nhân viên">Cán bộ / Đoàn Đội</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Họ và tên người mượn <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    name="borrowerName"
                    value={formData.borrowerName}
                    onChange={handleChange}
                    placeholder="Ví dụ: Thầy Phạm Đức Trung / Em Nguyễn Hoàng Mai"
                    className="w-full text-xs py-2 pl-9 pr-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Lớp/Tổ, Điện thoại, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Lớp / Tổ chuyên môn <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="VD: Lớp 7/1 hoặc Tổ Toán"
                    className="w-full text-xs py-2 pl-9 pr-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Số điện thoại liên hệ <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="09xx xxx xxx"
                    className="w-full text-xs py-2 pl-9 pr-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email thông báo
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@thpthoangdieu.edu.vn"
                    className="w-full text-xs py-2 pl-9 pr-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Số lượng, Ngày mượn, Ngày hẹn trả */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-750 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Số lượng ({resource.unit}) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max={resource.availableQty}
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
                <span className="text-[10px] text-slate-500">Tối đa: {resource.availableQty}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ngày mượn
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    name="borrowDate"
                    value={formData.borrowDate}
                    onChange={handleChange}
                    className="w-full text-xs py-2 pl-9 pr-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Hạn trả dự kiến <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    min={formData.borrowDate}
                    onChange={handleChange}
                    className="w-full text-xs py-2 pl-9 pr-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold text-teal-600 dark:text-teal-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Mục đích & Tình trạng bàn giao */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mục đích sử dụng
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="VD: Tiết 3 học thực hành KHTN bài 5"
                  className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tình trạng lúc giao
                </label>
                <input
                  type="text"
                  name="conditionOnBorrow"
                  value={formData.conditionOnBorrow}
                  onChange={handleChange}
                  className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Ghi chú thêm */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ghi chú thêm (nếu có)
              </label>
              <textarea
                name="note"
                rows="2"
                value={formData.note}
                onChange={handleChange}
                placeholder="Nhập yêu cầu phụ kiện đi kèm hoặc lưu ý đặc biệt..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={handleClose}
                className="py-2 px-4 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md shadow-teal-500/20 active:scale-95 transition-all"
              >
                Xác nhận Đăng ký mượn
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
