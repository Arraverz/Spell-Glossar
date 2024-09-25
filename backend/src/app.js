require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const { sequelize } = require('./models')
const config = require('./config')

const app = express()

app.use(helmet())
app.use(morgan('combined'))
app.use(express.json({limit: '15mb'}))
app.use(cors())

require('./routes')(app)

sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`listening at http://localhost:${config.port}`)
  })
})
