const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()
const port = 3000

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/status', (req, res) => {
    res.send({
        message: 'Server is running!'
    })
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})