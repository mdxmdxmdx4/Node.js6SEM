module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const Weapon = sequelize.define('Weapon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    dps: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'weapons',
    timestamps: true
  });

  return Weapon;
};
