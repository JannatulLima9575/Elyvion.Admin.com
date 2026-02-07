import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { taskService } from '../services/taskService';
import CreateTaskModal from '../components/CreateTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import { Trash2, Edit } from 'lucide-react';

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
      fetchTasks(); // Refresh list
    } catch (error) {
      console.error('Error deleting task:', error);
      alert(error.message || 'Failed to delete task');
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header with Create Button */}
      <div className="flex justify-end p-4 border-b border-gray-200">
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-2 bg-[#7c3aed] text-white rounded-lg font-medium hover:bg-[#6d28d9] transition-colors">
          {t('createProduct')}
        </button>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          // Refresh tasks list
          fetchTasks();
        }}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        onSuccess={() => {
          fetchTasks();
        }}
        task={selectedTask}
      />

      {/* Filters */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium whitespace-nowrap">{t('productName')} :</label>
            <input
              type="text"
              value={filters.productName}
              onChange={(e) => setFilters({ ...filters, productName: e.target.value })}
              className="w-full sm:w-48 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium whitespace-nowrap">{t('productPrice')} :</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.priceFrom}
                onChange={(e) => setFilters({ ...filters, priceFrom: e.target.value })}
                className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              />
              <span>-</span>
              <input
                type="number"
                value={filters.priceTo}
                onChange={(e) => setFilters({ ...filters, priceTo: e.target.value })}
                className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleFilter}
            disabled={loading}
            className="w-full sm:w-auto px-8 md:px-16 py-2 bg-[#7c3aed] text-white rounded-lg font-medium hover:bg-[#6d28d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? t('loading') || 'Loading...' : t('filter')}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading && tasks.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('productImage')}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('productName')}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('productPrice')}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('productCode')}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{task.id}</td>
                <td className="px-6 py-4">
                  <img 
                    src={task.imageUrl} 
                    alt={task.name}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64?text=IMG';
                    }}
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{task.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{task.taskValue}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{task.code}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setSelectedTask(task);
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white rounded transition-colors"
                      title={t('edit') || 'Edit'}
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
                      title={t('delete') || 'Delete'}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;

