const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');  // mysql 모듈 로드
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://192.168.0.15',
        methods: ['GET', 'POST']
    }
});


//DB연동
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0000',
    database: 'ibpj',
    "timezone": "Asia/Seoul",
    "dateStrings": "date",
    multipleStatements: true
});

db.connect();


app.use(bodyParser.json());
app.use(cors({
    origin: process.env.REACT_APP_Endpoint, // 클라이언트 주소
    methods: ['GET', 'POST'] // 허용할 HTTP 메소드
}));




// React 앱을 서비스하는 폴더 설정
app.use(express.static(path.join(__dirname + '/../', 'build')));



// 댓글 입력
app.post('/pushComment', (req, res) => {
    const { comment, postID } = req.body;
    let sql = `INSERT INTO (postID, content, commentDate) VALUES (${postID}, '${comment}', now());`
    db.query(sql, (error, data, fields) => {
        if (error) throw error;
        console.log('데이터 저장 성공')
    });
});


// 댓글을 가져오는 API 엔드포인트
app.get('/pullComment', (req, res) => {
    const { postID } = req.query;
    let sql = `SELECT * FROM comments WHERE postID = ${db.escape(postID)};`
    db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.send(data)
    });
});





// 모든 요청을 React 앱으로 리디렉션
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../', 'build', 'index.html'));
});



io.on('connection', (socket) => {
    console.log(`User connected with socket.id: ${socket.id}`);

    socket.on('chat message', (message) => {
        console.log(message);

        // 모든 클라이언트에게 메시지 브로드캐스트
        socket.boradcast.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log(`User with socket.id ${socket.id} disconnected`);
    });
});







// 서버 시작
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
