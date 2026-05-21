import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await fetch(
        "https://ai-resume-analyzer-66fg.onrender.com/api/resume/upload",
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #111827)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "52px",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          AI Resume Analyzer
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginBottom: "35px",
            fontSize: "18px",
          }}
        >
          Upload your resume and get instant ATS analysis powered by AI
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginBottom: "35px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              padding: "12px",
              borderRadius: "12px",
              background: "#fff",
              border: "none",
            }}
          />

          <button
            onClick={analyzeResume}
            style={{
              padding: "14px 28px",
              borderRadius: "12px",
              border: "none",
              background: "#3b82f6",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            padding: "30px",
            borderRadius: "20px",
            minHeight: "250px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#60a5fa",
            }}
          >
            Analysis Result
          </h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              color: "#f8fafc",
              fontSize: "18px",
              lineHeight: "1.8",
            }}
          >
            {result || "Your ATS analysis will appear here..."}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;