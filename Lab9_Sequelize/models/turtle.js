module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const Weapon = require('./Weapon')(sequelize);
  const Pizza = require('./Pizza')(sequelize);

  const Turtle = sequelize.define('Turtle', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weaponId: {
      type: DataTypes.INTEGER,
      references: {
        model: Weapon,
        key: 'id'
      }
    },
    favoritePizzaId: {
      type: DataTypes.INTEGER,
      references: {
        model: Pizza,
        key: 'id'
      }
    },
    secondFavoritePizzaId: {
      type: DataTypes.INTEGER,
      references: {
        model: Pizza,
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'turtles',
    timestamps: true
  });

  Turtle.belongsTo(Weapon, { as: 'weapon', foreignKey: 'weaponId' });
  Weapon.hasMany(Turtle, { as: 'Turtles', foreignKey: 'weaponId' });

  Turtle.belongsTo(Pizza, { as: 'favoritePizza', foreignKey: 'favoritePizzaId' });
  Pizza.hasMany(Turtle, { as: 'Turtles', foreignKey: 'favoritePizzaId' });

  return Turtle;
};
