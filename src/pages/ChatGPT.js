import React, { useState } from 'react';
import { openaiChat } from '../components/OpenAI';
import '../CSS/OpenAI.css'

const ChatGPT = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    const handleSend = async () => {
        //사용자 입력
        const userMessage = {
            text: userInput,
            sender: 'user'
        };
        setMessages([...messages, userMessage]);

        setUserInput('');
        
        setIsLoading(true); // 로딩 시작


        //요청
        const response = await openaiChat(userInput)
        setIsLoading(false); // 로딩 종료


        if (response) {
            const aiMessage = {
                text: response.trim(),
                sender: 'ai'
            };
            setMessages([...messages, userMessage, aiMessage]);
        } else {
            // 응답이 없을 경우 처리
            alert('응답이 없습니다')
        }


    };

    return (
        <div className="chat-app">
            <div className="chat-window" id="chat-window">
                {messages.map((message, index) => (
                    <div key={index} className={`message-container ${message.sender === 'ai' ? 'ai' : ''}`}>
                        <div className={`message ${message.sender}`}>
                            {message.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message-container ai">
                        <img className="loading" src="image/Loading.gif" alt="Loading"/>
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
                <button onClick={handleSend}>전송</button>
            </div>
        </div>
    );
};

export default ChatGPT;
