import React, { useState } from 'react';
import axios from 'axios';

const BootUs = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const apiEndpoint = 'https://api.openai.com/v1/completions';
  const apiKey = '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' ; // Replace with your actual API key
  const model = 'text-davinci-003'; // Specify the model you want to use

  const sendMessage = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      };

      const data = {
        model,
        prompt: userInput,
        max_tokens: 50 // Adjust as needed
      };

      const response = await axios.post(apiEndpoint, data, { headers });

      if (response.status === 200) {
        const botResponse = response.data.choices[0].text.trim();
        setChatHistory([...chatHistory, { user: userInput, bot: botResponse }]);
        setUserInput('');
      } else {
        console.error('Error fetching response from API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const renderChatHistory = () => {
    return chatHistory.map((entry, index) => (
      <div key={index}>
        <p><strong>You:</strong> {entry.user}</p>
        <p><strong>Bot:</strong> {entry.bot}</p>
      </div>
    ));
  };

  return (
    <div>
      <div className="chat-history">
        {renderChatHistory()}
      </div>
      <form onSubmit={handleKeyPress}>
      <input
        type="text"
        value={userInput}
        onChange={(e) =>{handleKeyPress ;setUserInput(e.target.value)}}
        
      />
      </form>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default BootUs;


//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