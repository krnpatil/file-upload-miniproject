// FileUploadDemo.js
import React, { useState } from 'react';
import axios from 'axios';

function FileUploadDemo() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    generatePreviews(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(dropped);
    generatePreviews(dropped);
  };

  const generatePreviews = (files) => {
    const filePreviews = files.map(file => {
      if (file.type.startsWith("image")) {
        return { name: file.name, type: "image", url: URL.createObjectURL(file) };
      } else {
        return { name: file.name, type: "doc" };
      }
    });
    setPreviews(filePreviews);
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select some files");

    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      console.log(res.data);
      alert("Upload successful ✅");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload Files</h2>

      {/* Drag and Drop Area */}
      <div
        className="border-2 border-dashed border-gray-600 p-6 rounded-xl text-center cursor-pointer mb-4 hover:border-gray-400"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        Drag and drop your files here
      </div>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-4 w-full text-gray-300 file:bg-gray-800 file:border-0 file:rounded file:px-4 file:py-2 file:cursor-pointer"
      />

      {/* File Previews */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {previews.map((file, idx) => (
          <div key={idx} className="bg-gray-800 p-3 rounded-lg">
            {file.type === "image" ? (
              <img src={file.url} alt={file.name} className="w-full h-32 object-cover rounded" />
            ) : (
              <div className="text-center py-10 text-gray-400">📄 {file.name}</div>
            )}
            <p className="mt-2 text-sm break-all">{file.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg font-medium w-full"
      >
        Upload Files
      </button>
    </div>
  );
}

export default FileUploadDemo;
