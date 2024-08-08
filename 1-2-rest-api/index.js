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
app.use(express.urlencoded())

app.use('/health', health)
app.use('/api/team', teamRouter)
app.use('/api/people', peopleRouter)
app.use('/api/role', roleRouter)
app.use('/api/software', softwareRouter)
app.use('/api/equipment', equipmentRouter)
app.use('/api/supply', supplyRouter)

// Serve apple-app-site-association file
app.get('/scan', (req, res) => {
  const filePath = path.join(__dirname, '.well-known/apple-app-site-association');
  
  // 파일 읽기
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    res.set('Content-Type', 'application/json');
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`)
})
