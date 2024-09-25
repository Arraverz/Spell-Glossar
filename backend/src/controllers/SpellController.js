const { Op } = require('sequelize')
const { Spell, User } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      let spellData = req.body.spell
      if (spellData.levelString) {
        spellData.level = convertLevelString(spellData.levelString)
      }
      const spell = await Spell.create(spellData)
      return res.send(spell.toJSON())
    } catch (error) {
      console.error(error)
      return res.status(400).send({
        error: JSON.stringify(error),
      })
    }
  },
  async createBulk(req, res) {
    // return res.send(true)
    let spellDatas = req.body.spells
    let spells = []
    for (let i = 0; i < spellDatas.length; i++) {
      const spellData = spellDatas[i]
      if (spellData.levelString) {
        spellData.level = convertLevelString(spellData.levelString)
      }
      const spell = await Spell.create(spellData)
      spells.push(spell)
    }
    return res.send(spells)
  },
  async save(req, res) {
    const id = req.body.spell.id
    if (!id || typeof id !== 'number') {
      return res.status(400).send({
        error:
          'Spell object on request does not contain an id attribute or the id attribute is not of type "number"',
      })
    }
    try {
      await Spell.update(req.body.spell, {
        where: {
          id: id,
        },
      })
      const spell = await Spell.findByPk(id)
      return res.send(spell.toJSON())
    } catch (error) {
      console.error(error)
      return res.status(500).send({ error: JSON.stringify(error) })
    }
  },
  async destroy(req, res) {
    try {
      Spell.destroy({
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
    const limit = req.query.limit || 8
    const page = req.query.page || 1
    const keyword = req.query.keyword || ''
    const query = {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          effect: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          category: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          system: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          book: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    }
    const count = await Spell.count({
      where: query,
    })

    // console.log(limit, page, count)

    var spells = await Spell.findAll({
      limit: limit,
      offset: limit * (page - 1),
      where: query,
      include: [{ model: User, as: 'favoriteOf' }],
    })

    return res.send({
      entries: spells,
      count,
      limit,
      page,
    })
  },
  async get(req, res) {
    const id = req.query.id
    if (!id) {
      return res.status(400).send({
        error: 'Need query parameter "id"',
      })
    }

    const spell = await Spell.findByPk(id)
    if (spell === null) {
      return res.status(404).send({
        error: 'No spell with this id could be found',
      })
    }
    // console.log(spell)
    return res.send(spell.toJSON())
  },
}

function convertLevelString(levelString) {
  var level = {}
  const split = levelString.split(';')
  split.forEach((element) => {
    let singleLevelString = element.trim()
    let tmp = singleLevelString.split(' ')

    if (tmp.length !== 2) return

    const className = tmp[0]
    const classLevel = tmp[1]
    level[className] = Number.parseInt(classLevel)
  })
  return level
}
