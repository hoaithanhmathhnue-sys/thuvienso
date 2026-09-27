import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CatalogPage from './pages/CatalogPage';
import BorrowTicketsPage from './pages/BorrowTicketsPage';
import DashboardPage from './pages/DashboardPage';
import AdminManagerPage from './pages/AdminManagerPage';
import AboutPage from './pages/AboutPage';
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
  resetToInitialData 
} from './data/mockStorage';

export default function App() {
  // App States
  const [resources, setResources] = useState(() => getStoredResources());
  const [tickets, setTickets] = useState(() => getStoredTickets());
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'tickets' | 'dashboard' | 'admin' | 'about'
  const [isAdmin, setIsAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Modals
  const [borrowingResource, setBorrowingResource] = useState(null);
  const [detailResource, setDetailResource] = useState(null);
  const [viewingTicket, setViewingTicket] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Sync resources and tickets to localStorage on change
  useEffect(() => {
    saveStoredResources(resources);
  }, [resources]);

  useEffect(() => {
    saveStoredTickets(tickets);
  }, [tickets]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Borrow Submission
  const handleBorrowSubmit = (formData) => {
    try {
      const result = createBorrowRequest(formData, resources, tickets);
      setResources(result.resources);
      setTickets(result.tickets);
      showToast(`Đã gửi yêu cầu mượn thành công! Mã: ${result.ticket.ticketCode}`, 'success');
      return result.ticket;
    } catch (err) {
      showToast(err.message || 'Lỗi khi đăng ký mượn', 'error');
      throw err;
    }
  };

  // Handle Approve Ticket
  const handleApproveTicket = (ticketId) => {
    const res = updateTicketState(ticketId, 'Đã duyệt', {}, resources, tickets);
    setResources(res.resources);
    setTickets(res.tickets);
    showToast('Đã duyệt yêu cầu mượn tài nguyên!', 'success');
  };

  // Handle Reject Ticket
  const handleRejectTicket = (ticketId) => {
    const res = updateTicketState(ticketId, 'Từ chối', {}, resources, tickets);
    setResources(res.resources);
    setTickets(res.tickets);
    showToast('Đã từ chối phiếu mượn và hoàn trả lại số lượng kho!', 'info');
  };

  // Handle Return Ticket
  const handleReturnTicket = (ticketId, options) => {
    const res = updateTicketState(ticketId, 'Đã trả', options, resources, tickets);
    setResources(res.resources);
    setTickets(res.tickets);
    showToast('Đã hoàn tất thủ tục bàn giao và nhận lại tài nguyên!', 'success');
  };

  // Handle Reset Data
  const handleResetData = () => {
    const reset = resetToInitialData();
    setResources(reset.resources);
    setTickets(reset.tickets);
    showToast('Đã khôi phục toàn bộ kho dữ liệu về trạng thái ban đầu!', 'success');
  };

  const pendingCount = tickets.filter(t => t.status === 'Chờ duyệt').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
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
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            resources={resources}
            tickets={tickets}
            onViewTicket={(t) => setViewingTicket(t)}
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
