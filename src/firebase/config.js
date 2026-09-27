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
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Kiểm tra đã cấu hình chưa
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.apiKey !== "";
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
