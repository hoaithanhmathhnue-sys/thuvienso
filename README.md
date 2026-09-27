# HỆ THỐNG QUẢN LÝ THƯ VIỆN & THIẾT BỊ TRƯỜNG HỌC (PDT STUDIO)

> **Khẩu hiệu hành động:** *Học tập – Sáng tạo – Trưởng thành*  
> **Sứ mệnh:** *Kết nối sách với bạn đọc, đưa thư viện và thiết bị thực hành đến gần hơn với thầy cô và học sinh.*

Ứng dụng web hiện đại được nghiên cứu và phát triển dựa trên mô hình thực tế của **Hệ thống Quản lý Thư viện PDT Studio** (`https://quanlythuvien.pdtstudio.store/about/gioi-thieu-he-thong-quan-ly-thu-vien.html`), nâng cấp toàn diện về giao diện (UI/UX 2026), biểu đồ KPI trực quan, in phiếu mượn chuẩn khổ giấy giáo dục, mã QR quét di động và tối ưu 100% để triển khai lên **Vercel** và quản lý mã nguồn qua **GitHub**.

---

## 🌟 CÁC TÍNH NĂNG NỔI BẬT

### 1. Cổng Tra Cứu Trực Tuyến (OPAC) & Khám Phá Tài Nguyên
- **Bộ lọc đa chiều tức thì**: Lọc theo Nhóm (*Thiết bị, Sách thư viện, Tài liệu tham khảo*), Phân loại chuyên mục (*Thiết bị STEM và thí nghiệm, CNTT, Thiết bị âm thanh, Đồ dùng dạy học, Thiết bị trình chiếu, Sách văn sử, Khoa học...*).
- **Tìm kiếm thông minh**: Tìm nhanh theo tên sách, tên thiết bị, mã số tài nguyên hoặc vị trí ngăn tủ.
- **Chế độ hiển thị linh hoạt**: Chuyển đổi giữa dạng **Lưới thẻ trực quan (Grid view)** và dạng **Bảng dữ liệu chi tiết (Table view)**.
- **Thanh đo tình trạng sẵn sàng**: Tự động tính tỷ lệ còn lại trong kho, gắn nhãn xanh *Còn để mượn* hoặc đỏ *Đang hết*.

### 2. Quy Trình Đăng Ký Mượn Trực Tuyến & Cấp Mã Phiếu Tự Động
- Modal đăng ký mượn với đầy đủ thông tin: Họ tên người mượn, Đối tượng (*Giáo viên, Học sinh, Cán bộ Đoàn Đội*), Lớp / Tổ chuyên môn, Số điện thoại, Email, Số lượng, Mục đích sử dụng và Tình trạng ban đầu.
- Tự động kiểm tra số lượng tồn kho (không cho phép mượn vượt quá số lượng còn lại).
- Tự động sinh mã phiếu mượn duy nhất theo thời gian thực (VD: `PM2026092710425652`).
- Hiệu ứng pháo hoa chúc mừng (*Canvas Confetti*) khi gửi yêu cầu mượn thành công.

### 3. Tra Cứu & In Phiếu Mượn Giao Nhận Chuẩn Giáo Dục
- Tra cứu nhanh mọi lúc bằng mã phiếu, số điện thoại hoặc tên người mượn.
- Xem chi tiết biên bản mượn và **In phiếu mượn chuẩn khổ A4/A5** chỉ với 1 cú nhấp chuột (hỗ trợ đầy đủ tiêu ngữ nhà trường, bảng hiện vật, tình trạng lúc giao/trả, chữ ký bên mượn và cán bộ thư viện).
- **Mã QR Code động**: Tự động sinh mã QR cho từng phiếu và từng tài nguyên để giáo viên/học sinh quét nhanh qua camera điện thoại hoặc Zalo.

### 4. Báo Cáo Thống Kê & Bảng Điều Khiển KPI (Dashboard)
- 5 thẻ chỉ số đo lường hiệu quả thư viện: Tổng số tài nguyên, Hiện vật lưu kho, Phiếu đang mượn, Phiếu chờ duyệt, Phiếu quá hạn và Đã hoàn trả.
- **Biểu đồ Top sách & thiết bị khai thác nhiều nhất**: Thanh đo tỷ lệ phần trăm trực quan.
- **Cơ cấu danh mục tài nguyên**: Phân bố tỷ trọng giữa Thiết bị thí nghiệm, Sách thư viện và Tài liệu tham khảo.
- **Cảnh báo phiếu quá hạn**: Hiển thị danh sách độc giả quá hạn cần thu hồi kèm nút liên hệ và xem phiếu.
- Hỗ trợ in toàn bộ báo cáo phân tích phục vụ họp hội đồng sư phạm nhà trường.

### 5. Phân Hệ Quản Trị Kho Dành Cho Thủ Thư (Admin Portal)
- Nút chuyển vai trò nhanh chóng giữa **Độc giả / Giáo viên** và **Thủ thư (Admin)** trên thanh điều hướng.
- Quản lý kho: Thêm mới sách/thiết bị, chỉnh sửa thông tin, cập nhật số lượng tồn kho hoặc vị trí lưu trữ (tủ/kệ/phòng).
- Duyệt phiếu mượn: Phê duyệt chấp thuận hoặc từ chối phiếu mượn (tự động hoàn kho).
- Tiếp nhận hoàn trả: Ghi nhận tình trạng hiện vật khi trả lại kho, tự động cộng lại số lượng vào kho.
- **Xuất dữ liệu Excel / CSV**: Hỗ trợ xuất danh mục kho sách và danh sách phiếu mượn ra file Excel chuẩn định dạng tiếng Việt UTF-8 BOM.
- **Khôi phục dữ liệu mẫu (Reset Data)**: Đưa hệ thống về lại dữ liệu gốc từ PDT Studio bất cứ lúc nào.

### 6. Trang Giới Thiệu & Bản Đồ Cơ Sở Vật Chất (About Page)
- Bài giới thiệu chuẩn theo tinh thần chuyển đổi số thư viện trường học của PDT Studio.
- Sơ đồ bố trí trực quan: Khu vực Thư viện trung tâm (Tầng 2), Phòng thí nghiệm KHTN & STEM (Tầng 3), Kho thiết bị & Đồ dùng dạy học (Tầng 1).
- Nội quy và hướng dẫn mượn trả tài nguyên trường học.
- Thông tin hotline hỗ trợ (0918939942) và email phản hồi.

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG
- **Core Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (Hỗ trợ chế độ Sáng / Tối Dark Mode mượt mà, Glassmorphism, Print CSS khổ giấy in tiêu chuẩn)
- **Icons**: Lucide React
- **Hiệu ứng**: Canvas Confetti
- **Lưu trữ dữ liệu**: Đồng bộ tự động qua LocalStorage (không phụ thuộc database phức tạp, chạy tĩnh 100% mượt mà trên Vercel)
- **Tối ưu hóa Vercel**: Tích hợp sẵn `vercel.json` định tuyến SPA sạch sẽ.

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT & CHẠY LOCAL (MÁY TÍNH CÁ NHÂN)

### Bước 1: Mở terminal tại thư mục dự án
```bash
cd quan-ly-thu-vien-app
```

### Bước 2: Cài đặt thư viện dependencies (nếu chưa cài)
```bash
npm install
```

### Bước 3: Khởi động máy chủ phát triển
```bash
npm run dev
```
Trình duyệt sẽ mở tại: `http://localhost:5173`

### Bước 4: Kiểm tra build sản phẩm
```bash
npm run build
```
Kết quả build được tạo tại thư mục `dist/` siêu nhẹ và sẵn sàng deploy.

---

## 📤 HƯỚNG DẪN TẢI LÊN GITHUB & DEPLOY QUA VERCEL

### CÁCH 1: Triển Khai Qua Giao Diện GitHub + Vercel (Khuyên Dùng)

#### 1. Đẩy mã nguồn lên GitHub:
1. Mở cửa sổ dòng lệnh tại thư mục `quan-ly-thu-vien-app`.
2. Khởi tạo Git và commit:
   ```bash
   git init
   git add .
   git commit -m "feat: he thong quan ly thu vien va thiet bi truong hoc pdtstudio"
   ```
3. Truy cập vào tài khoản [GitHub](https://github.com/) của bạn -> Nhấn **New repository** -> Đặt tên repo (ví dụ: `quan-ly-thu-vien-app`) -> Nhấn **Create repository**.
4. Chạy 2 lệnh được GitHub cung cấp để đẩy code lên:
   ```bash
   git remote add origin https://github.com/<tai-khoan-cua-ban>/quan-ly-thu-vien-app.git
   git branch -M main
   git push -u origin main
   ```

#### 2. Kết nối và Deploy lên Vercel:
1. Truy cập [Vercel](https://vercel.com/) và đăng nhập bằng tài khoản GitHub của bạn.
2. Nhấn **Add New...** -> chọn **Project**.
3. Tại danh sách repositories, chọn `quan-ly-thu-vien-app` và nhấn **Import**.
4. Vercel sẽ tự động phát hiện framework **Vite** và các thiết lập chuẩn (`Build Command: npm run build`, `Output Directory: dist`).
5. Nhấn **Deploy**.
6. Sau khoảng 30-45 giây, Vercel sẽ cấp cho bạn một tên miền miễn phí dạng `https://quan-ly-thu-vien-app.vercel.app` hoạt động online 24/7!

---

### CÁCH 2: Deploy Nhanh Trực Tiếp Qua Vercel CLI
Nếu bạn có cài đặt `vercel` trên máy tính:
```bash
npx vercel
```
Làm theo các bước xác nhận hiển thị trên màn hình:
- Set up and deploy? **Yes**
- Which scope do you want to deploy to? Chọn tài khoản của bạn.
- Link to existing project? **No**
- What's your project's name? **quan-ly-thu-vien-app**
- In which directory is your code located? **./**

Để deploy lên môi trường Production chính thức:
```bash
npx vercel --prod
```

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN
```text
quan-ly-thu-vien-app/
├── index.html                   # File HTML gốc tích hợp font Plus Jakarta Sans & favicon
├── package.json                 # Cấu hình dự án & danh sách thư viện
├── vite.config.js               # Cấu hình Vite với Tailwind CSS plugin
├── vercel.json                  # Cấu hình định tuyến SPA chuẩn khi deploy Vercel
├── .gitignore                   # Các file không commit lên git (node_modules, dist...)
├── README.md                    # Hướng dẫn chi tiết dự án
└── src/
    ├── main.jsx                 # Điểm khởi chạy React
    ├── App.jsx                  # Component điều phối chính các trang và modals
    ├── index.css                # Cấu hình Tailwind CSS v4, dark mode & print styles
    ├── data/
    │   ├── initialData.js       # Dữ liệu mẫu thực tế chuẩn từ PDT Studio
    │   └── mockStorage.js       # Bộ xử lý LocalStorage, xuất CSV UTF-8 & reset dữ liệu
    ├── components/
    │   ├── Navbar.jsx           # Thanh điều hướng, Hotline, Đổi vai trò, Dark mode
    │   ├── Footer.jsx           # Chân trang PDT Studio, Bản đồ, Hotline, QR code
    │   ├── ResourceCard.jsx     # Thẻ hiển thị sách/thiết bị với thanh đo tồn kho
    │   ├── BorrowModal.jsx      # Modal đăng ký mượn trực tuyến + Pháo hoa Confetti
    │   ├── BorrowTicketModal.jsx# Xem chi tiết phiếu mượn & In khổ giấy A4/A5
    │   ├── ResourceDetailModal.jsx # Xem chi tiết thông số, mã QR và lịch sử
    │   └── Toast.jsx            # Thông báo trạng thái popup mượt mà
    └── pages/
        ├── CatalogPage.jsx      # Tra cứu tài nguyên (Tìm kiếm tức thì, Grid/Table)
        ├── BorrowTicketsPage.jsx# Danh sách và tra cứu phiếu mượn trả
        ├── DashboardPage.jsx    # Báo cáo thống kê, biểu đồ KPI và cảnh báo quá hạn
        ├── AdminManagerPage.jsx # Cổng thủ thư: Thêm/sửa/xóa kho, xuất Excel
        └── AboutPage.jsx        # Giới thiệu hệ thống, triết lý số hóa & bản đồ trường
```

---

## 📞 THÔNG TIN BẢN QUYỀN & HỖ TRỢ
- **Hệ thống Quản lý Thư viện & Thiết bị Trường học — Năm học 2026 - 2027**
- Bản quyền thuộc về **Thư Viện Số THPT Hoàng Diệu**.
- Phát triển bởi **GV. Trần Thị Kim Thoa**.
- **Hotline hỗ trợ**: `0918939942`
- **Email**: `thuvien@thpthoangdieu.edu.vn`
