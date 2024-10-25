import React, { useState } from 'react';
import { Button, Input, Select, Form, Space, Row, Col, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import skillsData from '../static/skills.json'; // Importing skills from the JSON file
import ImageUpload from '../ImageUpload';

const { Option } = Select;

const Profile = ({ profilePhoto, setProfilePhoto }) => {
  const [localPhoto, setLocalPhoto] = useState(profilePhoto);
  const navigate = useNavigate();
  const [skills] = useState(skillsData.skills);  // Load skills from JSON file
  const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false);

  // Handle form submission
  const handleFormSubmit = (values) => {
    console.log('Form Values:', values);
  };

  const onImageUpload = (imageData) => {
    setLocalPhoto(imageData);
    setProfilePhoto(imageData);
  };

  // Navigate back to the previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Show or hide the password reset modal
  const showResetPasswordModal = () => {
    setIsResetPasswordVisible(true);
  };

  const handleCancelPasswordReset = () => {
    setIsResetPasswordVisible(false);
  };

  // Handle password reset submission
  const handlePasswordResetSubmit = (values) => {
    console.log('Password Reset Values:', values);
    // Add logic to handle password reset (e.g., API call)
    setIsResetPasswordVisible(false);  // Close the modal after submission
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Go Back Button */}
      <Button type="primary" onClick={handleGoBack}>
        Go Back
      </Button>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        {/* Left Column: Profile Photo */}
        <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
          <ImageUpload onImageUpload={onImageUpload} />
        </Col>

        {/* Right Column: Form */}
        <Col xs={24} sm={18}>
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
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
                {skills.map(skill => (
                  <Option key={skill} value={skill}>
                    {skill}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Member Status" name="memberStatus">
              <Select placeholder="Select status">
                <Option value="billed_member">Billed Member</Option>
                <Option value="unbilled">Unbilled</Option>
                <Option value="bench">Bench</Option>
                <Option value="unbenched">Unbenched</Option>
                <Option value="shadow">Shadow</Option>
                <Option value="partially_billable">Partially Billable</Option>
                <Option value="project_buffer">Project Buffer</Option>
              </Select>
            </Form.Item>

            <Form.Item label="What are they working on?" name="workingOn">
              <Input.TextArea rows={4} placeholder="Describe what you're currently working on" />
            </Form.Item>

            <Form.Item label="Project Description" name="projectDescription">
              <Input.TextArea rows={4} placeholder="Describe the project you're working on" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save Profile
                </Button>
                <Button htmlType="reset">
                  Reset
                </Button>
                <Button type="dashed" onClick={showResetPasswordModal}>
                  Reset Password
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {/* Reset Password Modal */}
      <Modal
        title="Reset Password"
        visible={isResetPasswordVisible}
        onCancel={handleCancelPasswordReset}
        footer={null}
      >
        <Form layout="vertical" onFinish={handlePasswordResetSubmit}>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please enter your new password!' }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={handleCancelPasswordReset}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
