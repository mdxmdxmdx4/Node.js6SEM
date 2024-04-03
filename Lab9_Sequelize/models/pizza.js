module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const Pizza = sequelize.define('Pizza', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calories: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'pizzas',
    timestamps: true
  });

  return Pizza;
};
