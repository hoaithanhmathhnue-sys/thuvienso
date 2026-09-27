// ===================================================================
// 🔐 Firebase Auth Context — Quản lý xác thực & phân quyền
// ===================================================================
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db, isFirebaseConfigured } from './config';

// Context
const AuthContext = createContext(null);

// Vai trò người dùng
export const ROLES = {
  READER: 'reader',       // Độc giả / Học sinh / Giáo viên
  LIBRARIAN: 'librarian', // Thủ thư (Admin)
};

// 🛡️ Danh sách email được tự động gán quyền Thủ thư (Admin)
// Khi email này đăng nhập lần đầu → tự động có quyền librarian
const ADMIN_EMAILS = [
  'tranthikimthoa.c3hd@soctrang.edu.vn',
];

// Hook sử dụng Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  return context;
};

// Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(ROLES.READER);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy thông tin vai trò từ Firestore
  const fetchUserRole = async (uid) => {
    try {
      if (!isFirebaseConfigured()) return ROLES.READER;
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data().role || ROLES.READER;
      }
      return ROLES.READER;
    } catch (err) {
      console.error('Lỗi lấy vai trò người dùng:', err);
      return ROLES.READER;
    }
  };

  // Lưu thông tin người dùng vào Firestore
  const saveUserToFirestore = async (firebaseUser, role = ROLES.READER) => {
    try {
      if (!isFirebaseConfigured()) return;
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const existingDoc = await getDoc(userDocRef);
      
      // Tự động gán quyền Thủ thư cho email trong danh sách ADMIN_EMAILS
      const autoRole = ADMIN_EMAILS.includes(firebaseUser.email?.toLowerCase())
        ? ROLES.LIBRARIAN
        : role;

      if (!existingDoc.exists()) {
        await setDoc(userDocRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
          role: autoRole,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp()
        });
      } else {
        // Nếu email admin nhưng role đang là reader → nâng cấp lên librarian
        const currentData = existingDoc.data();
        const updateData = { lastLoginAt: serverTimestamp() };
        if (ADMIN_EMAILS.includes(firebaseUser.email?.toLowerCase()) && currentData.role !== ROLES.LIBRARIAN) {
          updateData.role = ROLES.LIBRARIAN;
        }
        await setDoc(userDocRef, updateData, { merge: true });
      }
    } catch (err) {
      console.error('Lỗi lưu thông tin người dùng:', err);
    }
  };

  // Theo dõi trạng thái đăng nhập
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const role = await fetchUserRole(firebaseUser.uid);
        setUserRole(role);
      } else {
        setUser(null);
        setUserRole(ROLES.READER);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Đăng nhập bằng Email/Mật khẩu
  const loginWithEmail = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToFirestore(result.user);
      const role = await fetchUserRole(result.user.uid);
      setUserRole(role);
      return result.user;
    } catch (err) {
      const msg = getFirebaseErrorMessage(err.code);
      setError(msg);
      throw new Error(msg);
    }
  };

  // Đăng ký tài khoản mới
  const registerWithEmail = async (email, password, displayName) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      await saveUserToFirestore(result.user, ROLES.READER);
      setUserRole(ROLES.READER);
      return result.user;
    } catch (err) {
      const msg = getFirebaseErrorMessage(err.code);
      setError(msg);
      throw new Error(msg);
    }
  };

  // Đăng nhập bằng Google
  const loginWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(result.user);
      const role = await fetchUserRole(result.user.uid);
      setUserRole(role);
      return result.user;
    } catch (err) {
      const msg = getFirebaseErrorMessage(err.code);
      setError(msg);
      throw new Error(msg);
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(ROLES.READER);
    } catch (err) {
      console.error('Lỗi đăng xuất:', err);
    }
  };

  const value = {
    user,
    userRole,
    loading,
    error,
    isAdmin: userRole === ROLES.LIBRARIAN,
    isLoggedIn: !!user,
    isConfigured: isFirebaseConfigured(),
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Chuyển mã lỗi Firebase sang thông báo tiếng Việt
function getFirebaseErrorMessage(code) {
  const messages = {
    'auth/email-already-in-use': 'Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.',
    'auth/invalid-email': 'Định dạng email không hợp lệ.',
    'auth/user-not-found': 'Không tìm thấy tài khoản với email này.',
    'auth/wrong-password': 'Mật khẩu không đúng. Vui lòng thử lại.',
    'auth/weak-password': 'Mật khẩu quá yếu. Cần ít nhất 6 ký tự.',
    'auth/too-many-requests': 'Quá nhiều lần thử. Vui lòng đợi vài phút rồi thử lại.',
    'auth/popup-closed-by-user': 'Cửa sổ đăng nhập đã bị đóng. Vui lòng thử lại.',
    'auth/network-request-failed': 'Lỗi kết nối mạng. Kiểm tra internet rồi thử lại.',
    'auth/invalid-credential': 'Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra email và mật khẩu.',
  };
  return messages[code] || `Đã có lỗi xảy ra (${code}). Vui lòng thử lại.`;
}

export default AuthContext;
