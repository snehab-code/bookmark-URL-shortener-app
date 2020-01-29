const express = require('express')
const setupDb = require('./config/database')
const router = require('./config/routes')
const app = express()
const port = 3040

setupDb()

app.use(express.json())
app.use('/', router)


app.listen(port, () => {
    console.log('listening on ' + port)
})
