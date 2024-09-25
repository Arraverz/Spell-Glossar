require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3030,
  db: {
    database: process.env.DB_NAME || 'default',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    options: {
      dialect: process.env.DB_DIALECT || 'sqlite',
      host: process.env.DB_HOST || 'localhost',
      storage: './storage/' + (process.env.DB_NAME || 'default') + '.sqlite',
    },
  },
}
