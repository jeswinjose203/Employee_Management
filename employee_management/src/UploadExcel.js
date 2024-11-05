import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const UploadExcel = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(""); // State to store feedback messages

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMessage(""); // Clear any previous message
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Transform jsonData to match your backend's expected structure
            const employees = jsonData.slice(1).map(row => ({
                EmpCode: row[0] || null, // Column 1
                EmpName: row[1] || '', // Column 2
                Position: row[2] || '', // Column 3
                ReportingOfficer: row[3] || '', // Column 4
                TotalExperience: row[4] || '', // Column 5
                ResourceStatus: row[5] || '', // Column 6
                Allocation: row[6] || '', // Column 7
                PrimarySkill: row[7] || '', // Column 8
                Skills: row[8] || '', // Column 9
                Comments: row[9] || '', // Column 10
                FreeFromDate: row[10] ? row[10].toString() : 'None', // Column 11
                Location: row[11] || '', // Column 12
                MemberWorkingOn: "None",
                ProjectDesc: "None",
                ProfilePhoto: "None",
                Password: "None",
                Email: "None"
            })).filter(employee => employee.EmpCode !== null);
            

            console.log('JSON Data to be sent:', employees); // Log the JSON data before sending

            // Send the JSON data to the backend using Axios
            try {
                const response = await axios.post('http://localhost:5001/employee/handleexcel', employees, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Success:', response.data);
                setMessage("File uploaded successfully!"); // Set success message
            } catch (error) {
                console.error('Error sending data:', error.response ? error.response.data : error.message);
                setMessage("Error uploading file. Please try again."); // Set error message
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Excel</button>
            {message && <p>{message}</p>} {/* Display message if present */}
        </div>
    );
};

export default UploadExcel;
