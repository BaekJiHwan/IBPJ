import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../CSS/OpenAI.css'

const KakaoTalk = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const socket = io.connect(process.env.REACT_APP_Endpoint);


    useEffect(() => {
        console.log(socket)
        // 소켓 이벤트 리스너 추가
        socket.on('chat message', (message) => {
            const aiMessage = {
                text: message,
                sender: 'ai'
            };
            setMessages([...messages, aiMessage]);
        });
    
        return () => {
            socket.off('chat message'); // 컴포넌트 언마운트 시 이벤트 리스너 제거
        };
    }, [messages, socket]); // 'socket'을 의존성 배열에 추가


    const handleSend = async () => {
        const userMessage = {
            text: userInput,
            sender: 'user'
        };
        setMessages([...messages, userMessage]);

        // 소켓을 통해 메시지 서버로 보내기
        socket.emit('chat message', userInput);

        setUserInput('');
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

export default KakaoTalk;
