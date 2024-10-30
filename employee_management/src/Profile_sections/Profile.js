import React, { useState } from 'react';
import { Button, Input, Select, Form, Space, Row, Col, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import skillsData from '../static/skills.json';
import { message } from 'antd'; // Import message from antd
const { Option } = Select;

const Profile = () => {
  const navigate = useNavigate();
  const [skills] = useState(skillsData.skills);
  const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false);

  // Handle form submission


  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:5001/employee/Profiledata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        console.log('Data sent successfully');
        // Handle successful submission, e.g., navigate to another page
        message.success('Profile data updated successfully!');
      } else {
        // Handle unsuccessful submission
        const errorResponse = await response.json(); // Parse the error response
        message.error(`Failed to send data: ${errorResponse.message || 'Please input a proper EmpCode and data.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An unexpected error occurred. Please try again.');
    }
  };
  

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={handleGoBack}>
        Go Back
      </Button>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={18}>
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              label="EmpCode"
              name="empCode"
              rules={[{ required: true, message: 'Please enter your EmpCode!' }]}
            >
              <Input placeholder="Enter EmpCode" />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item label="Location" name="location">
              <Select placeholder="Enter your location">
                <Option value="Kochi">Kochi</Option>
                <Option value="TVM">TVM</Option>
                <Option value="Chennai">Chennai</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Skills" name="skills">
              <Select mode="multiple" placeholder="Select your skills" allowClear>
                {skills.map((skill) => (
                  <Option key={skill} value={skill}>
                    {skill}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Resource Status" name="memberStatus">
              <Select placeholder="Select status">
                <Option value="Billed Member">Billed Member</Option>
                <Option value="Unbilled">Unbilled</Option>
                <Option value="Bench">Bench</Option>
                <Option value="UnBenched">Unbenched</Option>
                <Option value="Shadow">Shadow</Option>
                <Option value="Partially Billable">Partially Billable</Option>
                <Option value="Project Buffer">Project Buffer</Option>
              </Select>
            </Form.Item>
{/* 
            <Form.Item label="What are they working on?" name="workingOn">
              <Input.TextArea rows={4} placeholder="Describe what you're currently working on" />
            </Form.Item>

            <Form.Item label="Project Description" name="projectDescription">
              <Input.TextArea rows={4} placeholder="Describe the project you're working on" />
            </Form.Item> */}

            <Form.Item label="Position" name="position">
              <Input placeholder="Position" />
            </Form.Item>

            <Form.Item label="Reporting Officer" name="reportingOfficer">
              <Input placeholder="Reporting Officer" />
            </Form.Item>

            <Form.Item label="Total Experience" name="totalExperience">
              <Input placeholder="Total Experience" />
            </Form.Item>

            <Form.Item label="Allocation" name="allocation">
              <Input placeholder="Allocation" />
            </Form.Item>

            <Form.Item label="Primary Skill" name="primarySkill">
              <Input placeholder="Primary Skill" />
            </Form.Item>

            <Form.Item label="Comments" name="comments">
              <Input.TextArea rows={4} placeholder="Comments" />
            </Form.Item>

            <Form.Item label="Free From Date" name="freeFromDate">
              <Input placeholder="Free From Date" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save Profile
                </Button>
                <Button htmlType="reset">
                  Reset
                </Button>
                <Button type="dashed" onClick={() => setIsResetPasswordVisible(true)}>
                  Reset Password
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
