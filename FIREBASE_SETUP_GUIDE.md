# 🔥 Hướng Dẫn Cấu Hình Firebase — Từ A Đến Z

> **Firebase là dịch vụ miễn phí của Google. Bạn chỉ cần 1 tài khoản Google (Gmail) để bắt đầu.**
> Toàn bộ quá trình mất khoảng **5-7 phút**.

---

## Bước 1: Đăng Nhập Firebase Console

1. Mở trình duyệt → vào 👉 **https://console.firebase.google.com/**
2. Đăng nhập bằng **tài khoản Google** (Gmail) của bạn
3. Nếu chưa có Gmail → tạo tại https://accounts.google.com/signup

---

## Bước 2: Tạo Firebase Project

1. Nhấn nút **"Create a project"** (hoặc "Tạo dự án")
2. **Đặt tên project**: nhập `thu-vien-truong-hoc` → nhấn **Continue**
3. **Google Analytics**: 
   - ❌ **Tắt** (gạt sang OFF) — không cần cho app này
   - Nhấn **Create Project**
4. Đợi khoảng 30 giây → Nhấn **Continue** khi hiện "Your new project is ready"

---

## Bước 3: Bật Authentication (Xác thực)

**Đây là bước quan trọng nhất để phân quyền online!**

1. Ở menu bên trái, nhấn **Build** → **Authentication**
2. Nhấn **"Get started"**
3. Trong tab **"Sign-in method"**, bật **2 nhà cung cấp** sau:

### 3a. Bật Email/Password
- Nhấn vào **Email/Password**
- Gạt **Enable** sang BẬT
- Nhấn **Save**

### 3b. Bật Google Sign-In
- Nhấn vào **Google**
- Gạt **Enable** sang BẬT
- **Project support email**: chọn email của bạn
- Nhấn **Save**

---

## Bước 4: Tạo Cloud Firestore Database

1. Ở menu bên trái, nhấn **Build** → **Firestore Database**
2. Nhấn **"Create database"**
3. **Chọn vị trí server**:
   - Chọn: **`asia-southeast1 (Singapore)`** ← gần Việt Nam nhất
   - Nhấn **Next**
4. **Security rules**: 
   - ✅ Chọn **"Start in test mode"** (cho phép đọc/ghi trong 30 ngày)
   - Nhấn **Create**

---

## Bước 5: Đăng Ký Web App

1. Nhấn vào **biểu tượng ⚙️ Settings** (cạnh "Project Overview" ở góc trên bên trái)
2. Chọn **"Project settings"**
3. Kéo xuống phần **"Your apps"** → Nhấn biểu tượng **`</>`** (Web)
4. **Đặt tên app**: nhập `Thu Vien Web App`
   - ❌ KHÔNG tick "Firebase Hosting"
   - Nhấn **"Register app"**
5. 🎯 **Quan trọng!** Bạn sẽ thấy đoạn config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "thu-vien-truong-hoc.firebaseapp.com",
  projectId: "thu-vien-truong-hoc",
  storageBucket: "thu-vien-truong-hoc.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

6. **COPY** toàn bộ các giá trị trong `firebaseConfig`
7. Nhấn **"Continue to console"**

---

## Bước 6: Dán Config Vào Code

Mở file `src/firebase/config.js` và **thay thế** các giá trị `YOUR_...` bằng config thật:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",              // ← dán giá trị thật
  authDomain: "xxx.firebaseapp.com",
  projectId: "xxx",
  storageBucket: "xxx.firebasestorage.app",
  messagingSenderId: "123...",
  appId: "1:123...:web:abc..."
};
```

---

## Bước 7: Tạo Tài Khoản Admin (Thủ Thư)

Sau khi app chạy, cần **nâng quyền** cho tài khoản admin:

### Cách 1: Qua Firebase Console (Đơn giản nhất)
1. Vào **Firestore Database** trên Firebase Console
2. Tìm collection `users`
3. Tìm document có `uid` của tài khoản cần nâng quyền
4. Sửa field `role` từ `"reader"` thành `"librarian"`
5. Lưu lại → Đăng nhập lại app sẽ có quyền Admin

### Cách 2: Tạo sẵn document
1. Trong Firestore Console, nhấn **"Start collection"**
2. Collection ID: `users`
3. Document ID: copy `uid` từ **Authentication** → **Users**
4. Thêm các field:
   - `uid` (string): copy uid
   - `email` (string): email tài khoản
   - `displayName` (string): Tên hiển thị
   - `role` (string): `librarian`
   - `createdAt` (timestamp): chọn thời gian hiện tại

---

## Bước 8: Authorized Domains (cho Vercel)

**Nếu deploy lên Vercel, bạn CẦN thêm domain vào danh sách authorized!**

1. Vào **Authentication** → **Settings** → Tab **"Authorized domains"**
2. Nhấn **"Add domain"**
3. Thêm domain Vercel của bạn, ví dụ: `ten-app.vercel.app`
4. Nhấn **Add**

---

## Bước 9: Test Thử

1. Chạy `npm run dev` → mở `http://localhost:5173`
2. Bạn sẽ thấy **trang Đăng nhập** (vì Firebase đã được cấu hình)
3. **Đăng ký** tài khoản mới hoặc **Đăng nhập** bằng Google
4. Kiểm tra Firestore Console → collection `users` sẽ tự động có document mới
5. Nâng quyền `role` → `librarian` nếu cần quyền Admin

---

## ❓ Câu Hỏi Thường Gặp

| Câu hỏi | Trả lời |
|---------|---------|
| Firebase có mất phí không? | Spark Plan miễn phí: 1GB Firestore, 10GB transfer/tháng, 50K đọc/ngày. Đủ cho trường học! |
| Chưa cấu hình Firebase thì sao? | App vẫn chạy bằng localStorage! Toggle "Bạn đọc / Thủ thư" để chuyển vai trò. |
| Làm sao biết Firebase hoạt động? | Mở app → nếu thấy trang Đăng nhập (không phải Danh mục) → đã OK! |
| Quên mật khẩu? | Đăng nhập bằng Google hoặc thêm tính năng "Quên MK" sau. |

---

## 📋 Tóm Tắt Vai Trò

| Vai trò | Field `role` | Quyền hạn |
|---------|-------------|-----------|
| Độc giả | `reader` | Tra cứu, xem phiếu mượn, đăng ký mượn sách |
| Thủ thư (Admin) | `librarian` | Tất cả + Duyệt/Từ chối + Quản trị kho + Thống kê |
