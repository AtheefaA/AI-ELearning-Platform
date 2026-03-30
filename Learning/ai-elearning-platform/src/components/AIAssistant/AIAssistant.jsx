import React, { useState, useEffect } from "react";
import "./AIAssistant.css";
import responsesData from "../../data/responses.json";
 // 👈 Import dummy JSON

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm your AI Learning Assistant. Ask me about our courses." }
  ]);
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState({});

  // Load dummy data from JSON on mount
  useEffect(() => {
    setResponses(responsesData);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    const lowerInput = input.toLowerCase().trim();
    let reply = "🤔 Sorry, I don't have an answer for that yet.";

    for (const key in responses) {
      if (lowerInput.includes(key)) {
        reply = responses[key];
        break;
      }
    }

    setTimeout(() => {
      setMessages([...newMessages, { sender: "bot", text: reply }]);
    }, 500);

    setInput("");
  };

  return (
    <div className="ai-assistant-container">
      <div className="chat-box">
        <div className="chat-header">🤖 AI Learning Assistant</div>
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask me about courses..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
