import React, { useState } from "react";

const ResumeProjects = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // Optional: upload logic here
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 
    flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Resume Creator
        </h2>

        <div className="mb-4">
          <input
            type="file"
            id="cv-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="cv-upload"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition duration-200"
          >
            Upload Existing CV
          </label>

          {fileName && (
            <p className="mt-2 text-sm text-gray-600">Uploaded: {fileName}</p>
          )}
        </div>

        <p className="mt-6 text-gray-700 font-medium text-lg">
          Text-based Resume Creator –{" "}
          <span className="text-green-600">Coming Soon!</span>
        </p>
      </div>
    </div>
  );
};

export default ResumeProjects;
