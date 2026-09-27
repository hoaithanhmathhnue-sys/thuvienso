import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Target, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle, 
  Clock, 
  Compass,
  Cpu,
  Layers,
  Award
} from 'lucide-react';

export default function AboutPage({ setActiveTab }) {
  return (
    <div className="space-y-12 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-800">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          Giới thiệu Thư Viện Số
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          THƯ VIỆN SỐ TRƯỜNG THPT HOÀNG DIỆU
        </h1>

        <p className="text-base sm:text-lg text-teal-600 dark:text-teal-400 font-semibold max-w-2xl mx-auto">
          &ldquo;Kết nối sách với bạn đọc, đưa thư viện đến gần hơn với học sinh&rdquo;
        </p>

        <p className="text-xs text-slate-500 italic">
          Khẩu hiệu hành động: <strong className="text-slate-700 dark:text-slate-300">Học tập – Sáng tạo – Trưởng thành</strong> • Năm học 2026 - 2027
        </p>
      </div>

      {/* Main Philosophy Article */}
      <section className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
        
        <p>
          Một thư viện trường học hấp dẫn không chỉ có nhiều sách hay mà còn giúp học sinh dễ dàng tìm được cuốn sách mình cần. Với mong muốn nâng cao chất lượng phục vụ và từng bước đổi mới hoạt động thư viện, nhà trường giới thiệu <strong>Thư Viện Số THPT Hoàng Diệu trường học</strong> – công cụ hỗ trợ quản lý và khai thác tài nguyên thư viện trên môi trường số.
        </p>

        <p>
          Hệ thống giúp cán bộ thư viện sắp xếp, tra cứu thông tin sách và theo dõi hoạt động mượn, trả một cách thuận tiện. Thay vì mất nhiều thời gian tìm kiếm trong sổ sách, người phụ trách có thể nắm bắt thông tin cần thiết để phục vụ giáo viên và học sinh kịp thời hơn. Dữ liệu được quản lý tập trung cũng hỗ trợ nhà trường theo dõi tình hình sử dụng sách, từ đó có cơ sở bổ sung tài liệu phù hợp với nhu cầu học tập và giảng dạy.
        </p>

        {/* Highlight quote card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-750 dark:to-slate-700 p-6 rounded-2xl border-l-4 border-blue-600 text-slate-800 dark:text-slate-200 italic font-medium">
          &ldquo;Với giáo viên, thư viện là nguồn học liệu để làm phong phú bài giảng và khuyến khích học sinh đọc mở rộng. Với học sinh, mỗi lần tra cứu, lựa chọn và mượn sách là một cơ hội khám phá thêm kiến thức, tìm thấy niềm vui trong việc đọc.&rdquo;
        </div>

        <p>
          Ứng dụng công nghệ vào thư viện còn góp phần giảm công việc ghi chép thủ công, nâng cao hiệu quả quản lý và tạo nền tảng cho các hoạt động giới thiệu sách, phát triển văn hóa đọc trong nhà trường. Khi sách được quản lý tốt và thông tin dễ tiếp cận, thư viện sẽ phát huy vai trò là không gian học tập, chia sẻ và sáng tạo của thầy cô, học sinh.
        </p>

        <p className="font-semibold text-slate-900 dark:text-white">
          Thư Viện Số THPT Hoàng Diệu trường học là một bước đi thiết thực trong quá trình chuyển đổi số của nhà trường, hướng tới mục tiêu xây dựng thư viện hiện đại, thân thiện và luôn mở rộng cánh cửa tri thức cho mỗi học sinh.
        </p>

      </section>

      {/* 4 Core Pillars Grid */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white text-center">
          Chức Năng Trọng Tâm Của Hệ Thống
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Cổng Tra Cứu OPAC</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tra cứu sách, tài liệu tham khảo, thiết bị STEM và đồ dùng dạy học theo từ khóa, vị trí lưu kho trực tuyến 24/7.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Đăng Ký Mượn Online</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Giáo viên và học sinh chủ động đặt mượn trước cho các tiết dạy thực hành, cấp mã phiếu tự động dạng PM2026...
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">In Phiếu & Mã QR</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hỗ trợ in phiếu mượn chuẩn khổ giấy biên bản bàn giao, tạo mã QR động cho từng tài nguyên để quét trên điện thoại.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Thống Kê Trực Quan</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Biểu đồ trực quan top sách/thiết bị khai thác nhiều nhất, giám sát hạn trả và xuất báo cáo kiểm kê Excel chỉ bằng một cú nhấp chuột.
            </p>
          </div>
        </div>
      </section>

      {/* Visual School Map & Facility Layout (Bản đồ nhà trường) */}
      <section className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              Sơ Đồ Bố Trí Thư Viện & Các Phòng Chức Năng
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Vị trí các khu vực mượn trả và lưu trữ thiết bị trong khuôn viên nhà trường
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 font-semibold border border-teal-200 dark:border-teal-800">
            Tòa nhà chính
          </span>
        </div>

        {/* Interactive Visual Floor Layout Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Tầng 1: Kho thiết bị dạy học & Đồ dùng */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-750 border border-amber-200/80 dark:border-slate-700 space-y-2">
            <span className="font-bold text-amber-800 dark:text-amber-400 uppercase text-[10px] tracking-wider">
              Tầng 1 • Khu vực tiếp nhận
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Kho Thiết Bị & Đồ Dùng Dạy Học</h4>
            <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
              Giá E1, E2, E3 (Bản đồ, mô hình hình học, bảng từ) và Tủ D1, D2 (Loa kéo di động, micro UHF).
            </p>
            <div className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold pt-1">
              Phụ trách: Cán bộ thiết bị trường học
            </div>
          </div>

          {/* Tầng 2: Phòng Thư viện chính & Đọc sách */}
          <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-slate-750 border border-teal-200/80 dark:border-slate-700 space-y-2">
            <span className="font-bold text-blue-800 dark:text-teal-400 uppercase text-[10px] tracking-wider">
              Tầng 2 • Không gian đọc
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Thư Viện & Phòng Đọc Mở</h4>
            <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
              Kệ sách Văn Sử A1, Khoa học B2, Toán học C1, Kỹ năng sống D3 và Tủ C2-C4 (Máy tính bảng, Wifi 5G).
            </p>
            <div className="text-[11px] text-teal-700 dark:text-teal-300 font-semibold pt-1">
              Phụ trách: Cán bộ Thư viện chính
            </div>
          </div>

          {/* Tầng 3: Phòng Thí nghiệm KHTN & Phòng STEM */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-slate-750 border border-emerald-200/80 dark:border-slate-700 space-y-2">
            <span className="font-bold text-emerald-800 dark:text-emerald-400 uppercase text-[10px] tracking-wider">
              Tầng 3 • Thực hành sáng tạo
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Phòng Thí Nghiệm & Phòng STEM</h4>
            <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
              Tủ F1, F2 (Bộ robot STEM cơ bản, bộ dụng cụ thí nghiệm khoa học tự nhiên, kính hiển vi, hóa chất mẫu).
            </p>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold pt-1">
              Phụ trách: Tổ trưởng bộ môn KHTN & STEM
            </div>
          </div>

        </div>
      </section>

      {/* Rules & Guidelines (Quy chế mượn trả) */}
      <section className="bg-slate-50 dark:bg-slate-750 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Nội Quy Mượn & Bảo Quản Tài Nguyên
        </h2>
        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Thời hạn mượn thông thường:</strong> Thiết bị dạy học mượn theo buổi hoặc tuần; Sách tham khảo tối đa 7-14 ngày. Nếu cần tiếp tục sử dụng vui lòng làm thủ tục gia hạn.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Bảo quản hiện vật:</strong> Người mượn có trách nhiệm giữ gìn sách, thiết bị cẩn thận, không làm rách nát, tẩy xóa, làm hỏng linh kiện hoặc thất lạc phụ kiện đi kèm.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Kiểm tra khi hoàn trả:</strong> Khi bàn giao trả sách/thiết bị, thủ thư sẽ đối chiếu tình trạng thực tế và ghi nhận vào phiếu điện tử xác nhận hoàn tất.</span>
          </li>
        </ul>
      </section>

      {/* Author Section */}
      <section className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img src="/avatar.jpg" alt="GV. Trần Thị Kim Thoa" className="w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-teal-200 dark:border-teal-800" />
          <div className="text-center sm:text-left space-y-2">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">GV. Trần Thị Kim Thoa</h3>
            <p className="text-sm text-teal-600 dark:text-teal-400 font-semibold">Trường THPT Hoàng Diệu — Năm học 2026 - 2027</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Số 1 Mạc Đĩnh Chi, phường Phú Lợi, thành phố Cần Thơ • Hotline: 0918939942
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-500 italic">
              Người phát triển & quản trị hệ thống Thư Viện Số
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => setActiveTab('catalog')}
          className="px-8 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-500/25 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Bắt đầu tra cứu và đăng ký mượn ngay
        </button>
      </div>

    </div>
  );
}
