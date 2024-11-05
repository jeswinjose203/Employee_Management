import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Form, Space, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import skillsData from '../static/skills.json';
import UploadExcel from '../UploadExcel';
import { Modal } from 'antd';


const { Option } = Select;

const Profile = () => {
  const navigate = useNavigate();
  const [skills] = useState(skillsData.skills);
  const [isEmpCodeValid, setIsEmpCodeValid] = useState(false);
  const [employeeData, setEmployeeData] = useState(null); // State to store employee data
  const [form] = Form.useForm();
  const [showUploadExcel, setShowUploadExcel] = useState(false); // New state to control modal
  const handleCheckEmpCode = async () => {
    const empCode = form.getFieldValue('empCode');
    try {
      const response = await fetch(`http://localhost:5001/employee/checkEmpCode/${empCode}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data); // For debugging

        if (data.exists) {
          message.success('EmpCode exists. You can now edit the profile.');
          setIsEmpCodeValid(true);
          setEmployeeData(data.employeeData); // Set employee data from API response
        } else {
          message.error('EmpCode does not exist. Please enter a valid EmpCode.');
          setIsEmpCodeValid(false);
          setEmployeeData(null); // Clear employee data if EmpCode is invalid
          form.resetFields(); // Clear form if EmpCode is invalid
        }
      } else {
        message.error('Failed to verify EmpCode. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (isEmpCodeValid && employeeData) {
      console.log("Setting form values with:", employeeData); // Debugging
      form.setFieldsValue({
        empCode: employeeData.empCode,
        name: employeeData.empName,
        memberStatus: employeeData.resourceStatus, // Ensure this is correct
        position: employeeData.position,
        location: employeeData.location,
        skills: employeeData.skills ? (Array.isArray(employeeData.skills) ? employeeData.skills : [employeeData.skills]) : [],
        memberWorkingOn: employeeData.memberWorkingOn,
        projectDesc: employeeData.projectDesc,
        reportingOfficer: employeeData.reportingOfficer,
        totalExperience: employeeData.totalExperience,
        allocation: employeeData.allocation,
        primarySkill: employeeData.primarySkill,
        comments: employeeData.comments,
        freeFromDate: employeeData.freeFromDate,
      });
    }
  }, [isEmpCodeValid, employeeData, form]);
  
  const handleUploadExcel = () => {
    setShowUploadExcel(true);
  };
  const closeUploadExcel = () => {
    setShowUploadExcel(false);
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
            {/* Upload Excel button to open modal */}
            <Button type="primary" onClick={handleUploadExcel}>Upload Excel</Button>
          

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input placeholder="Enter your name" disabled={!isEmpCodeValid} />
            </Form.Item>

            {/* <Form.Item label="Email" name="email">
              <Input placeholder="Enter your email" disabled={!isEmpCodeValid} />
            </Form.Item> */}



            <Form.Item label="Resource Status" name="memberStatus">
  <Select placeholder="Select status" disabled={!isEmpCodeValid}>
    <Option value="Billed Member">Billed Member</Option>
    <Option value="Unbilled">Unbilled</Option>
    <Option value="Bench">Bench</Option>
    <Option value="Unbenched">Unbenched</Option>
    <Option value="Shadow">Shadow</Option>
    <Option value="Partially Billable">Partially Billable</Option>
    <Option value="Project Buffer">Project Buffer</Option>
  </Select>
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
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Modal
        title="Upload Excel"
        open={showUploadExcel}
        onCancel={closeUploadExcel}
        footer={null}
      >
        <UploadExcel />
      </Modal>
    </div>
  );
};

export default Profile;
