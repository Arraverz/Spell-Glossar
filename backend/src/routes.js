const AuthController = require('./controllers/AuthController')
const SpellController = require('./controllers/SpellController')
const UserController = require('./controllers/UserController')

module.exports = (app) => {
  app.get('/test', (req, res) => {
    return res.send({ message: 'test' })
  })
  app.get('/', (req, res) => {
    res.send('asdasdasd')
  })
  app.post('/register', UserController.create)
  app.get('/spells', SpellController.page)
  app.post('/spells/create', SpellController.create)
  app.post('/spells/create/bulk', SpellController.createBulk)
  app.post('/spells/save', SpellController.save)
  app.post('/spells/destroy', SpellController.destroy)
  app.get('/spells/get', SpellController.get)
}
