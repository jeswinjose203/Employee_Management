import React,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
              <Route path="/MainContent" element={<MainContent />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/billed_members" element={<BilledMembers />} />
              <Route path="/unbilled_members" element={<UnBilled_Members />} />
              <Route path="/bench_members" element={<Bench_Members />} />
              <Route path="/unbenched_members" element={<UnBenched_Members />} />
              <Route path="/shadow_resources" element={<Shadow_Resources />} />
              <Route path="/partially_billable" element={<Partially_Billable />} />
              <Route path="/project_buffer_members" element={<Project_Buffer_Members />} />
              <Route path="/profile" element={<Profile profilePhoto='profilePhoto' setProfilePhoto={setProfilePhoto}  />} />
              {/* profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} */}
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
