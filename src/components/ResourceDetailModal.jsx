import React from 'react';
import { 
  X, 
  MapPin, 
  Layers, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  QrCode,
  Tag,
  Building,
  Award,
  Hash
} from 'lucide-react';

export default function ResourceDetailModal({ 
  resource, 
  isOpen, 
  onClose, 
  onBorrow 
}) {
  if (!isOpen || !resource) return null;

  const isAvailable = resource.availableQty > 0;
  const qrData = `THUVIEN_TRUONGHOC:${resource.code} - ${resource.title} (${resource.location})`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        
        {/* Header Bar */}
        <div className="bg-slate-100 dark:bg-slate-750 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              {resource.code}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Thông tin chi tiết tài nguyên
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Main Info: Image + Title + Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 aspect-square sm:aspect-auto sm:h-52 border border-slate-200 dark:border-slate-600">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md">
                  {resource.group}
                </span>
              </div>
            </div>

            <div className="sm:col-span-2 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {resource.category}
                  </span>
                  <span>•</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isAvailable 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {isAvailable ? `Còn sẵn: ${resource.availableQty} ${resource.unit}` : 'Tạm hết trong kho'}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {resource.title}
                </h2>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-750 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Vị trí lưu kho:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-teal-500 shrink-0" />
                    {resource.location}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Tác giả / Hãng SX:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                    {resource.author || 'Đang cập nhật'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Tổng số lượng:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {resource.totalQty} {resource.unit}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Số lượt đã mượn:</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">
                    {resource.borrowCount || 0} lượt
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mô tả & Hướng dẫn sử dụng
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-750 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              {resource.description || 'Không có mô tả bổ sung cho tài nguyên này.'}
            </p>
          </div>

          {/* QR Code Quick Scan for Students / Mobile Phone */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-750 dark:to-slate-700 p-4 rounded-2xl border border-blue-100 dark:border-slate-600 flex items-center gap-4">
            <div className="w-18 h-18 bg-white rounded-xl p-1.5 shrink-0 shadow-sm border border-slate-200 flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`}
                alt="QR Code tài nguyên"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                <QrCode className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Mã QR tra cứu nhanh di động
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                Giáo viên và học sinh có thể dùng Zalo hoặc ứng dụng máy ảnh điện thoại quét mã này để lưu thông tin và mang đến thủ thư đối chiếu nhanh.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 dark:bg-slate-750 px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            disabled={!isAvailable}
            onClick={() => {
              onClose();
              onBorrow(resource);
            }}
            className={`py-2.5 px-6 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all ${
              isAvailable 
                ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-500/20 active:scale-95' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{isAvailable ? 'Đăng ký mượn ngay' : 'Tạm hết trong kho'}</span>
            {isAvailable && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
}
