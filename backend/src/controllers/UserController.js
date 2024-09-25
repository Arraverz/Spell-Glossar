const { Spell, User } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create(req.body)
      return res.send(user.toJSON())
    } catch (error) {
      console.error(error)
      return res.status(422).send({
        error: 'Email already in use.',
      })
    }
  },
  async save(req, res) {
    try {
      User.update(req.body, {
        where: {
          id: req.body.id,
        },
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: JSON.stringify(error) })
    }
  },
  async destroy(req, res) {
    try {
      User.destroy({
        where: {
          id: req.body.id,
        },
      })
      res.send({ message: 'OK' })
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: JSON.stringify(error) })
    }
  },
  async page(req, res) {
    const limit = req.query.limit
    const page = req.query.page
    const count = await User.count()

    // console.log(limit, page, count)

    var users = await User.findAll({
      limit: limit,
      offset: limit * (page - 1),
      include: Spell,
    })

    return res.send({
      entries: users,
      count,
      limit,
      page,
    })
  },
}
