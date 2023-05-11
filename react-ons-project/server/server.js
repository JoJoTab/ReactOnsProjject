// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const PORT = 4000;
// const cors    = require("cors");

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'a980911',
//     database: 'react',
// });

// app.use(cors({
//     origin: "*",                // 출처 허용 옵션
//     credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
//     optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
// }))

// app.use(express.urlencoded({ extended: true })) 

// app.get('/api/get', (req, res) => {
//     const sql = "SELECT * FROM table1;";
//     db.query(sql, (err, result) => {
//         res.send(result);
//     })
// })

// app.listen(PORT, () => {
//     console.log(`Server run : http://localhost:${PORT}/`);
// })