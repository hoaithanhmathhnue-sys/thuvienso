import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from './firebase/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CatalogPage from './pages/CatalogPage';
import BorrowTicketsPage from './pages/BorrowTicketsPage';
import DashboardPage from './pages/DashboardPage';
import AdminManagerPage from './pages/AdminManagerPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import BorrowModal from './components/BorrowModal';
import BorrowTicketModal from './components/BorrowTicketModal';
import ResourceDetailModal from './components/ResourceDetailModal';
import Toast from './components/Toast';

import { 
  getStoredResources, 
  saveStoredResources, 
  getStoredTickets, 
  saveStoredTickets, 
  createBorrowRequest, 
  updateTicketState, 
  resetToInitialData,
  exportDataToCsv
} from './data/mockStorage';

import {
  subscribeResources,
  subscribeTickets,
  loadResourcesFromFirestore,
  loadTicketsFromFirestore,
  seedResourcesToFirestore,
  seedTicketsToFirestore,
  createTicketOnFirestore,
  updateTicketOnFirestore,
  updateResourceOnFirestore,
  resetFirestoreData,
  deleteTicketFromFirestore,
  deleteResourceFromFirestore,
  resetFirestoreStats
} from './firebase/firestoreService';

import { isFirebaseConfigured } from './firebase/config';
import { INITIAL_RESOURCES, INITIAL_TICKETS } from './data/initialData';

export default function App() {
  const { user, isAdmin: firebaseAdmin, isLoggedIn, loading, isConfigured } = useAuth();

  // App States
  const [resources, setResources] = useState(() => getStoredResources());
  const [tickets, setTickets] = useState(() => getStoredTickets());
  const [activeTab, setActiveTab] = useState('catalog');
  const [localAdmin, setLocalAdmin] = useState(false);
  const isAdmin = isConfigured ? firebaseAdmin : localAdmin;
  const [darkMode, setDarkMode] = useState(false);
  const [firestoreReady, setFirestoreReady] = useState(false);
  
  // Modals
  const [borrowingResource, setBorrowingResource] = useState(null);
  const [detailResource, setDetailResource] = useState(null);
  const [viewingTicket, setViewingTicket] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // ===================================================================
  // 🔥 Firestore Real-time Sync
  // Khi Firebase đã cấu hình → dùng Firestore thay localStorage
  // ===================================================================
  useEffect(() => {
    if (!isFirebaseConfigured() || !isLoggedIn) return;

    let unsubResources;
    let unsubTickets;

    const initFirestore = async () => {
      // Kiểm tra xem Firestore đã có dữ liệu chưa
      const existingResources = await loadResourcesFromFirestore();
      if (!existingResources) {
        // Chưa có → seed dữ liệu mẫu lên Firestore
        console.log('🌱 Đang seed dữ liệu mẫu vào Firestore...');
        await seedResourcesToFirestore(INITIAL_RESOURCES);
        await seedTicketsToFirestore(INITIAL_TICKETS);
      }

      // Bật real-time listeners
      unsubResources = subscribeResources((data) => {
        setResources(data);
      });

      unsubTickets = subscribeTickets((data) => {
        setTickets(data);
      });

      setFirestoreReady(true);
    };

    initFirestore();

    return () => {
      if (unsubResources) unsubResources();
      if (unsubTickets) unsubTickets();
    };
  }, [isLoggedIn]);

  // Sync to localStorage khi KHÔNG dùng Firestore (fallback offline)
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      saveStoredResources(resources);
    }
  }, [resources]);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      saveStoredTickets(tickets);
    }
  }, [tickets]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // ===================================================================
  // 📋 Handle Borrow — tạo phiếu mượn (lưu Firestore nếu có)
  // ===================================================================
  const handleBorrowSubmit = async (formData) => {
    try {
      const result = createBorrowRequest(formData, resources, tickets);
      
      if (isFirebaseConfigured() && firestoreReady) {
        // Lưu phiếu mượn lên Firestore → Thủ thư sẽ thấy ngay!
        await createTicketOnFirestore(result.ticket);
        // Cập nhật số lượng resource trên Firestore
        const updatedRes = result.resources.find(r => r.id === formData.resourceId);
        if (updatedRes) {
          await updateResourceOnFirestore(updatedRes);
        }
      } else {
        setResources(result.resources);
        setTickets(result.tickets);
      }

      showToast(`Đã gửi yêu cầu mượn thành công! Mã: ${result.ticket.ticketCode}`, 'success');
      return result.ticket;
    } catch (err) {
      showToast(err.message || 'Lỗi khi đăng ký mượn', 'error');
      throw err;
    }
  };

  // Handle Approve Ticket
  const handleApproveTicket = async (ticketId) => {
    if (isFirebaseConfigured() && firestoreReady) {
      await updateTicketOnFirestore(ticketId, { status: 'Đã duyệt' });
    } else {
      const res = updateTicketState(ticketId, 'Đã duyệt', {}, resources, tickets);
      setResources(res.resources);
      setTickets(res.tickets);
    }
    showToast('Đã duyệt yêu cầu mượn tài nguyên!', 'success');
  };

  // Handle Reject Ticket
  const handleRejectTicket = async (ticketId) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (isFirebaseConfigured() && firestoreReady) {
      await updateTicketOnFirestore(ticketId, { status: 'Từ chối' });
      // Hoàn trả số lượng kho
      if (ticket) {
        const resource = resources.find(r => r.id === ticket.resourceId);
        if (resource) {
          const newAvail = Math.min(resource.totalQty, resource.availableQty + (ticket.quantity || 1));
          await updateResourceOnFirestore({ 
            ...resource, 
            availableQty: newAvail,
            status: newAvail > 0 && resource.status === 'Đang mượn hết' ? 'Còn để mượn' : resource.status
          });
        }
      }
    } else {
      const res = updateTicketState(ticketId, 'Từ chối', {}, resources, tickets);
      setResources(res.resources);
      setTickets(res.tickets);
    }
    showToast('Đã từ chối phiếu mượn và hoàn trả lại số lượng kho!', 'info');
  };

  // Handle Return Ticket
  const handleReturnTicket = async (ticketId, options) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (isFirebaseConfigured() && firestoreReady) {
      await updateTicketOnFirestore(ticketId, { 
        status: 'Đã trả',
        returnDate: options?.returnDate || new Date().toISOString().split('T')[0],
        conditionOnReturn: options?.conditionOnReturn || '',
        ...(options?.note ? { note: `${ticket?.note || ''} | ${options.note}` } : {})
      });
      // Hoàn trả số lượng kho
      if (ticket) {
        const resource = resources.find(r => r.id === ticket.resourceId);
        if (resource) {
          const newAvail = Math.min(resource.totalQty, resource.availableQty + (ticket.quantity || 1));
          await updateResourceOnFirestore({ 
            ...resource, 
            availableQty: newAvail,
            status: newAvail > 0 && resource.status === 'Đang mượn hết' ? 'Còn để mượn' : resource.status
          });
        }
      }
    } else {
      const res = updateTicketState(ticketId, 'Đã trả', options, resources, tickets);
      setResources(res.resources);
      setTickets(res.tickets);
    }
    showToast('Đã hoàn tất thủ tục bàn giao và nhận lại tài nguyên!', 'success');
  };

  // Handle Reset Data
  const handleResetData = async () => {
    if (isFirebaseConfigured() && firestoreReady) {
      await resetFirestoreData();
    } else {
      const reset = resetToInitialData();
      setResources(reset.resources);
      setTickets(reset.tickets);
    }
    showToast('Đã khôi phục toàn bộ kho dữ liệu về trạng thái ban đầu!', 'success');
  };

  // Handle Delete Ticket
  const handleDeleteTicket = async (ticketId, ticket) => {
    try {
      if (isFirebaseConfigured() && firestoreReady) {
        await deleteTicketFromFirestore(ticketId);
        // Hoàn trả số lượng nếu phiếu chưa trả/chưa từ chối
        if (ticket && ticket.status !== 'Đã trả' && ticket.status !== 'Từ chối') {
          const resource = resources.find(r => r.id === ticket.resourceId);
          if (resource) {
            const newAvail = Math.min(resource.totalQty, resource.availableQty + (ticket.quantity || 1));
            await updateResourceOnFirestore({ ...resource, availableQty: newAvail, status: newAvail > 0 ? 'Còn để mượn' : resource.status });
          }
        }
      } else {
        // Offline mode: cập nhật local
        const newTickets = tickets.filter(t => t.id !== ticketId);
        setTickets(newTickets);
        saveStoredTickets(newTickets);
      }
      showToast('Đã xóa phiếu mượn khỏi hệ thống!', 'info');
    } catch (err) {
      console.error('Lỗi xóa phiếu:', err);
      showToast('Lỗi xóa phiếu! Kiểm tra Firestore Rules đã cho phép delete chưa.', 'error');
    }
  };

  // Handle Reset Statistics (xóa hết phiếu + reset borrowCount)
  const handleResetStats = async () => {
    if (!window.confirm('Xóa toàn bộ phiếu mượn và reset thống kê về 0?\nThao tác này không thể hoàn tác!')) return;
    if (isFirebaseConfigured() && firestoreReady) {
      await resetFirestoreStats();
    } else {
      const resetResources = resources.map(r => ({ ...r, borrowCount: 0, availableQty: r.totalQty, status: 'Còn để mượn' }));
      setResources(resetResources);
      setTickets([]);
      saveStoredResources(resetResources);
      saveStoredTickets([]);
    }
    showToast('Đã reset toàn bộ thống kê về 0!', 'success');
  };

  const pendingCount = tickets.filter(t => t.status === 'Chờ duyệt').length;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-teal-700 dark:text-teal-300 font-medium">Đang tải hệ thống...</p>
        </div>
      </div>
    );
  }

  // Nếu Firebase đã cấu hình nhưng chưa đăng nhập → hiện trang Login
  if (isConfigured && !isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-teal-50/30 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isAdmin={isAdmin}
        setIsAdmin={setLocalAdmin}
        pendingCount={pendingCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'catalog' && (
          <CatalogPage
            resources={resources}
            onBorrow={(res) => setBorrowingResource(res)}
            onDetail={(res) => setDetailResource(res)}
            onQuickTicketSearch={() => setActiveTab('tickets')}
          />
        )}

        {activeTab === 'tickets' && (
          <BorrowTicketsPage
            tickets={tickets}
            isAdmin={isAdmin}
            onViewTicket={(t) => setViewingTicket(t)}
            onApproveTicket={handleApproveTicket}
            onRejectTicket={handleRejectTicket}
            onReturnTicket={handleReturnTicket}
            onDeleteTicket={handleDeleteTicket}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            resources={resources}
            tickets={tickets}
            isAdmin={isAdmin}
            onViewTicket={(t) => setViewingTicket(t)}
            onResetStats={handleResetStats}
            onDeleteTicket={handleDeleteTicket}
          />
        )}

        {activeTab === 'admin' && (
          <AdminManagerPage
            resources={resources}
            setResources={setResources}
            tickets={tickets}
            setTickets={setTickets}
            onResetData={handleResetData}
            showToast={showToast}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage setActiveTab={setActiveTab} />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals */}
      <BorrowModal
        resource={borrowingResource}
        isOpen={Boolean(borrowingResource)}
        onClose={() => setBorrowingResource(null)}
        onSubmitSuccess={handleBorrowSubmit}
        onViewTicket={(ticket) => {
          setBorrowingResource(null);
          setViewingTicket(ticket);
        }}
      />

      <ResourceDetailModal
        resource={detailResource}
        isOpen={Boolean(detailResource)}
        onClose={() => setDetailResource(null)}
        onBorrow={(res) => setBorrowingResource(res)}
      />

      <BorrowTicketModal
        ticket={viewingTicket}
        isOpen={Boolean(viewingTicket)}
        onClose={() => setViewingTicket(null)}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
