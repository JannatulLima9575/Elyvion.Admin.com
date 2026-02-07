import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Header
    language: 'Language',
    english: 'English',
    chinese: '中文',
    
    // Sidebar Menu
    dashboard: 'Dashboard',
    customerManagement: 'Customer Management',
    taskManagement: 'Task Management',
    withdrawalManagement: 'Withdrawal Management',
    userManagement: 'User Management',
    masterDataManagement: 'Master Data Management',
    vipLevelManagement: 'VIP Level Management',
    
    // Dashboard Cards
    deposit: 'Deposit',
    approvedWithdrawal: 'Approved Withdrawal',
    pendingWithdrawal: 'Pending Withdrawal',
    rejectedWithdrawal: 'Rejected Withdrawal',
    customer: 'Customer',
    today: 'Today',
    yesterday: 'Yesterday',
    total: 'Total',
    
    // Common
    filter: 'Filter',
    createdDate: 'Created Date',
    loginUserName: 'Login User Name',
    code: 'Code',
    status: 'Status',
    setting: 'Setting',
    actions: 'Actions',
    approve: 'Approve',
    reject: 'Reject',
    edit: 'Edit',
    create: 'Create',
    createCustomer: 'Create Customer',
    createProduct: 'Create Product',
    
    // Customer Management
    ipAddress: 'IP Address',
    phoneNumber: 'Phone Number',
    customerStatus: 'Customer Status',
    onlineOffline: 'Online/Offline',
    all: 'All',
    pleaseSelectStatus: 'Please select status...',
    details: 'Details',
    accountManagement: 'Account Management',
    bankAccountDetails: 'Bank Account Details',
    ip: 'IP',
    taskPlan: 'Task Plan',
    actualAccount: 'Actual Account',
    allowToStartTask: 'Allow To Start Task',
    allowToCompleteTask: 'Allow To Complete Task',
    notAllowedToWithdrawWithoutTask: 'Not Allowed To Withdraw Without Task',
    allowToWithdraw: 'Allow To Withdraw',
    notAllowedToWithdrawWhenPresetTask: 'Not Allowed To Withdraw When Preset Task',
    allowToUseReferralCode: 'Allow To Use Referral Code',
    notAllowedToWithdrawUnconditionally: 'Not Allowed To Withdraw Unconditionally',
    task: 'Task',
    comboTask: 'Combo Task',
    level: 'Level',
    editBalance: 'Edit Balance',
    resetTask: 'Reset Task',
    resetRecord: 'Reset Record',
    editProfile: 'Edit Profile',
    comboTaskHistory: 'Combo Task History',
    transactionHistory: 'Transaction History',
    deactivate: 'Deactivate',
    activate: 'Activate',
    
    // Task Management
    productName: 'Product Name',
    productPrice: 'Product Price',
    productImage: 'Product Image',
    productCode: 'Product Code',
    
    // Withdrawal Management
    date: 'Date',
    admin: 'Admin',
    bankDetails: 'Bank Details',
    actualAmount: 'Actual Amount',
    updatedBy: 'Updated By',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    withdrawalAmount: 'Withdrawal Amount',
    bankName: 'Bank Name',
    bankAccountHolder: 'Bank Account Holder',
    iban: 'IBAN',
    walletBalance: 'Wallet Balance',
    recommend: 'Recommend',
    
    // User Management
    adminName: 'Admin Name',
    whatsappUrl: 'Whatsapp Url',
    telegramUrl: 'Telegram Url',
    telegramUrl2: 'Telegram Url 2',
    telegramUrl3: 'Telegram Url 3',
    
    // VIP Level Management
    vipLevel: 'VIP Level',
    taskSettings: 'Task',
    withdrawalLimitation: 'Withdrawal Limitation',
    minAmount: 'Min Amount',
    taskCount: 'Task Count',
    taskSet: 'Task Set',
    commissionPercentage: 'Comission Percentage',
    comboCommissionPercentage: 'Combo Comission Percentage',
    productRange: 'Product Range',
    minWithdrawalAmount: 'Min Withdrawal Amount',
    maxWithdrawalAmount: 'Max Withdrawal Amount',
    completedTaskDayToWithdraw: 'Completed Task/Day To Withdraw',
    withdrawalFees: 'Withdrawl Fees',
    
    // Table
    rowsPerPage: 'Rows per page',
    of: 'of',
  },
  zh: {
    // Header
    language: '语言',
    english: 'English',
    chinese: '中文',
    
    // Sidebar Menu
    dashboard: '仪表板',
    customerManagement: '客户管理',
    taskManagement: '任务管理',
    withdrawalManagement: '提款管理',
    userManagement: '用户管理',
    masterDataManagement: '主数据管理',
    vipLevelManagement: 'VIP等级管理',
    
    // Dashboard Cards
    deposit: '存款',
    approvedWithdrawal: '已批准提款',
    pendingWithdrawal: '待处理提款',
    rejectedWithdrawal: '已拒绝提款',
    customer: '客户',
    today: '今天',
    yesterday: '昨天',
    total: '总计',
    
    // Common
    filter: '筛选',
    createdDate: '创建日期',
    loginUserName: '登录用户名',
    code: '代码',
    status: '状态',
    setting: '设置',
    actions: '操作',
    approve: '批准',
    reject: '拒绝',
    edit: '编辑',
    create: '创建',
    createCustomer: '创建客户',
    createProduct: '创建产品',
    
    // Customer Management
    ipAddress: 'IP地址',
    phoneNumber: '电话号码',
    customerStatus: '客户状态',
    onlineOffline: '在线/离线',
    all: '全部',
    pleaseSelectStatus: '请选择状态...',
    details: '详情',
    accountManagement: '账户管理',
    bankAccountDetails: '银行账户详情',
    ip: 'IP',
    taskPlan: '任务计划',
    actualAccount: '实际账户',
    allowToStartTask: '允许开始任务',
    allowToCompleteTask: '允许完成任务',
    notAllowedToWithdrawWithoutTask: '不允许无任务提款',
    allowToWithdraw: '允许提款',
    notAllowedToWithdrawWhenPresetTask: '预设任务时不允许提款',
    allowToUseReferralCode: '允许使用推荐码',
    notAllowedToWithdrawUnconditionally: '不允许无条件提款',
    task: '任务',
    comboTask: '组合任务',
    level: '等级',
    editBalance: '编辑余额',
    resetTask: '重置任务',
    resetRecord: '重置记录',
    editProfile: '编辑资料',
    comboTaskHistory: '组合任务历史',
    transactionHistory: '交易历史',
    deactivate: '停用',
    activate: '激活',
    
    // Task Management
    productName: '产品名称',
    productPrice: '产品价格',
    productImage: '产品图片',
    productCode: '产品代码',
    
    // Withdrawal Management
    date: '日期',
    admin: '管理员',
    bankDetails: '银行详情',
    actualAmount: '实际金额',
    updatedBy: '更新者',
    pending: '待处理',
    approved: '已批准',
    rejected: '已拒绝',
    withdrawalAmount: '提款金额',
    bankName: '银行名称',
    bankAccountHolder: '银行账户持有人',
    iban: 'IBAN',
    walletBalance: '钱包余额',
    recommend: '推荐',
    
    // User Management
    adminName: '管理员名称',
    whatsappUrl: 'WhatsApp链接',
    telegramUrl: 'Telegram链接',
    telegramUrl2: 'Telegram链接 2',
    telegramUrl3: 'Telegram链接 3',
    
    // VIP Level Management
    vipLevel: 'VIP等级',
    taskSettings: '任务',
    withdrawalLimitation: '提款限制',
    minAmount: '最低金额',
    taskCount: '任务数量',
    taskSet: '任务组',
    commissionPercentage: '佣金百分比',
    comboCommissionPercentage: '组合佣金百分比',
    productRange: '产品范围',
    minWithdrawalAmount: '最低提款金额',
    maxWithdrawalAmount: '最高提款金额',
    completedTaskDayToWithdraw: '完成任务/天数提款',
    withdrawalFees: '提款费用',
    
    // Table
    rowsPerPage: '每页行数',
    of: '/',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('admin-language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('admin-language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

