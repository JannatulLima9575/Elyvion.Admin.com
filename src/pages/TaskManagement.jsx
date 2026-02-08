import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { taskService } from '../services/taskService';
import CreateTaskModal from '../components/CreateTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import { Trash2, Edit, Settings } from 'lucide-react'; 

const TaskManagement = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    productName: '',
    priceFrom: 0,
    priceTo: 0
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasklists({ limit: 20 });
      const tasksData = response?.data || response || [];
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    if (!window.confirm(t('confirmDelete') || 'Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

   const handleFilter = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasklists({ limit: 20 });
      let tasksData = response?.data || response || [];
      
      // Apply client-side filters
      if (filters.productName) {
        tasksData = tasksData.filter(t => 
          t.name?.toLowerCase().includes(filters.productName.toLowerCase())
        );
      }
      if (filters.priceFrom) {
        tasksData = tasksData.filter(t => parseFloat(t.taskValue) >= parseFloat(filters.priceFrom));
      }
      if (filters.priceTo) {
        tasksData = tasksData.filter(t => parseFloat(t.taskValue) <= parseFloat(filters.priceTo));
      }
      
      setTasks(tasksData);
    } catch (error) {
      console.error('Error filtering tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-10">
      {/* Header with Create Button */}
      <div className="flex justify-end p-6">
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-[#6d28d9] text-white rounded-md text-sm font-medium hover:bg-[#5b21b6] shadow-sm transition-all">
          {t('createProduct') || 'Create Product'}
        </button>
      </div>

      {/* Filter Section */}
      <div className="w-full mx-auto px-6 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-x-24 gap-y-4 mb-6">
          <div className="flex items-center gap-3">
            <label className="text-gray-700 text-sm">{t('productName') || 'Product Name'} :</label>
            <input
              type="text"
              value={filters.productName}
              onChange={(e) => setFilters({ ...filters, productName: e.target.value })}
              className="w-44 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-gray-700 text-sm">{t('productPrice') || 'Product Price'} :</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.priceFrom}
                onChange={(e) => setFilters({ ...filters, priceFrom: e.target.value })}
                className="w-32 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none shadow-sm"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={filters.priceTo}
                onChange={(e) => setFilters({ ...filters, priceTo: e.target.value })}
                className="w-32 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-3 pb-5">
          <button 
            onClick={handleFilter}
            className="px-16 py-2 bg-[#6d28d9] text-white rounded-md font-medium hover:bg-[#5b21b6] transition-all shadow-md">
            {t('filter') || 'Filter'}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full mx-auto bg-white rounded-sm shadow-sm overflow-hidden border-t border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">{t('productImage')}</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">{t('productName')}</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">{t('productPrice')}</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">{t('productCode')}</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tasks.map((task, index) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 text-sm text-gray-600">{task.id || (index + 1)}</td>
                  <td className="px-6 py-4 text-center">
                    <img 
                      src={task.imageUrl || "/placeholder-logo.png"} 
                      alt={task.name}
                      className="h-10 w-24 object-contain mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium uppercase">{task.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-semibold">{task.taskValue}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">{task.code || 'N/A'}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => {
                        setSelectedTask(task);
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 text-[#6d28d9] hover:bg-purple-50 rounded-full transition-colors">
                      <Settings size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS SECTION --- */}
      {/* Create Modal Render */}
      <CreateTaskModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={fetchTasks} 
      />

      {/* Edit Modal Render (Only when selectedTask is not null) */}
      {selectedTask && (
        <EditTaskModal 
          isOpen={isEditModalOpen} 
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedTask(null);
          }} 
          task={selectedTask} 
          onSuccess={fetchTasks} 
        />
      )}
    </div>
  );
};

export default TaskManagement;