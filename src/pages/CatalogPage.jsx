import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import { RESOURCE_GROUPS, RESOURCE_TYPES } from '../data/initialData';

export default function CatalogPage({ 
  resources, 
  onBorrow, 
  onDetail,
  onQuickTicketSearch 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Tất cả nhóm');
  const [selectedType, setSelectedType] = useState('Tất cả loại');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [sortBy, setSortBy] = useState('default'); // 'default', 'most-borrowed', 'name'

  // Filtered resources
  const filteredResources = useMemo(() => {
    return resources.filter(item => {
      // Group filter
      if (selectedGroup !== 'Tất cả nhóm' && item.group !== selectedGroup) {
        return false;
      }
      // Type filter
      if (selectedType !== 'Tất cả loại' && item.category !== selectedType) {
        return false;
      }
      // Availability filter
      if (onlyAvailable && item.availableQty <= 0) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchCode = item.code.toLowerCase().includes(query);
        const matchLocation = item.location.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        if (!matchTitle && !matchCode && !matchLocation && !matchCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'most-borrowed') {
        return (b.borrowCount || 0) - (a.borrowCount || 0);
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title, 'vi');
      }
      return 0;
    });
  }, [resources, selectedGroup, selectedType, onlyAvailable, searchTerm, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedGroup('Tất cả nhóm');
    setSelectedType('Tất cả loại');
    setOnlyAvailable(false);
    setSortBy('default');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-teal-700 to-sky-800 text-white p-6 sm:p-10 shadow-xl shadow-teal-500/10">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-xs font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Cổng Thông Tin Thư Viện & Thiết Bị Trường Học
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Kết nối sách với bạn đọc, đưa thư viện đến gần hơn với học sinh
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
            Tra cứu nhanh kho sách, thiết bị STEM, đồ dùng dạy học trực quan và máy móc công nghệ thông tin. Đăng ký mượn trực tuyến nhanh gọn, thuận tiện cho thầy cô và các em học sinh.
          </p>

          {/* Quick Search inside Hero */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập tên sách, thiết bị (ví dụ: STEM, Robot, KHTN, Lịch sử...)"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-slate-900 text-sm shadow-md placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-md"
                >
                  Xóa
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('catalog-results');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 text-sm font-bold shadow-md shadow-amber-400/20 transition-all text-center"
            >
              Khám phá kho sách
            </button>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <BookOpen className="w-96 h-96 -mr-20 -mt-10" />
        </div>
      </section>

      {/* Filter and Controls Toolbar */}
      <section id="catalog-results" className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
        
        {/* Row 1: Groups Tab Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {RESOURCE_GROUPS.map(group => {
              const isActive = selectedGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/20'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-650'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>

          {/* View toggle (Grid / Table) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
              title="Xem dạng lưới thẻ"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table' 
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
              title="Xem dạng bảng chi tiết"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Secondary Filters & Sorts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          
          {/* Category Dropdown */}
          <div>
            <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1">
              Phân loại chuyên mục
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            >
              {RESOURCE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label className="block text-slate-700 dark:text-slate-400 font-medium mb-1">
              Sắp xếp theo
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            >
              <option value="default">Mặc định (Mới nhất)</option>
              <option value="most-borrowed">Mượn nhiều nhất</option>
              <option value="name">Tên A-Z</option>
            </select>
          </div>

          {/* Available Checkbox */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 w-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Chỉ hiện tài nguyên còn sẵn
              </span>
            </label>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Đặt lại bộ lọc
            </button>
          </div>

        </div>

        {/* Status Counter */}
        <div className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-400 pt-1">
          <span>
            Tìm thấy: <strong className="text-teal-600 dark:text-teal-400 font-bold">{filteredResources.length}</strong> kết quả phù hợp
          </span>
          {(searchTerm || selectedGroup !== 'Tất cả nhóm' || selectedType !== 'Tất cả loại' || onlyAvailable) && (
            <span className="italic text-[11px] text-amber-600 dark:text-amber-400">
              * Đang áp dụng bộ lọc tùy chỉnh
            </span>
          )}
        </div>

      </section>

      {/* Results View: Grid Mode */}
      {viewMode === 'grid' && (
        <>
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredResources.map(resource => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onBorrow={onBorrow}
                  onDetail={onDetail}
                />
              ))}
            </div>
          ) : (
            <EmptyState onReset={handleResetFilters} />
          )}
        </>
      )}

      {/* Results View: Table Mode (matching the website table view) */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-750 text-slate-800 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4 w-24">Mã tài nguyên</th>
                  <th className="py-3 px-4 min-w-[220px]">Tên sách / Thiết bị</th>
                  <th className="py-3 px-3">Nhóm</th>
                  <th className="py-3 px-3">Phân loại</th>
                  <th className="py-3 px-4">Vị trí lưu kho</th>
                  <th className="py-3 px-3 text-center">Tồn kho</th>
                  <th className="py-3 px-3 text-center">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-200">
                {filteredResources.map(resource => {
                  const isAvailable = resource.availableQty > 0;
                  return (
                    <tr key={resource.id} className="hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-teal-600 dark:text-teal-400">
                        {resource.code}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={resource.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-600"
                          />
                          <div>
                            <span 
                              onClick={() => onDetail(resource)}
                              className="font-bold hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer block"
                            >
                              {resource.title}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {resource.author || 'NXB Giáo dục'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-700">
                          {resource.group}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-400">
                        {resource.category}
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-400 font-medium">
                        {resource.location}
                      </td>
                      <td className="py-3 px-3 text-center font-bold">
                        {resource.availableQty} / {resource.totalQty} {resource.unit}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          isAvailable 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {isAvailable ? 'Còn để mượn' : 'Đang hết'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onDetail(resource)}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-[11px] font-semibold text-slate-800 dark:text-slate-300"
                          >
                            Xem
                          </button>
                          <button
                            type="button"
                            disabled={!isAvailable}
                            onClick={() => onBorrow(resource)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                              isAvailable
                                ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            Mượn
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700 space-y-4">
      <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-slate-700 text-teal-500 flex items-center justify-center mx-auto">
        <Search className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Không tìm thấy tài nguyên phù hợp
        </h3>
        <p className="text-xs text-slate-700 dark:text-slate-400 max-w-md mx-auto">
          Không có sách hoặc thiết bị nào khớp với từ khóa hoặc bộ lọc đã chọn. Hãy thử tìm kiếm với từ khóa khác hoặc đặt lại bộ lọc.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-colors"
      >
        Đặt lại bộ lọc tìm kiếm
      </button>
    </div>
  );
}
