import React, { useState } from 'react';
import { Button, Input, Select, List, Typography, Modal } from 'antd';
import styled from 'styled-components';
import employeedata from '../static/Employee_data.json'; // Employee data JSON
import skillsData from '../static/skills.json'; // Skills data JSON
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Title, Text } = Typography;

// Styled container with padding for consistent spacing
const Container = styled.div`
  padding: 20px; /* Adjust padding as needed */
`;

const BilledMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]); // Array to hold multiple skills
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMember, setSelectedMember] = useState(null); // State to store selected member for modal
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  // Filter members based on the search term, selected skills, and selected location
  const filteredMembers = employeedata.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if member has all selected skills
    const matchesSkill = selectedSkills.length
      ? selectedSkills.every((skill) => member.skills.includes(skill))
      : true;

    const matchesLocation = selectedLocation ? member.location === selectedLocation : true;

    return matchesSearch && matchesSkill && matchesLocation;
  });

  // Show member details in a modal
  const showMemberDetails = (member) => {
    setSelectedMember(member);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedMember(null);
  };

  return (
    <Container>
      {/* Go Back Button */}
      <Button type="primary" onClick={handleGoBack}>
        Go Back
      </Button>
      <Title level={1}>Billed Members</Title>
      <Text>This is the Billed Members component.</Text>

      {/* Search Bar */}
      <Input
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px 0', width: '100%' }}
      />

      {/* Filter Options Container */}
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
        {/* Skill Filter */}
        <Select
          mode="multiple" // Allow multiple skill selection
          placeholder="Filter by skills..."
          value={selectedSkills}
          onChange={(value) => setSelectedSkills(value)} // Handle multiple skill selection
          style={{ width: '200px' }}
        >
          <Option value="">All Skills</Option>
          {skillsData.skills.map((skill) => (
            <Option key={skill} value={skill}>
              {skill}
            </Option>
          ))}
        </Select>

        {/* Location Filter */}
        <Select
          placeholder="Filter by location..."
          value={selectedLocation}
          onChange={(value) => setSelectedLocation(value)}
          style={{ width: '200px' }}
        >
          <Option value="">All Locations</Option>
          <Option value="Kochi">Kochi</Option>
          <Option value="TVM">TVM</Option>
          <Option value="Chennai">Chennai</Option>
        </Select>
      </div>

      {/* Display Filtered Members */}
      <List
        itemLayout="horizontal"
        dataSource={filteredMembers}
        renderItem={(member) => (
          <List.Item key={member.id} onClick={() => showMemberDetails(member)} style={{ cursor: 'pointer' }}>
            <List.Item.Meta
              title={member.name}
              description={`Skills: ${member.skills.join(', ')} | Location: ${member.location}`}
            />
          </List.Item>
        )}
      />

      {/* Modal for Member Details */}
      {selectedMember && (
        <Modal
          title={selectedMember.name}
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null} // Remove default footer buttons
        >
          <p><strong>Name:</strong> {selectedMember.name}</p>
          <p><strong>Location:</strong> {selectedMember.location}</p>
          <p><strong>Skills:</strong> {selectedMember.skills.join(', ')}</p>
          {/* Add more detailed information as required */}
        </Modal>
      )}
    </Container>
  );
};

export default BilledMembers;
