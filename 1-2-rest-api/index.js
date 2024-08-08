const express = require('express')
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

// Serve apple-app-site-association file/
app.get('/scan', (req, res) => {
  res.set('Content-Type', 'json');
  res.sendFile(path.join(__dirname, '.well-known/apple-app-site-association'));
});

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`)
})
