// ===================================================================
// 🔥 Firestore Service — Đồng bộ dữ liệu thời gian thực
// ===================================================================
// Khi độc giả mượn → Firestore cập nhật → Thủ thư thấy ngay lập tức
// ===================================================================

import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy,
  writeBatch,
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { INITIAL_RESOURCES, INITIAL_TICKETS } from '../data/initialData';

// Collection names
const COLLECTIONS = {
  RESOURCES: 'resources',
  TICKETS: 'tickets',
};

// ===================================================================
// 📚 RESOURCES — Tài nguyên thư viện
// ===================================================================

// Tải toàn bộ tài nguyên từ Firestore (1 lần)
export const loadResourcesFromFirestore = async () => {
  try {
    if (!isFirebaseConfigured()) return null;
    const snap = await getDocs(collection(db, COLLECTIONS.RESOURCES));
    if (snap.empty) return null; // Chưa có dữ liệu → cần seed
    return snap.docs.map(d => ({ ...d.data(), _docId: d.id }));
  } catch (err) {
    console.error('Lỗi tải resources từ Firestore:', err);
    return null;
  }
};

// Lắng nghe thay đổi tài nguyên real-time
export const subscribeResources = (callback) => {
  if (!isFirebaseConfigured()) return () => {};
  const q = collection(db, COLLECTIONS.RESOURCES);
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map(d => ({ ...d.data(), _docId: d.id }));
    callback(data);
  }, (err) => {
    console.error('Lỗi subscribe resources:', err);
  });
};

// Cập nhật 1 resource trên Firestore
export const updateResourceOnFirestore = async (resource) => {
  try {
    if (!isFirebaseConfigured()) return;
    const docRef = doc(db, COLLECTIONS.RESOURCES, String(resource.id));
    const { _docId, ...data } = resource;
    await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
  } catch (err) {
    console.error('Lỗi cập nhật resource:', err);
  }
};

// Seed dữ liệu mẫu ban đầu vào Firestore
export const seedResourcesToFirestore = async (resources) => {
  try {
    if (!isFirebaseConfigured()) return;
    const batch = writeBatch(db);
    resources.forEach(res => {
      const docRef = doc(db, COLLECTIONS.RESOURCES, String(res.id));
      batch.set(docRef, { ...res, createdAt: serverTimestamp() });
    });
    await batch.commit();
    console.log(`✅ Đã seed ${resources.length} tài nguyên vào Firestore`);
  } catch (err) {
    console.error('Lỗi seed resources:', err);
  }
};

// ===================================================================
// 🎫 TICKETS — Phiếu mượn
// ===================================================================

// Tải toàn bộ phiếu mượn từ Firestore
export const loadTicketsFromFirestore = async () => {
  try {
    if (!isFirebaseConfigured()) return null;
    const snap = await getDocs(collection(db, COLLECTIONS.TICKETS));
    if (snap.empty) return null;
    return snap.docs.map(d => ({ ...d.data(), _docId: d.id }));
  } catch (err) {
    console.error('Lỗi tải tickets từ Firestore:', err);
    return null;
  }
};

// Lắng nghe phiếu mượn real-time (Thủ thư sẽ thấy ngay khi có phiếu mới!)
export const subscribeTickets = (callback) => {
  if (!isFirebaseConfigured()) return () => {};
  const q = collection(db, COLLECTIONS.TICKETS);
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map(d => ({ ...d.data(), _docId: d.id }));
    // Sắp xếp: mới nhất trước
    data.sort((a, b) => (b.borrowDate || '').localeCompare(a.borrowDate || ''));
    callback(data);
  }, (err) => {
    console.error('Lỗi subscribe tickets:', err);
  });
};

// Tạo phiếu mượn mới trên Firestore
export const createTicketOnFirestore = async (ticket) => {
  try {
    if (!isFirebaseConfigured()) return;
    const docRef = doc(db, COLLECTIONS.TICKETS, ticket.id);
    await setDoc(docRef, { ...ticket, createdAt: serverTimestamp() });
  } catch (err) {
    console.error('Lỗi tạo phiếu mượn:', err);
    throw err;
  }
};

// Cập nhật trạng thái phiếu mượn (Duyệt, Trả, Từ chối...)
export const updateTicketOnFirestore = async (ticketId, updates) => {
  try {
    if (!isFirebaseConfigured()) return;
    const docRef = doc(db, COLLECTIONS.TICKETS, String(ticketId));
    await updateDoc(docRef, { ...updates, updatedAt: serverTimestamp() });
  } catch (err) {
    console.error('Lỗi cập nhật phiếu mượn:', err);
    throw err;
  }
};

// Seed phiếu mượn mẫu
export const seedTicketsToFirestore = async (tickets) => {
  try {
    if (!isFirebaseConfigured()) return;
    const batch = writeBatch(db);
    tickets.forEach(t => {
      const docRef = doc(db, COLLECTIONS.TICKETS, String(t.id));
      batch.set(docRef, { ...t, createdAt: serverTimestamp() });
    });
    await batch.commit();
    console.log(`✅ Đã seed ${tickets.length} phiếu mượn vào Firestore`);
  } catch (err) {
    console.error('Lỗi seed tickets:', err);
  }
};

// ===================================================================
// 🔄 RESET — Khôi phục dữ liệu mẫu
// ===================================================================
export const resetFirestoreData = async () => {
  await seedResourcesToFirestore(INITIAL_RESOURCES);
  await seedTicketsToFirestore(INITIAL_TICKETS);
};
