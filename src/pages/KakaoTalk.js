import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../CSS/OpenAI.css'

const KakaoTalk = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    



    useEffect(() => {
        const newSocket = io.connect(process.env.REACT_APP_Endpoint);
        setSocket(newSocket);
        // 소켓 이벤트 리스너 추가
        newSocket.on('chat message', (message) => {
            const aiMessage = {
                text: message,
                sender: 'ai'
            };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        });

        return () => newSocket.close();
    }, []); // 'socket'을 의존성 배열에 추가


    const handleSend = async () => {
        if (socket) {
            const userMessage = {
                text: userInput,
                sender: 'user'
            };
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            // 소켓을 통해 메시지 서버로 보내기
            socket.emit('chat message', userInput);

            setUserInput('');    
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
