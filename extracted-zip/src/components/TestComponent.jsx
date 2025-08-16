import React from "react";

export default function TestComponent() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1a1a",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>SUGGESTLY ELITE - Test Page</h1>
      <p>If you can see this, React is working!</p>
      <div
        style={{
          backgroundColor: "#333",
          padding: "20px",
          borderRadius: "8px",
          margin: "20px 0",
        }}
      >
        <h2>Status Check:</h2>
        <ul>
          <li>✅ React is loading</li>
          <li>✅ Component is rendering</li>
          <li>✅ Basic styling is working</li>
        </ul>
      </div>
      <button
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Test Button
      </button>
    </div>
  );
}
