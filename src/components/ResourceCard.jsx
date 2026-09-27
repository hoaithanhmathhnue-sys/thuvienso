import React from 'react';
import { 
  MapPin, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Bookmark, 
  ArrowRight,
  QrCode,
  Tag,
  Cpu,
  Book,
  FileSpreadsheet
} from 'lucide-react';

export default function ResourceCard({ resource, onBorrow, onDetail }) {
  const isAvailable = resource.availableQty > 0;
  const percentAvailable = Math.round((resource.availableQty / resource.totalQty) * 100);

  const getGroupBadgeClass = (group) => {
    switch (group) {
      case 'Thiết bị':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Sách thư viện':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      
      {/* Image & Badges Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={resource.image}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs backdrop-blur-md ${getGroupBadgeClass(resource.group)}`}>
            {resource.group}
          </span>

          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs backdrop-blur-md ${
            isAvailable 
              ? 'bg-emerald-500/90 text-white' 
              : 'bg-rose-500/90 text-white'
          }`}>
            {isAvailable ? (
              <>
                <CheckCircle2 className="w-3 h-3" />
                Còn {resource.availableQty} {resource.unit}
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                Hết sách/thiết bị
              </>
            )}
          </span>
        </div>

        {/* Bottom Left Code Tag inside image */}
        <div className="absolute bottom-2.5 left-3">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/60 text-white border border-white/20 backdrop-blur-md">
            {resource.code}
          </span>
        </div>

        {/* Quick QR View Icon */}
        <button
          type="button"
          onClick={() => onDetail(resource)}
          className="absolute bottom-2.5 right-3 p-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm"
          title="Xem chi tiết & mã QR"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category Pill */}
        <div className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-medium mb-1.5">
          <Tag className="w-3.5 h-3.5" />
          <span className="truncate">{resource.category}</span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onDetail(resource)}
          className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors leading-snug mb-2"
          title={resource.title}
        >
          {resource.title}
        </h3>

        {/* Metadata info */}
        <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-400 mb-3 flex-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate font-medium">{resource.location}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-700/60">
            <span>Tồn kho: <strong className="text-slate-700 dark:text-slate-200">{resource.availableQty} / {resource.totalQty} {resource.unit}</strong></span>
            <span>Đã mượn: <strong className="text-teal-600 dark:text-teal-400">{resource.borrowCount || 0} lượt</strong></span>
          </div>

          {/* Availability progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                percentAvailable > 50 
                  ? 'bg-emerald-500' 
                  : percentAvailable > 20 
                    ? 'bg-amber-500' 
                    : 'bg-rose-500'
              }`}
              style={{ width: `${percentAvailable}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
          <button
            type="button"
            onClick={() => onDetail(resource)}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          >
            Chi tiết
          </button>
          
          <button
            type="button"
            disabled={!isAvailable}
            onClick={() => onBorrow(resource)}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              isAvailable 
                ? 'bg-teal-600 hover:bg-teal-700 active:scale-95 text-white shadow-teal-500/20' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{isAvailable ? 'Đăng ký mượn' : 'Tạm hết'}</span>
            {isAvailable && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

    </div>
  );
}
