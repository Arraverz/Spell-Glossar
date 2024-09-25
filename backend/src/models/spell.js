const User = require("./user")


module.exports = (sequelize, DataTypes) => {
  const Spell = sequelize.define('Spell', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    range: {
      type: DataTypes.STRING,
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    castTime: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.JSON,
    },
    components: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    attackSave: {
      type: DataTypes.STRING,
    },
    system: {
      type: DataTypes.STRING,
    },
    book: {
      type: DataTypes.STRING,
    },
    effect: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  Spell.associate = function (models) {
    Spell.belongsToMany(models.User, { through: 'Favorite', as: 'favoriteOf' })
  }
  return Spell
}
