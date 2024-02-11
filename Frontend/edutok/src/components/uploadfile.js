import React, { useState } from 'react';
import axios from 'axios';
import image from './image.png'

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    // Upload the file immediately when selected
    uploadFile(event.target.files[0]);
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('https://edutok-f643f-default-rtdb.firebaseio.com/', formData)
      .then((response) => {
        console.log(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* Display the selected file name */}
      {/* {selectedFile && <div>Selected file: {selectedFile.name}</div>} */}
      {/* Input for selecting the file */}
<input
  type="file"
  onChange={handleFileUpload}
  style={{ display: 'none' }} // Hide the file input element
  id="fileInput" // Add an ID for the label association
/>
<label htmlFor="fileInput">
  {/* Replace 'upload-icon.png' with your actual image */}
  <img
    src={image}
    alt="Upload icon"
    style={{
      width: '2vh', // Set the desired width
      height: '2vh', // Set the desired height
      cursor: 'pointer', // Show pointer cursor on hover
    }}
  />
</label>
    </div>
  );
};

export default UploadFile;
