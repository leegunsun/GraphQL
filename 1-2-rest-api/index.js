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

// 정적 파일을 위한 경로 설정
const wellKnownDirectory = path.join(__dirname, '.well-known');

// .well-known 폴더를 정적으로 제공하되, 특정 파일에 대해 MIME 타입을 설정
app.use('/.well-known', express.static(wellKnownDirectory, {
    setHeaders: (res, path) => {
        if (path.endsWith('apple-app-site-association')) {
            res.setHeader('Content-Type', 'application/json');
        }
    }
}));


app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`)
})
