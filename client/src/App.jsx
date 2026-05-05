import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Vacancies from './pages/Vacancies';
import Notices from './pages/Notices';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import AdminDashboard from './admin/Dashboard';
import ManageVacancies from './admin/ManageVacancies';
import ManageNotices from './admin/ManageNotices';
import ManageGallery from './admin/ManageGallery';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route 
              path="/admin/*" 
              element={
                <PrivateRoute>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/vacancies" element={<ManageVacancies />} />
                    <Route path="/notices" element={<ManageNotices />} />
                    <Route path="/gallery" element={<ManageGallery />} />
                  </Routes>
                </PrivateRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
