import React, { useState } from 'react';
import { openaiDALLE } from '../components/OpenAI';
import '../CSS/OpenAI.css';

const DALLE = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        // 사용자 메시지 추가
        const userMessage = {
            type: 'text',
            content: userInput,
            sender: 'user'
        };
        setMessages([...messages, userMessage]);
        setIsLoading(true);

        // DALL-E 이미지 생성 요청
        const imageURL = await openaiDALLE(userInput);
        if (imageURL) {
            const imageMessage = {
                type: 'image',
                content: imageURL,
                sender: 'ai'
            };
            setMessages([...messages, userMessage, imageMessage]); // 이미지 메시지 추가
        }
        setIsLoading(false);
        setUserInput('');
    };

    return (
        <div className="chat-app">
            <div className="chat-window" id="chat-window">
                {messages.map((message, index) => (
                    <div key={index} className={`message-container ${message.sender}`}>
                        {message.type === 'text' ? (
                            <div className={`message ${message.sender}`}>
                                {message.content}
                            </div>
                        ) : (
                            <img src={message.content} alt="Generated" />
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="message-container ai">
                        <img className="loading" src="image/Loading.gif" alt="Loading" />
                    </div>
                )}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>이미지 생성</button>
            </div>
        </div>
    );
};

export default DALLE;
