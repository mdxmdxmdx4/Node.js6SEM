CREATE TABLE weapons (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    dps INTEGER NOT NULL
);

CREATE TABLE pizzas (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    calories DOUBLE NOT NULL
);

CREATE TABLE turtles (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    weaponId INTEGER REFERENCES weapons(id),
    favoritePizzaId INTEGER REFERENCES pizzas(id),
    secondFavoritePizzaId INTEGER REFERENCES pizzas(id),
    image TEXT NOT NULL
);

ALTER TABLE pizzas ADD COLUMN description TEXT;

