import { useState } from "react";
import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://ai-resume-analyzer-66fg.onrender.com/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data);
      }

      setResult(data);
    } catch (error) {
      setResult(error.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>AI Resume Analyzer</h1>

        <p className="subtitle">
          Upload your resume and get ATS analysis instantly
        </p>

        <div className="upload-section">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button onClick={analyzeResume}>
            Analyze Resume
          </button>
        </div>

        {result && (
          <div className="result-box">
            <h2>Analysis Result</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}