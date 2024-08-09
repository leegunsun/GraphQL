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

var urlMappings = {};


app.get('/test11', (req, res) => {
    console.log(`apple-app-site-association Call`)
    console.log('req.headers["sec-ch-ua-platform"] -->')
    console.log(req.headers["sec-ch-ua-platform"])
    res.redirect('/.well-known/apple-app-site-association');
});

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



// // URL 매핑을 저장하기 위한 객체 (실제 환경에서는 DB를 사용)
// var urlMappings = {};

// // 고유 식별자 생성 함수
// function generateUniqueId() {
//     return crypto.randomBytes(16).toString('hex');
// }

// // 사용자가 특정 URL을 클릭했을 때 이 엔드포인트를 호출한다고 가정
// app.get('/deferred-deep-link', (req, res) => {
//     console.log(`Deferred deep link accessed`);
    
//     const deviceInfo = {
//         userAgent: req.headers['user-agent'],
//         ip: req.ip,
//     };
    
//     // 고유 식별자 생성
//     const uniqueId = generateUniqueId();

//     // URL 쿼리 파라미터 가져오기
//     const urlQuery = req.query;

//     // 고유 식별자와 URL 정보를 매핑하여 저장
//     urlMappings[uniqueId] = { urlQuery, deviceInfo };
    
//     // 클라이언트에게 고유 식별자 전달 (앱 설치 후 이 식별자를 사용하게 됩니다)
//     res.status(200).json({ uniqueId });
// });

// // 앱이 설치된 후 처음 실행될 때 호출되는 엔드포인트
// app.post('/retrieve-link-info', (req, res) => {
//     console.log(`Retrieve link info request`);
    
//     const uniqueId = req.body.uniqueId; // 클라이언트로부터 받은 고유 식별자

//     if (urlMappings[uniqueId]) {
//         // 고유 식별자에 매핑된 URL 정보 반환
//         const linkInfo = urlMappings[uniqueId];
//         res.status(200).json(linkInfo);
        
//         // 일회용으로 사용할 경우 매핑 정보 삭제
//         delete urlMappings[uniqueId];
//     } else {
//         // 고유 식별자에 대한 매핑 정보가 없을 경우
//         res.status(404).json({ error: 'No mapping found for the provided uniqueId' });
//     }
// });



app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`)
})
