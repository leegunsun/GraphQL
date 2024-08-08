const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express()

const teamRouter = require('./routes/team.js')
const peopleRouter = require('./routes/people.js')
const roleRouter = require('./routes/role.js')
const softwareRouter = require('./routes/software.js')
const equipmentRouter = require('./routes/equipment.js')
const supplyRouter = require('./routes/supply.js')
const health = require('./routes/health.js')

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/health', health)
app.use('/api/team', teamRouter)
app.use('/api/people', peopleRouter)
app.use('/api/role', roleRouter)
app.use('/api/software', softwareRouter)
app.use('/api/equipment', equipmentRouter)
app.use('/api/supply', supplyRouter)

// 파일 경로 설정1
const filePath = path.join(__dirname, '.well-known', 'apple-app-site-association');

// '/.well-known/apple-app-site-association' 경로에 대한 GET 요청 처리
app.get('/.well-known/apple-app-site-association', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // 파일 읽기 오류 처리
            res.status(500).send('Unable to read the file');
        } else {
            // 성공적으로 파일 내용을 읽었을 때 JSON 형식으로 클라이언트에 전송
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`)
})
