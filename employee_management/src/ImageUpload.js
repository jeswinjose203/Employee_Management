// ImageUpload.js
import React, { useState } from 'react';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }
    
    alert("Image uploaded successfully!");
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      
      {previewUrl && (
        <div style={{ marginTop: '20px' }}>
          <img
            src={previewUrl}
            alt="Selected"
            style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%' }}
          />
        </div>
      )}
      
      <button
        onClick={handleUpload}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#1890ff', // Ant Design primary color
          color: '#fff', // White text
          border: 'none', // Remove default button border
          borderRadius: '5px', // Rounded corners
          cursor: 'pointer', // Pointer on hover
          display: 'inline-block', // Inline-block for sizing
          transition: 'background-color 0.3s ease', // Smooth hover effect
        }}
        
      >
        Upload Image
      </button>
    </div>
  );
}

export default ImageUpload;
