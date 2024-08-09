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
// app.use(express.urlencoded({ extended: true }));

app.use('/health', health)
app.use('/api/team', teamRouter)
app.use('/api/people', peopleRouter)
app.use('/api/role', roleRouter)
app.use('/api/software', softwareRouter)
app.use('/api/equipment', equipmentRouter)
app.use('/api/supply', supplyRouter)

const filePath = path.join(__dirname, '.well-known', 'apple-app-site-association');

app.get('/.well-known/apple-app-site-association', (req, res) => {
    console.log(`apple-app-site-association Call`)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // 파일 읽기 오류 처리
            res.status(500).send('Unable to read the file');
        } else {
            // 캐싱 방지 헤더 설정
            res.setHeader('Cache-Control', 'no-store');
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(data);
        }
    });
});

// 2. 앱스토어로 리디렉션 처리
app.get('/redirect-to-app-store', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Redirecting</title>
        </head>
        <body>
            <h1>Redirecting to App Store...</h1>
            <script type="text/javascript">
                window.location.href = "https://apps.apple.com/app/1597866658";
            </script>
        </body>
        </html>
    `);
});

app.post('/testVersion', (req, res) => {
    console.log(`testVersion Call`)
    let data = {
        androidForceUpdYn : "N",
iosForceUpdYn :  "N",
androidVersion:  "0.0.1",
iosVersion :  "0.0.2",
message :  "!!!!!!! 테스트 필수로 URL 수정 !!!!!!!!!",
messageEng:  "A new version !!!!!!! 테스트 필수로 URL 수정 !!!!!!!!!",
useYn :  "Y",
reqType :  "01",
crtDt :  "2023-08-16 07:41:17",
    }

    res.send(data);
});

app.post('/checkServerStatus', (req, res) => {
    console.log(`checkServerStatus Call`)
    let data = {ServerDown :  "Y"}

    res.send(data);
});





// // 정적 파일을 위한 경로 설정
// const wellKnownDirectory = path.join(__dirname, '.well-known');

// // .well-known 폴더를 정적으로 제공하되, 특정 파일에 대해 MIME 타입을 설정
// app.use('/.well-known', express.static(wellKnownDirectory, {
//     setHeaders: (res, path) => {
//         if (path.endsWith('apple-app-site-association')) {
//             res.setHeader('Content-Type', 'application/json');
//         }
//     }
// }));



app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`)
})
