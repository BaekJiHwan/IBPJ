const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');  // mysql 모듈 로드

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





// React 앱을 서비스하는 폴더 설정
app.use(express.static(path.join(__dirname+'/../', 'build')));



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
    res.sendFile(path.join(__dirname+'/../', 'build', 'index.html'));
});




// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
