import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  FileSpreadsheet, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  X, 
  Search, 
  Layers, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import { exportDataToCsv } from '../data/mockStorage';
import { RESOURCE_GROUPS, RESOURCE_TYPES } from '../data/initialData';

export default function AdminManagerPage({ 
  resources, 
  setResources, 
  tickets, 
  setTickets, 
  onResetData, 
  showToast 
}) {
  const [adminSearch, setAdminSearch] = useState('');
  const [editModalItem, setEditModalItem] = useState(null); // null or resource object
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    group: 'Thiết bị',
    category: 'Thiết bị STEM và thí nghiệm',
    unit: 'Bộ',
    totalQty: 10,
    availableQty: 10,
    location: '',
    author: '',
    publishYear: new Date().getFullYear(),
    description: '',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80'
  });

  const filtered = resources.filter(r => {
    if (!adminSearch.trim()) return true;
    const q = adminSearch.toLowerCase();
    return r.title.toLowerCase().includes(q) || r.code.toLowerCase().includes(q) || r.location.toLowerCase().includes(q);
  });

  const handleOpenAdd = () => {
    setFormData({
      code: `TB${Math.floor(100 + Math.random() * 900)}`,
      title: '',
      group: 'Thiết bị',
      category: 'Thiết bị STEM và thí nghiệm',
      unit: 'Bộ',
      totalQty: 5,
      availableQty: 5,
      location: 'Phòng thiết bị - Tủ A1',
      author: 'Nhà sản xuất Giáo dục',
      publishYear: 2025,
      description: '',
      image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=600&q=80'
    });
    setIsAddingNew(true);
    setEditModalItem(null);
  };

  const handleOpenEdit = (res) => {
    setFormData({ ...res });
    setEditModalItem(res);
    setIsAddingNew(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Vui lòng nhập tên tài nguyên!');
      return;
    }

    if (isAddingNew) {
      const newItem = {
        ...formData,
        id: formData.code.trim() || `RES_${Date.now()}`,
        borrowCount: 0,
        status: Number(formData.availableQty) > 0 ? 'Còn để mượn' : 'Đang mượn hết'
      };
      setResources(prev => [newItem, ...prev]);
      showToast('Đã thêm mới tài nguyên vào kho thành công!', 'success');
    } else {
      setResources(prev => prev.map(r => r.id === editModalItem.id ? { ...formData } : r));
      showToast('Cập nhật thông tin tài nguyên thành công!', 'success');
    }

    setIsAddingNew(false);
    setEditModalItem(null);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài nguyên "${title}" khỏi hệ thống không?`)) {
      setResources(prev => prev.filter(r => r.id !== id));
      showToast(`Đã xóa tài nguyên "${title}"!`, 'info');
    }
  };

  const handleExportResourcesCsv = () => {
    const headers = [
      { key: 'code', label: 'Mã tài nguyên' },
      { key: 'title', label: 'Tên sách / Thiết bị' },
      { key: 'group', label: 'Nhóm' },
      { key: 'category', label: 'Phân loại' },
      { key: 'unit', label: 'Đơn vị tính' },
      { key: 'totalQty', label: 'Tổng số lượng' },
      { key: 'availableQty', label: 'Còn sẵn' },
      { key: 'location', label: 'Vị trí lưu kho' },
      { key: 'author', label: 'Tác giả / Nhà SX' },
      { key: 'publishYear', label: 'Năm SX/XB' },
      { key: 'borrowCount', label: 'Lượt đã mượn' }
    ];
    exportDataToCsv('DanhMuc_Kho_ThietBi_Sach_ThuVien', resources, headers);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-500" />
            Cổng Quản Trị Kho Thiết Bị & Sách Thư Viện
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dành cho Thủ thư và Cán bộ phụ trách: Kiểm kê, thêm mới, sửa đổi và bảo toàn dữ liệu.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Thêm sách / Thiết bị mới
          </button>
          
          <button
            type="button"
            onClick={handleExportResourcesCsv}
            className="py-2 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Xuất Excel kho
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Khôi phục toàn bộ kho sách và phiếu mượn về dữ liệu ban đầu từ THPT Hoàng Diệu?')) {
                onResetData();
              }
            }}
            className="py-2 px-3.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset dữ liệu mẫu
          </button>
        </div>
      </div>

      {/* Search Input for Admin */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            placeholder="Tìm kiếm nhanh mã tài nguyên, tên, vị trí kho..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="text-xs text-slate-500 whitespace-nowrap">
          Tổng số: <strong className="text-teal-600 dark:text-teal-400">{filtered.length}</strong> đầu mục
        </div>
      </div>

      {/* Admin Resources Management Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4 w-24">Mã</th>
                <th className="py-3 px-4">Tên tài nguyên</th>
                <th className="py-3 px-3">Nhóm / Loại</th>
                <th className="py-3 px-4">Vị trí tủ/kệ</th>
                <th className="py-3 px-3 text-center">Tổng số</th>
                <th className="py-3 px-3 text-center">Còn lại</th>
                <th className="py-3 px-3 text-center">Đã mượn</th>
                <th className="py-3 px-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-200">
              {filtered.map(res => (
                <tr key={res.id} className="hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-600 dark:text-teal-400">
                    {res.code}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <img src={res.image} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                      <span className="line-clamp-1">{res.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-700">
                      {res.group}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{res.category}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {res.location}
                  </td>
                  <td className="py-3 px-3 text-center font-bold">
                    {res.totalQty} {res.unit}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                    {res.availableQty} {res.unit}
                  </td>
                  <td className="py-3 px-3 text-center text-teal-600 font-semibold">
                    {res.borrowCount || 0}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(res)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-teal-600"
                        title="Chỉnh sửa thông tin"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(res.id, res.title)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600"
                        title="Xóa tài nguyên"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Resource */}
      {(isAddingNew || editModalItem) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm">
                {isAddingNew ? 'Thêm mới Sách / Thiết bị vào Kho' : `Cập nhật thông tin: ${formData.code}`}
              </h3>
              <button 
                type="button"
                onClick={() => { setIsAddingNew(false); setEditModalItem(null); }}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Mã tài nguyên *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1">Tên sách / Thiết bị *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Nhóm tài nguyên</label>
                  <select
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                  >
                    <option value="Thiết bị">Thiết bị</option>
                    <option value="Sách thư viện">Sách thư viện</option>
                    <option value="Tài liệu tham khảo">Tài liệu tham khảo</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phân loại chuyên mục</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                  >
                    {RESOURCE_TYPES.filter(t => t !== 'Tất cả loại').map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Đơn vị tính</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Tổng số lượng</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalQty}
                    onChange={(e) => setFormData({ ...formData, totalQty: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Số lượng còn sẵn</label>
                  <input
                    type="number"
                    min="0"
                    max={formData.totalQty}
                    value={formData.availableQty}
                    onChange={(e) => setFormData({ ...formData, availableQty: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Vị trí lưu kho (Tủ/Kệ)</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="VD: Phòng thí nghiệm - Tủ F2"
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Đường dẫn hình ảnh (URL)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Mô tả chi tiết & Hướng dẫn</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => { setIsAddingNew(false); setEditModalItem(null); }}
                  className="py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-600 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold"
                >
                  Lưu vào hệ thống
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
