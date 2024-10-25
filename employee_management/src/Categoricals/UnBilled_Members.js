import React, { useState, useEffect } from 'react';
import { Button, Input, Select, List, Typography, Modal } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import skillsData from '../static/skills.json'; // Adjust the path as needed

const { Option } = Select;
const { Title, Text } = Typography;

// Styled container with padding for consistent spacing
const Container = styled.div`
  padding: 20px; /* Adjust padding as needed */
`;

const BilledMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Fetch employee data from API on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5001/employee/unbilledmembers');
        console.log('Employee data:', response.data); // Log the response data
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Locations to filter
  const locations = ["Cochin", "TVM", "Chennai"];

  // Filter members based on the search term, selected skills, and selected location
  const filteredMembers = employees.filter((member) => {
    const memberName = member.empName || ''; // Use empName
    const matchesSearch = memberName.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if skills are defined and match the selected skills
    const matchesSkill = selectedSkills.length
      ? selectedSkills.every(skill => member.skills && member.skills.includes(skill)) // Ensure skills is defined
      : true;

    const matchesLocation = selectedLocation ? member.location === selectedLocation : true; // Use location

    return matchesSearch && matchesSkill && matchesLocation;
  });

  console.log('Filtered Members:', filteredMembers); // Log filtered members

  const showMemberDetails = (member) => {
    console.log('Selected Member:', member); // Log selected member
    setSelectedMember(member);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedMember(null);
  };

  return (
    <Container>
      <Button type="primary" onClick={handleGoBack}>
        Go Back
      </Button>
      <Title level={1}>UnBilled Members</Title>
      <Text>This is the Billed Members component.</Text>

      <Input
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px 0', width: '100%' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
        <Select
          mode="multiple"
          placeholder="Filter by skills..."
          value={selectedSkills}
          onChange={(value) => setSelectedSkills(value)}
          style={{ width: '200px' }}
        >
          <Option value="">All Skills</Option>
          {skillsData.skills.map(skill => (
            <Option key={skill} value={skill}>
              {skill}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by location..."
          value={selectedLocation}
          onChange={(value) => setSelectedLocation(value)}
          style={{ width: '200px' }}
        >
          <Option value="">All Locations</Option>
          {locations.map(location => (
            <Option key={location} value={location}>
              {location}
            </Option>
          ))}
        </Select>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={filteredMembers}
        renderItem={(member) => (
          <List.Item key={member.empCode} onClick={() => showMemberDetails(member)} style={{ cursor: 'pointer' }}>
            <List.Item.Meta
              title={member.empName || 'Unknown Name'} // Use empName
              description={`Skills: ${member.skills || 'N/A'} | Location: ${member.location || 'N/A'}`} // Adjust skills
            />
          </List.Item>
        )}
      />

      {selectedMember && (
        <Modal
          title={selectedMember.empName} // Use empName
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          <p><strong>Name:</strong> {selectedMember.empName}</p> {/* Use empName */}
          <p><strong>Location:</strong> {selectedMember.location}</p> {/* Use location */}
          <p><strong>Skills:</strong> {selectedMember.skills || 'N/A'}</p> {/* Use skills */}
          <p><strong>Email:</strong> {selectedMember.email}</p> {/* Display email */}
          <p><strong>Position:</strong> {selectedMember.position}</p> {/* Display position */}
          <p><strong>Status:</strong> {selectedMember.memberStatus}</p> {/* Display member status */}
          <p><strong>Project Description:</strong> {selectedMember.projectDesc}</p> {/* Display project description */}
        </Modal>
      )}
    </Container>
  );
};

export default BilledMembers;
