import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CustomerManagement from './pages/CustomerManagement';
import TaskManagement from './pages/TaskManagement';
import WithdrawalManagement from './pages/WithdrawalManagement';
import UserManagement from './pages/UserManagement';
import MasterDataManagement from './pages/MasterDataManagement';
import VIPLevelManagement from './pages/VIPLevelManagement';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/customers" element={<CustomerManagement />} />
                      <Route path="/tasks" element={<TaskManagement />} />
                      <Route path="/withdrawals" element={<WithdrawalManagement />} />
                      <Route path="/users" element={<UserManagement />} />
                      <Route path="/master-data" element={<MasterDataManagement />} />
                      <Route path="/vip-levels" element={<VIPLevelManagement />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
