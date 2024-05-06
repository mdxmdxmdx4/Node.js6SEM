module.exports = (sequelize) => {

  const { DataTypes } = require('sequelize');

  const Commit = sequelize.define('Commit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    repoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'repos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    timestamps : false
  });

  return Commit;
};