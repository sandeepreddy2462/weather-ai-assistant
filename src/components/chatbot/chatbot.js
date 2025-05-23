import React from "react";
import "./chatbot.css";

const chatbot = ({ title, suggestions }) => {
  return (
    <div className="chatbot">
      <h3>{title}</h3>
      <ul>
        {suggestions.map((s, index) => (
          <li key={index}>🤖 {s}</li>
        ))}
      </ul>
    </div>
  );
};

export default chatbot;
