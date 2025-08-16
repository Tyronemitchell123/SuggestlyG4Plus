import React from "react";

function BasicTest() {
  return (
    <div
      style={{
        backgroundColor: "#2d3748",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        🚀 SUGGESTLY ELITE
      </h1>
      <p style={{ fontSize: "24px", marginBottom: "30px" }}>
        React is working perfectly!
      </p>
      <div
        style={{
          backgroundColor: "#4a5568",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2>✅ Status: All Systems Go</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>✅ React is loading</li>
          <li>✅ Components are rendering</li>
          <li>✅ Styling is working</li>
          <li>✅ Server is running</li>
        </ul>
      </div>
      <button
        style={{
          backgroundColor: "#4299e1",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
          marginTop: "30px",
        }}
      >
        Test Button - Click Me!
      </button>
    </div>
  );
}

export default BasicTest;
