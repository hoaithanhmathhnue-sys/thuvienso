import { INITIAL_RESOURCES, INITIAL_TICKETS } from './initialData';

const STORAGE_KEYS = {
  RESOURCES: 'pdt_library_resources_v1',
  TICKETS: 'pdt_library_tickets_v1',
  THEME: 'pdt_library_theme_v1',
  USER_ROLE: 'pdt_library_role_v1'
};

export const getStoredResources = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(INITIAL_RESOURCES));
      return INITIAL_RESOURCES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading resources from storage', e);
    return INITIAL_RESOURCES;
  }
};

export const saveStoredResources = (resources) => {
  try {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  } catch (e) {
    console.error('Error saving resources to storage', e);
  }
};

export const getStoredTickets = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TICKETS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(INITIAL_TICKETS));
      return INITIAL_TICKETS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading tickets from storage', e);
    return INITIAL_TICKETS;
  }
};

export const saveStoredTickets = (tickets) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  } catch (e) {
    console.error('Error saving tickets to storage', e);
  }
};

// Đăng ký mượn mới
export const createBorrowRequest = (formData, currentResources, currentTickets) => {
  const resource = currentResources.find(r => r.id === formData.resourceId);
  if (!resource) {
    throw new Error('Không tìm thấy sách/thiết bị cần mượn!');
  }

  const reqQty = Number(formData.quantity) || 1;
  if (resource.availableQty < reqQty) {
    throw new Error(`Số lượng còn lại (${resource.availableQty} ${resource.unit}) không đủ để mượn!`);
  }

  // Tạo mã phiếu chuẩn dạng PMYYYYMMDDHHMMSS
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const codeSuffix = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${Math.floor(10 + Math.random() * 90)}`;
  const ticketCode = `PM${codeSuffix}`;

  const newTicket = {
    id: ticketCode,
    ticketCode,
    resourceId: resource.id,
    resourceTitle: resource.title,
    resourceUnit: resource.unit,
    quantity: reqQty,
    borrowerName: formData.borrowerName.trim(),
    borrowerType: formData.borrowerType || 'Học sinh',
    department: formData.department.trim(),
    phone: formData.phone.trim(),
    email: formData.email.trim(),
    purpose: formData.purpose.trim() || 'Dạy học / Học tập',
    borrowDate: formData.borrowDate || now.toISOString().split('T')[0],
    dueDate: formData.dueDate,
    returnDate: null,
    status: 'Chờ duyệt',
    conditionOnBorrow: formData.conditionOnBorrow || 'Nguyên vẹn',
    conditionOnReturn: '',
    note: formData.note ? formData.note.trim() : 'Đăng ký qua Cổng thông tin Thư viện'
  };

  // Cập nhật số lượng còn lại và số lượt mượn
  const updatedResources = currentResources.map(r => {
    if (r.id === resource.id) {
      const newAvail = Math.max(0, r.availableQty - reqQty);
      return {
        ...r,
        availableQty: newAvail,
        status: newAvail === 0 ? 'Đang mượn hết' : r.status,
        borrowCount: (r.borrowCount || 0) + 1
      };
    }
    return r;
  });

  const updatedTickets = [newTicket, ...currentTickets];

  saveStoredResources(updatedResources);
  saveStoredTickets(updatedTickets);

  return {
    ticket: newTicket,
    resources: updatedResources,
    tickets: updatedTickets
  };
};

// Cập nhật trạng thái phiếu mượn (Duyệt, Trả, Từ chối, Quá hạn)
export const updateTicketState = (ticketId, nextStatus, options = {}, currentResources, currentTickets) => {
  const ticket = currentTickets.find(t => t.id === ticketId);
  if (!ticket) return { resources: currentResources, tickets: currentTickets };

  let updatedResources = [...currentResources];
  const reqQty = ticket.quantity || 1;

  // Nếu chuyển sang "Đã trả" hoặc "Từ chối" mà trước đó đã trừ kho -> Hoàn lại số lượng
  if (nextStatus === 'Đã trả' && ticket.status !== 'Đã trả') {
    updatedResources = updatedResources.map(r => {
      if (r.id === ticket.resourceId) {
        const newAvail = Math.min(r.totalQty, r.availableQty + reqQty);
        return {
          ...r,
          availableQty: newAvail,
          status: newAvail > 0 && r.status === 'Đang mượn hết' ? 'Còn để mượn' : r.status
        };
      }
      return r;
    });
  } else if (nextStatus === 'Từ chối' && ticket.status !== 'Từ chối' && ticket.status !== 'Đã trả') {
    updatedResources = updatedResources.map(r => {
      if (r.id === ticket.resourceId) {
        const newAvail = Math.min(r.totalQty, r.availableQty + reqQty);
        return {
          ...r,
          availableQty: newAvail,
          status: newAvail > 0 && r.status === 'Đang mượn hết' ? 'Còn để mượn' : r.status
        };
      }
      return r;
    });
  }

  const updatedTickets = currentTickets.map(t => {
    if (t.id === ticketId) {
      return {
        ...t,
        status: nextStatus,
        returnDate: nextStatus === 'Đã trả' ? (options.returnDate || new Date().toISOString().split('T')[0]) : t.returnDate,
        conditionOnReturn: options.conditionOnReturn !== undefined ? options.conditionOnReturn : t.conditionOnReturn,
        note: options.note ? `${t.note ? t.note + ' | ' : ''}${options.note}` : t.note
      };
    }
    return t;
  });

  saveStoredResources(updatedResources);
  saveStoredTickets(updatedTickets);

  return { resources: updatedResources, tickets: updatedTickets };
};

// Reset toàn bộ về dữ liệu ban đầu
export const resetToInitialData = () => {
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(INITIAL_RESOURCES));
  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(INITIAL_TICKETS));
  return {
    resources: INITIAL_RESOURCES,
    tickets: INITIAL_TICKETS
  };
};

// Xuất file CSV tiếng Việt chuẩn UTF-8 kèm BOM
export const exportDataToCsv = (filename, data, headers) => {
  const csvRows = [];
  
  // Header row
  csvRows.push(headers.map(h => `"${h.label}"`).join(','));

  // Data rows
  data.forEach(item => {
    const row = headers.map(h => {
      let val = item[h.key];
      if (val === null || val === undefined) val = '';
      val = String(val).replace(/"/g, '""');
      return `"${val}"`;
    });
    csvRows.push(row.join(','));
  });

  const csvString = '\uFEFF' + csvRows.join('\r\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
