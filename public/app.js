// const express = require('express');
// const path = require('path');
// const sqlite3 = require('sqlite3').verbose();
// let sql;

// const app = express();
// const PORT = 3000;

const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

//this is for connecting to the database
const db = new sqlite3.Database("./Monkshop.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});
// const db = new sqlite3.Database("./Monkshop.db", sqlite3.OPEN_READWRITE, (err) => {
//     if (err) return console.error(err.message);
// });

//this is for creating a table
// sql = 'CREATE TABLE climbing_shoes(id INTEGER PRIMARY KEY, name, brand, color, price, fit, shape, aggressive, vegan, closure, climbinglevel, sizes, rubber, image, description)';
// db.run(sql);

//this is for dropping a table
// db.run("DROP TABLE climbing_shoes");

//this is for inserting data into the database
// const shoeData = [
//     ["Instinct VS Dames",	"Scarpa",	"cyan",	169.9,	"narrow",	"Greek",	"aggressive",	"yes",	"velcro",	"expert",	"35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5",	"Vibram XS Grip 2", "images/display/Instinct Vs Dames.webp"],
// ["Tarantula Olive",	"La Sportiva",	"green",	94.9,	"normal",	"Greek, Roman, Egyptian",	"none",	"no",	"velcro",	"beginner",	"34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48",	"FriXion Black", "images/display/Tarantula Olive.webp"],
// ["Hiangle Pro",	"Five Ten",	"black",	159.9,	"narrow",	"Greek",	"aggressive",	"yes",	"velcro",	"intermediate",	"3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5",	"Stealth C4-Rubber", "images/display/Hiangle Pro.webp"],
// ["Niad VCS Heren",	"Five Ten",	"brown",	149.9,	"normal",	"Greek, Egyptian",	"none",	"yes",	"velcro",	"intermediate",	"6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11",	"Stealth C4-Rubber", "images/display/Niad VCS Heren.webp"],
// ["Instinct VSR",	"Scarpa",	"blue",	169.9,	"wide",	"Greek",	"light",	"yes",	"velcro",	"expert",	"37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46",	"Vibram XS Grip 2", "images/display/Instinct VSR.webp"],
// ["Cobra",	"La Sportiva",	"orange",	99.9,	"normal",	"Greek, Roman, Egyptian",	"aggressive",	"no",	"slippers",	"intermediate",	"34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45",	"Vibram XS Grip 2", "images/display/Cobra.webp"],
// ["Python",	"La Sportiva",	"yellow, purple",	129.99,	"normal",	"Greek, Roman, Egyptian",	"light",	"no",	"velcro",	"intermediate",	"34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45",	"Vibram XS Grip 2", "images/display/Python.jpg"],
// ["Reflex V Heren",	"Scarpa",	"black",	109.9,	"normal",	"Greek",	"light",	"yes",	"velcro",	"beginner",	"39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 48", "Scarpa Vision", "images/display/Reflex V Heren.webp"],
// ["Drago",	"Scarpa",	"yellow",	159.9,	"normal",	"Egyptian",	"aggressive",	"yes",	"velcro",	"expert",	"39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5",	"Vibram XS Grip 2", "images/display/Drago.webp"],
// ["Solution Comp",	"La Sportiva",	"yellow",	164.9,	"normal",	"Egyptian",	"aggressive",	"no",	"velcro",	"expert",	"36.5, 38, 38.5, 39, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 37, 37.5, 39.5", "Vibram XS Grip 2", "images/display/Solution Comp.webp"],
// ["Flagship Heren",	"Unparallel",	"red",	169.9,	"normal",	"Greek",	"aggressive",	"yes",	"velcro",	"intermediate",	"38, 39, 39.5, 40, 41, 41.5, 42, 42.5, 43, 44, 44.5, 45, 46",	"Real Supreme, Real Honor", "images/display/Flagship Heren.webp"],
// ["Vapor V Dames",	"Scarpa",	"cyan, pink",	159.9,	"narrow",	"Greek",	"light",	"no",	"velcro",	"intermediate",	"35, 36, 37, 38, 39, 40, 41, 42, 35.5, 36.5, 37.5, 38.5, 39.5, 40.5, 41.5",	"Vibram XS Grip 2", "images/display/Vapor V Dames.webp"],
// ["Quantic Dames",	"Scarpa",	"white",	129.9,	"normal",	"Roman",	"light",	"yes",	"velcro",	"beginner",	"35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5",	"Vibram XS Edge", "images/display/Quantic Dames.webp"],
// ["Niad VCS Dames",	"Five Ten",	"cyan",	149.9,	"normal",	"Greek, Roman, Egyptian",	"light",	"yes",	"velcro",	"beginner",	"4, 5, 6, 7, 3.5, 4.5, 5.5, 6.5, 7.5",	"Stealth C4-Rubber", "images/display/Niad VCS Dames.webp"],
// ["Tn Pro LV Dames",	"Unparallel",	"cyan",	164.9,	"narrow",	"Egyptian",	"aggressive",	"yes",	"velcro",	"expert",	"35, 35.5, 36, 37, 37.5, 38, 39, 39.5, 40, 41, 41.5, 42, 42.5",	"Real Honor", "images/display/Tn Pro LV Dames.webp"],
// ["Vapor V Heren",	"Scarpa",	"yellow, blue",	159.9,	"narrow",	"Greek",	"light",	"no",	"velcro",	"intermediate",	"39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 39.5, 40.5, 41.5, 42.5, 43.5, 44.5, 45.5, 49",	"Vibram XS Edge", "images/display/Vapor V Heren.webp"],
// ["Tn Pro Heren",	"Unparallel",	"orange",	164.9,	"normal",	"Egyptian",	"aggressive",	"yes",	"velcro",	"expert",	"38, 39, 39.5, 40, 41, 41.5, 42, 42.5, 43, 44, 45, 45.5, 46",	"Real Honor", "images/display/Tn Pro Heren.webp"],
// ["Kubo Heren",	"La Sportiva",	"red, green",	139.9,	"normal",	"Greek",	"none",	"yes",	"velcro",	"intermediate",	"39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46",	"Vibram XS Edge", "images/display/Kubo Heren.webp"],
// ["Kubo Dames",	"La Sportiva",	"white, pink, blue",	139.9,	"normal",	"Greek",	"none",	"no",	"velcro",	"intermediate",	"34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5",	"Vibram XS Grip 2", "images/display/Kubo Dames.webp"],
// ["Tarantula Jr",	"La Sportiva",	"yellow",	70,	"normal",	"Greek, Roman, Egyptian",	"none",	"no",	"velcro",	"beginner",	"26, 28, 30, 32, 34",	"FriXion Black", "images/display/Tarantula Jr.webp"],
// ["Instinct VS Heren",	"Scarpa",	"orange",	169.9,	"wide",	"Greek",	"light",	"yes",	"velcro",	"expert",	"35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46",	"Vibram XS Edge", "images/display/Instinct VS Heren.webp"],
// ["Reflex V Kids",	"Scarpa",	"yellow",	69.9,	"normal",	"Greek, Roman, Egyptian",	"none",	"yes",	"velcro",	"beginner",	"28, 29, 33",	"Scarpa Vision", "images/display/Reflex V Kids.jpg"],
// ["Ninja Jr",	"Boreal",	"red",	54.9,	"normal",	"Greek, Roman, Egyptian",	"none",	"no",	"velcro",	"beginner",	"27-28, 29-30, 31-32, 33-34",	"Zenith Quattro", "images/display/Ninja Jr.webp"],
// ["Reflex V Dames",	"Scarpa",	"white",	109.99,	"normal",	"Greek",	"light",	"yes",	"velcro",	"beginner",	"35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5",	"Scarpa Vision", "images/display/Reflex V Dames.webp"],
// ["Flagship LV Dames",	"Unparallel",	"cyan",	169.9,	"narrow",	"Greek",	"aggressive",	"yes",	"velcro",	"intermediate",	"37, 37.5, 38, 39, 39.5, 40",	"Real Supreme, Real Honor", "images/display/Flagship LV Dames.webp"],
// ["Kirigami Dames",	"Five Ten",	"gray",	99.9,	"normal",	"Greek, Roman, Egyptian",	"none",	"yes",	"velcro",	"intermediate",	"4, 5, 6, 3.5, 4.5, 5.5, 6.5, 7",	"Stealth C4-Rubber", "images/display/Kirigami Dames.webp", "images/display/Kirigami Dames.webp"],
// ["Up Rise VCS Heren",	"Unparallel",	"gray",	154.9,	"wide",	"Egyptian",	"none",	"yes",	"velcro",	"intermediate",	"38, 39, 39.5, 40, 41, 41.5, 42, 42.5, 43, 44, 44.5, 45, 46, 47",	"Real Honor", "images/display/Up Rise VCS Heren.webp"],
// ];
// shoeData.forEach(([name, brand, color, price, fit, shape, aggressive, vegan, closure, climbinglevel, sizes, rubber, image]) => {
//     sql = `INSERT INTO climbing_shoes(name, brand, color, price, fit, shape, aggressive, vegan, closure, climbinglevel, sizes, rubber, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//     db.run(sql, [name, brand, color, price, fit, shape, aggressive, vegan, closure, climbinglevel, sizes, rubber, image], (err) => {
//         if (err) return console.error(err.message);
//     });
// });


app.use(express.static(path.join(__dirname, '../')));
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/climbing_shoes', (req, res) => {
    const query = `SELECT id, name, brand, color, price, fit, shape, aggressive, vegan, closure, climbinglevel, sizes, rubber, image, description FROM climbing_shoes`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});