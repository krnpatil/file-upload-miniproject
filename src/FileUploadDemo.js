import React, { useState } from "react";

function FileUploadDemo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadStatus("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload success:", data);
      setUploadStatus("✅ File uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      setUploadStatus("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700 shadow-2xl rounded-3xl p-10 w-full max-w-lg mx-auto text-white transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-105">

      <h1 className="text-3xl font-bold mb-6 text-indigo-300">📂 Upload Center</h1>

      <input
        type="file"
        onChange={handleFileChange}
        className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-indigo-600 file:text-white
                   hover:file:bg-indigo-700
                   transition mb-6"
      />

      <button
        onClick={handleUpload}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 rounded-full transition"
      >
        🚀 Upload Now
      </button>

      {uploadStatus && (
        <div className="mt-4 text-sm text-center text-indigo-200 animate-pulse">
          {uploadStatus}
        </div>
      )}
    </div>
  );
}

export default FileUploadDemo;
