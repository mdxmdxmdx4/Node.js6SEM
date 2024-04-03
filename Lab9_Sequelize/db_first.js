const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './LDI'
});


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
  timestamps: false
});


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
  timestamps: false
});

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
  timestamps: false
});



Weapon.findAll().then(weapons => console.log(weapons));
Pizza.findAll().then(pizzas => console.log(pizzas));
Turtle.findAll().then(turtles => console.log(turtles));