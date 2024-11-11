import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import store from './app/store';
import Nav from "./components/login_components/Navigation/Nav";
import LoginPage from "./components/login_components/LoginPage";
import RegisterPage from "./components/login_components/RegisterPage";
import ResetPasswordPage from "./components/login_components/ResetPasswordPage";
import ResetPasswordConfirm from "./components/login_components/ResetPasswordConfirm";
import ActivatePage from "./components/login_components/ActivatePage";
import NotFoundPage from "./components/login_components/PageNotFound";

// Admin Components
import AdminSidebar from './main_components/admin/components/AdminSidebar';
import AdminTopbar from './main_components/admin/components/AdminTopbar';
import AdminDashboard from "./main_components/admin/pages/dashboard/Dashboard";
import ManageAdminAcc from "./main_components/admin/pages/manage_admin/ManageAdminAcc";
import ManageAgentAcc from "./main_components/admin/pages/manage_agent/ManageAgentAcc";
import ManageBranches from "./main_components/admin/pages/manage_branches/ManageBranches";
import ManageEmployeeAcc from "./main_components/admin/pages/manage_employee/ManageEmployeeAcc";
import BackupRestore from "./main_components/admin/pages/backuprestore/BackupRestore";
import Reports from "./main_components/admin/pages/reports/Reports";
import Contacts from "./main_components/admin/pages/contacts/Contacts";
import Form from "./main_components/admin/pages/form/Form";

// Agent Components
import AgentSidebar from "./main_components/agent/components/AgentSidebar";
import AgentTopbar from "./main_components/agent/components/AgentTopbar";
import AgentDashboard from "./main_components/agent/pages/map/Map";
import ApprovedClient from "./main_components/agent/pages/clientlist/ApprovedClient";
import DeclinedClient from "./main_components/agent/pages/clientlist/DeclinedClient";

// Cashier Components
import CashierSidebar from "./main_components/cashier/components/CashierSidebar";
import CashierTopbar from "./main_components/cashier/components/CashierTopbar";
import CashierDashboard from "./main_components/cashier/pages/paymentapplication/PaymentApplication";
import CashierApprovedClient from "./main_components/cashier/pages/clientlist/ApprovedClient";
import Commision from "./main_components/cashier/pages/commision/Commision";

// Information Officer Components
import InfoSidebar from "./main_components/information_officer/components/InformationOfficerSidebar";
import InfoTopbar from "./main_components/information_officer/components/InformationOfficerTopbar";
import InfoDashboard from "./main_components/information_officer/pages/map/Map";
import AgentList from "./main_components/information_officer/pages/agentlist/AgentList";
import InfoApprovedClient from "./main_components/information_officer/pages/clientlist/ApprovedClient";

const App = () => {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to not authenticated
  const [userRole, setUserRole] = useState("");

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  // Admin-specific layout
  const AdminLayout = () => (
    <div className="app">
      <AdminSidebar />
      <main className="content">
        <AdminTopbar />
        <Routes>
          <Route index element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/manageadminacc" element={<ProtectedRoute><ManageAdminAcc /></ProtectedRoute>} />
          <Route path="/manageagentacc" element={<ProtectedRoute><ManageAgentAcc /></ProtectedRoute>} />
          <Route path="/managebranches" element={<ProtectedRoute><ManageBranches /></ProtectedRoute>} />
          <Route path="/manageemployeeacc" element={<ProtectedRoute><ManageEmployeeAcc /></ProtectedRoute>} />
          <Route path="/backuprestore" element={<ProtectedRoute><BackupRestore /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
          <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );

  // Agent-specific layout
  const AgentLayout = () => (
    <div className="app">
      <AgentSidebar />
      <main className="content">
        <AgentTopbar />
        <Routes>
          <Route index element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} />
          <Route path="/approvedclients" element={<ProtectedRoute><ApprovedClient /></ProtectedRoute>} />
          <Route path="/declinedclients" element={<ProtectedRoute><DeclinedClient /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );

  // Cashier-specific layout
  const CashierLayout = () => (
    <div className="app">
      <CashierSidebar />
      <main className="content">
        <CashierTopbar />
        <Routes>
          <Route index element={<ProtectedRoute><CashierDashboard /></ProtectedRoute>} />
          <Route path="/approvedclients" element={<ProtectedRoute><CashierApprovedClient /></ProtectedRoute>} />
          <Route path="/commision" element={<ProtectedRoute><Commision /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );

  // InformationOfficer-specific layout
  const InformationOfficerLayout = () => (
    <div className="app">
      <InfoSidebar />
      <main className="content">
        <InfoTopbar />
        <Routes>
          <Route index element={<ProtectedRoute><InfoDashboard /></ProtectedRoute>} />
          <Route path="/agentlist" element={<ProtectedRoute><AgentList /></ProtectedRoute>} />
          <Route path="/approvedclients" element={<ProtectedRoute><InfoApprovedClient /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );

  return (
    <Provider store={store}>
      <Router>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Nav />
            <Routes>
              <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
              <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/activate/:uid/:token" element={<ActivatePage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
              <Route
                path="*"
                element={
                  isAuthenticated ? (
                    userRole === "admin" ? <AdminLayout />
                    : userRole === "agent" ? <AgentLayout />
                    : userRole === "cashier" ? <CashierLayout />
                    : userRole === "information_officer" ? <InformationOfficerLayout />
                    : <Navigate to="/login" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Router>
    </Provider>
  );
};

export default App;
