const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './LDI'
});

const Weapon = sequelize.define('Weapon', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dps: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const Pizza = sequelize.define('Pizza', {
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
});

const Turtle = sequelize.define('Turtle', {
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
});


sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);

    Weapon.create({ name: 'Sword', dps: 100 });
    Weapon.create({ name: 'Riffle', dps: 999 });
    Pizza.create({ name: 'Margherita', calories: 250 });
    Pizza.create({ name: 'Hawaii', calories: 473 })
    Pizza.create({ name: 'Runch', calories: 376 })
    Turtle.create({ name: 'Leonardo', color: 'Blue', weaponId: 1, favoritePizzaId: 1, secondFavoritePizzaId: 1, image: 'leonardo.png' });
    Turtle.create({ name: 'Raffael', color: 'Red', weaponId: 2, favoritePizzaId: 2, secondFavoritePizzaId: 3, image: 'raf.png' });
  });
