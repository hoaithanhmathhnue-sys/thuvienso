// ===================================================================
// 🔥 Firebase Configuration — Hệ thống Quản lý Thư viện & Thiết bị
// ===================================================================
// ⚠️  HƯỚNG DẪN: Thay thế các giá trị "YOUR_..." bằng config thật 
//     lấy từ Firebase Console > Project Settings > Your apps > Web
// ===================================================================

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔑 Cấu hình Firebase — Lấy từ Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyClqnSKILmZykguH-Fqjwb5VfU_3Mch7Ys",
  authDomain: "thu-vien-truong-hoc-544a7.firebaseapp.com",
  projectId: "thu-vien-truong-hoc-544a7",
  storageBucket: "thu-vien-truong-hoc-544a7.firebasestorage.app",
  messagingSenderId: "306798699777",
  appId: "1:306798699777:web:a8251f554a154156146700"
};

// Kiểm tra đã cấu hình chưa (đã cấu hình = true)
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey && firebaseConfig.apiKey.length > 10 && !firebaseConfig.apiKey.startsWith("YOUR_");
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Authentication
export const auth = getAuth(app);

// Google Provider cho đăng nhập
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Khởi tạo Firestore Database
export const db = getFirestore(app);

export default app;
