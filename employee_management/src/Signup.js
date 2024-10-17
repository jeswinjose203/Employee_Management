import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaLock, FaKey, FaIdBadge, FaBriefcase } from 'react-icons/fa';

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 86vh;
  background: #f7f8fa;
  padding: 1rem;
`;

const FormContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h2`
  color: #333;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
  background-color: #f9f9f9;
`;

const Icon = styled.div`
  margin-right: 0.5rem;
  color: #888;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: none;
  outline: none;
  font-size: 0.95rem;
  background: none;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #666;
  margin-top: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #333;
  color: #f7f7f7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #555;
  }
`;

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        employeeId: '',
        email: '',
        password: '',
        confirmPassword: '',
        position: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5239/api/auth/signup', formData);
            alert("Signup successful!");
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Signup failed.");
        }
    };

    return (
        <SignupContainer>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <Title>Sign Up</Title>
                    <InputWrapper>
                        <Icon><FaUser /></Icon>
                        <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    </InputWrapper>
                    <InputWrapper>
                        <Icon><FaIdBadge /></Icon>
                        <Input name="employeeId" placeholder="Employee ID" value={formData.employeeId} onChange={handleChange} required />
                    </InputWrapper>
                    <InputWrapper>
                        <Icon><FaEnvelope /></Icon>
                        <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                    </InputWrapper>
                    <InputWrapper>
                        <Icon><FaLock /></Icon>
                        <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </InputWrapper>
                    <InputWrapper>
                        <Icon><FaKey /></Icon>
                        <Input type="password" name="confirmPassword" placeholder="Repeat your password" value={formData.confirmPassword} onChange={handleChange} required />
                    </InputWrapper>
                    <InputWrapper>
                        <Icon><FaBriefcase /></Icon>
                        <Input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
                    </InputWrapper>
                    <CheckboxLabel>
                        <input type="checkbox" required /> I agree to all statements in <a href="/terms">Terms of service</a>
                    </CheckboxLabel>
                    <Button type="submit">REGISTER</Button>
                </Form>
            </FormContainer>
        </SignupContainer>
    );
}
