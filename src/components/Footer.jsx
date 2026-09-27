import React from 'react';
import { 
  BookOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  QrCode, 
  ChevronRight,
} from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Logo THPT Hoàng Diệu" className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-teal-500/30" />
              <div>
                <h3 className="text-white font-bold text-base tracking-tight">Thư Viện Số THPT Hoàng Diệu</h3>
                <p className="text-xs text-teal-400 font-medium">GV. Trần Thị Kim Thoa</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 italic font-medium leading-relaxed">
              &ldquo;Học tập – Sáng tạo – Trưởng thành. Kết nối nguồn sách và thiết bị dạy học hiện đại đến từng học sinh và thầy cô.&rdquo;
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-flex items-center px-2 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                Hệ thống trực tuyến 24/7
              </span>
            </div>
          </div>

          {/* Column 2: Liên hệ nhà trường */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
              <Phone className="w-4 h-4 text-teal-400" />
              Thông tin liên hệ
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Số 1 Mạc Đĩnh Chi, phường Phú Lợi, thành phố Cần Thơ</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Hotline: <strong className="text-amber-400 font-bold">0918939942</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Email: <a href="mailto:thuvien@thpthoangdieu.edu.vn" className="hover:text-teal-400 transition-colors">thuvien@thpthoangdieu.edu.vn</a></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Cổng thông tin: <a href="https://thuviensothpthoangdieu.vercel.app" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">thuviensothpthoangdieu.vercel.app</a></span>
              </li>
            </ul>
          </div>

          {/* Column 3: Liên kết nhanh */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
              <ChevronRight className="w-4 h-4 text-teal-400" />
              Liên kết nhanh
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('catalog')} 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-500">›</span> Tra cứu kho sách & thiết bị
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('tickets')} 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-500">›</span> Tra cứu phiếu mượn - trả
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('dashboard')} 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-500">›</span> Báo cáo thống kê trực quan
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('about')} 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-500">›</span> Giới thiệu hệ thống & Quy định
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Mã QR & Tiện ích */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
              <QrCode className="w-4 h-4 text-teal-400" />
              Truy cập nhanh di động
            </h4>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://thuviensothpthoangdieu.vercel.app" 
                  alt="QR Code Cổng thư viện" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xs space-y-1">
                <p className="font-semibold text-white">Quét mã QR</p>
                <p className="text-slate-400 text-[11px] leading-tight">
                  Mở nhanh trên điện thoại thông minh để đăng ký mượn ngay tại phòng học.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © Năm học 2026 - 2027 • Bản quyền thuộc về <strong className="text-slate-300">Thư Viện Số THPT Hoàng Diệu</strong>. Thiết kế & phát triển bởi <a href="https://thuviensothpthoangdieu.vercel.app/" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">GV. Trần Thị Kim Thoa</a>.
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setActiveTab('about')} className="hover:text-slate-300 transition-colors">
              Điều khoản sử dụng
            </button>
            <span>•</span>
            <button type="button" onClick={() => setActiveTab('about')} className="hover:text-slate-300 transition-colors">
              Quy định mượn trả
            </button>
            <span>•</span>
            <button 
              type="button" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-medium"
            >
              Lên đầu trang ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
