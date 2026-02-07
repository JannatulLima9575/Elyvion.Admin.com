import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { withdrawalService } from '../services/withdrawalService';
import { dashboardService } from '../services/dashboardService';
import { customerService } from '../services/customerService';

const StatCard = ({ title, todayValue, yesterdayValue, totalValue, bgColor }) => {
  const { t } = useLanguage();
  
  return (
    <div className={`${bgColor} rounded-xl p-6 text-white shadow-lg`}>
      <h3 className="text-xl font-semibold text-center mb-6">{title}</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('today')}</span>
          <span className="text-2xl font-bold">{todayValue}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('yesterday')}</span>
          <span className="text-2xl font-bold">{yesterdayValue}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('total')}</span>
          <span className="text-2xl font-bold">{totalValue}</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: t('deposit'), todayValue: 0, yesterdayValue: 0, totalValue: 0, bgColor: 'bg-[#7c3aed]' },
    { title: t('approvedWithdrawal'), todayValue: 0, yesterdayValue: 0, totalValue: 0, bgColor: 'bg-[#6366f1]' },
    { title: t('pendingWithdrawal'), todayValue: 0, yesterdayValue: 0, totalValue: 0, bgColor: 'bg-[#ec4899]' },
    { title: t('rejectedWithdrawal'), todayValue: 0, yesterdayValue: 0, totalValue: 0, bgColor: 'bg-[#6366f1]' },
    { title: t('customer'), todayValue: 0, yesterdayValue: 0, totalValue: 0, bgColor: 'bg-[#f97316]' }
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const formatDate = (date) => date.toISOString().split('T')[0];
        const todayStr = formatDate(today);
        const yesterdayStr = formatDate(yesterday);

        // Fetch all data in parallel
        const [withdrawalsRes, depositsRes, customersRes] = await Promise.all([
          withdrawalService.getWithdrawals({ startDate: yesterdayStr, endDate: todayStr }),
          dashboardService.getDepositRecords({ startDate: yesterdayStr, endDate: todayStr }),
          customerService.getCustomers({ startDate: yesterdayStr, endDate: todayStr })
        ]);

        const withdrawals = withdrawalsRes?.data || withdrawalsRes || [];
        const deposits = depositsRes?.data || depositsRes || [];
        const customers = customersRes?.data || customersRes || [];

        // Calculate stats
        const todayDeposits = deposits.filter(d => d.createdDate?.startsWith(todayStr));
        const yesterdayDeposits = deposits.filter(d => d.createdDate?.startsWith(yesterdayStr));
        const totalDeposits = deposits.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
        
        const pendingWithdrawals = withdrawals.filter(w => w.statusID === 1);
        const approvedWithdrawals = withdrawals.filter(w => w.statusID === 2);
        const rejectedWithdrawals = withdrawals.filter(w => w.statusID === 3);
        
        const getTodayCount = (arr) => arr.filter(w => w.createdDate?.startsWith(todayStr)).length;
        const getYesterdayTotal = (arr) => arr.filter(w => w.createdDate?.startsWith(yesterdayStr))
          .reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0);
        const getTotal = (arr) => arr.reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0);

        const todayCustomers = customers.filter(c => c.createdDate?.startsWith(todayStr));
        const yesterdayCustomers = customers.filter(c => c.createdDate?.startsWith(yesterdayStr));

        setStats([
          {
            title: t('deposit'),
            todayValue: todayDeposits.length,
            yesterdayValue: yesterdayDeposits.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0).toFixed(0),
            totalValue: totalDeposits.toFixed(2),
            bgColor: 'bg-[#7c3aed]'
          },
          {
            title: t('approvedWithdrawal'),
            todayValue: getTodayCount(approvedWithdrawals),
            yesterdayValue: getYesterdayTotal(approvedWithdrawals).toFixed(2),
            totalValue: getTotal(approvedWithdrawals).toFixed(2),
            bgColor: 'bg-[#6366f1]'
          },
          {
            title: t('pendingWithdrawal'),
            todayValue: getTodayCount(pendingWithdrawals),
            yesterdayValue: getYesterdayTotal(pendingWithdrawals).toFixed(2),
            totalValue: getTotal(pendingWithdrawals).toFixed(2),
            bgColor: 'bg-[#ec4899]'
          },
          {
            title: t('rejectedWithdrawal'),
            todayValue: getTodayCount(rejectedWithdrawals),
            yesterdayValue: getYesterdayTotal(rejectedWithdrawals).toFixed(2),
            totalValue: getTotal(rejectedWithdrawals).toFixed(2),
            bgColor: 'bg-[#6366f1]'
          },
          {
            title: t('customer'),
            todayValue: todayCustomers.length,
            yesterdayValue: yesterdayCustomers.length,
            totalValue: customers[0]?.totalRowsCount || customers.length || 0,
            bgColor: 'bg-[#f97316]'
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [t]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {stats.slice(0, 2).map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
      {stats.slice(2, 4).map((stat, index) => (
        <StatCard key={index + 2} {...stat} />
      ))}
      <div className="sm:col-span-1">
        <StatCard {...stats[4]} />
      </div>
    </div>
  );
};

export default Dashboard;

