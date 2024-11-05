import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './Header'; // Assuming this is your custom Header component
import MainContent from './MainContent'; // Main content component
import AppFooter from './Footer'; // Footer component
import BilledMembers from './Categoricals/BilledMembers';
import UnBilled_Members from './Categoricals/UnBilled_Members';
import Bench_Members from './Categoricals/Bench_Members';
import UnBenched_Members from './Categoricals/UnBenched_Members';
import Shadow_Resources from './Categoricals/Shadow_Resources';
import Partially_Billable from './Categoricals/Partially_Billable';
import Project_Buffer_Members from './Categoricals/Project_Buffer_Members';
import Profile from './Profile_sections/Profile';
import Signup from './Signup';
import Login from './Login';
import logo from './image/logo.png'; // Import logo

const { Content } = Layout;

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null; // Check if the user is authenticated
  };

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        
        {/* Render Header only if the path is not "/login" or "/signup" */}
        {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && (
          <Header imageUrl={imageUrl} style={{ background: '#fff', padding: 0 }} />
        )}

        {/* Main Layout with Sidebar and Content */}
        <Layout>
          <Content style={{ padding: '15', background: '#fff' }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* Protected Routes */}
              <Route path="/MainContent" element={isAuthenticated() ? <MainContent /> : <Navigate to="/login" />} />
              <Route path="/billed_members" element={isAuthenticated() ? <BilledMembers /> : <Navigate to="/login" />} />
              <Route path="/unbilled_members" element={isAuthenticated() ? <UnBilled_Members /> : <Navigate to="/login" />} />
              <Route path="/bench_members" element={isAuthenticated() ? <Bench_Members /> : <Navigate to="/login" />} />
              <Route path="/unbenched_members" element={isAuthenticated() ? <UnBenched_Members /> : <Navigate to="/login" />} />
              <Route path="/shadow_resources" element={isAuthenticated() ? <Shadow_Resources /> : <Navigate to="/login" />} />
              <Route path="/partially_billable" element={isAuthenticated() ? <Partially_Billable /> : <Navigate to="/login" />} />
              <Route path="/project_buffer_members" element={isAuthenticated() ? <Project_Buffer_Members /> : <Navigate to="/login" />} />
              <Route path="/profile" element={isAuthenticated() ? <Profile profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} /> : <Navigate to="/login" />} />
            </Routes>
          </Content>
        </Layout>

        {/* Footer */}
        <AppFooter />
      </Layout>
    </div>
  );
}

export default App;
