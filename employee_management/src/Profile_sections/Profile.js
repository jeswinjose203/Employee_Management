import React, { useState } from 'react';
import { Button, Input, Select, Form, Space, Row, Col, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import skillsData from '../static/skills.json';

const { Option } = Select;

const Profile = () => {
  const navigate = useNavigate();
  const [skills] = useState(skillsData.skills);
  const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false);
  const [isEmpCodeValid, setIsEmpCodeValid] = useState(false);
  const [form] = Form.useForm();

  const handleCheckEmpCode = async () => {
    const empCode = form.getFieldValue('empCode');
    try {
      const response = await fetch(`http://localhost:5001/employee/checkEmpCode/${empCode}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          message.success('EmpCode exists. You can now edit the profile.');
          setIsEmpCodeValid(true);
        } else {
          message.error('EmpCode does not exist. Please enter a valid EmpCode.');
          setIsEmpCodeValid(false);
        }
      } else {
        message.error('Failed to verify EmpCode. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleFormSubmit = async (values) => {
    if (!isEmpCodeValid) {
      message.error('Please check the EmpCode first.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/employee/Profiledata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success('Profile data updated successfully!');
      } else {
        const errorResponse = await response.json();
        message.error(`Failed to send data: ${errorResponse.message || 'Please input a proper EmpCode and data.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={handleGoBack}>Go Back</Button>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={18}>
          <Form layout="vertical" onFinish={handleFormSubmit} form={form}>
            <Form.Item
              label="EmpCode"
              name="empCode"
              rules={[{ required: true, message: 'Please enter your EmpCode!' }]}
            >
              <Input placeholder="Enter EmpCode" />
            </Form.Item>

            <Button type="primary" onClick={handleCheckEmpCode}>Check EmpCode</Button>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input placeholder="Enter your name" disabled={!isEmpCodeValid} />
            </Form.Item>

            <Form.Item label="Location" name="location">
              <Select placeholder="Enter your location" disabled={!isEmpCodeValid}>
                <Option value="Kochi">Kochi</Option>
                <Option value="TVM">TVM</Option>
                <Option value="Chennai">Chennai</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Skills" name="skills">
              <Select mode="multiple" placeholder="Select your skills" allowClear disabled={!isEmpCodeValid}>
                {skills.map((skill) => (
                  <Option key={skill} value={skill}>{skill}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Position" name="position">
              <Input placeholder="Position" disabled={!isEmpCodeValid} />
            </Form.Item>

            <Form.Item label="Reporting Officer" name="reportingOfficer">
              <Input placeholder="Reporting Officer" disabled={!isEmpCodeValid} />
            </Form.Item>

            {/* Add back other form fields that were missing */}
            <Form.Item label="Total Experience" name="totalExperience">
              <Input placeholder="Total Experience" disabled={!isEmpCodeValid} />
            </Form.Item>

            <Form.Item label="Allocation" name="allocation">
              <Input placeholder="Allocation" disabled={!isEmpCodeValid} />
            </Form.Item>

            <Form.Item label="Primary Skill" name="primarySkill">
              <Input placeholder="Primary Skill" disabled={!isEmpCodeValid} />
            </Form.Item>

            <Form.Item label="Comments" name="comments">
              <Input.TextArea rows={4} placeholder="Comments" disabled={!isEmpCodeValid} />
            </Form.Item>

            <Form.Item label="Free From Date" name="freeFromDate">
              <Input placeholder="Free From Date" disabled={!isEmpCodeValid} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" disabled={!isEmpCodeValid}>Save Profile</Button>
                <Button htmlType="reset">Reset</Button>
                <Button type="dashed" onClick={() => setIsResetPasswordVisible(true)} disabled={!isEmpCodeValid}>Reset Password</Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
