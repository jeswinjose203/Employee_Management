import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Upload, Input, Select, Form, Space, Row, Col, Avatar, Modal } from 'antd';

const Bench_Members = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {/* Go Back Button */}
      <Button type="primary" onClick={handleGoBack}>
        Go Back
      </Button>
      <h1>Billed Members</h1>
      <p>This is the Bench_Members.</p>
    </div>
  );
};

export default Bench_Members;