import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './Header'; // Assuming this is your custom Header component
//import LeftSider from './LeftSider'; // Left sidebar component
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

const { Content } = Layout;
function App() {
  return (
    <Router>
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          {/* Header */}
          <Header style={{ background: '#fff', padding: 0 }} />

          {/* Main Layout with Sidebar and Content */}
          <Layout>
            {/* Left Sidebar */}
            
              {/* <LeftSider /> */}
            
            {/* Main Content Area with Routes */}
            <Content style={{ padding: '15', background: '#fff' }}>
  <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/MainContent" element={<MainContent />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/billed_members" element={<BilledMembers />} />
    <Route path="/unbilled_members" element={<UnBilled_Members />} />
    <Route path="/bench_members" element={<Bench_Members />} />
    <Route path="/unbenched_members" element={<UnBenched_Members />} />
    <Route path="/shadow_resources" element={<Shadow_Resources />} />
    <Route path="/partially_billable" element={<Partially_Billable />} />
    <Route path="/project_buffer_members" element={<Project_Buffer_Members />} />
    <Route path="/profile" element={<Profile />} />   
  </Routes>
</Content>


            {/* Right Sidebar */}

          </Layout>

          {/* Footer */}
          <AppFooter />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
