const express = require("express");
const server = express();
const port = 3000;

// Exercise 1. Be Polite, Greet the User
server.get("/greetings/:name", (req, res) => {
    res.send(`<h1>Hello there, ${req.params.name}!</h1>
    </br>
    <h2>What a delight it is to see you once more, ${req.params.name}</h2>`);
});

// Exercise 2. Rolling the Dice

server.get('/roll/:num', (req, res) => {
    const numParam = req.params.num;
    if (isNaN(numParam)) {
        res.send('<h1>You must specify a number.</h1>');
    } else {
        const result = Math.floor(Math.random() * numParam) + 1;
        res.send(`<h1>You rolled a ${result}.</h1>`);
    }
});

// Exercise 3. I Want THAT One!

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];


server.get('/collectibles/:index', (req, res) => {
    const i = req.params.index;
    if (i < 0 || i > collectibles.length) {
        res.send('<h1>This item is not yet in stock. Check back soon.</h1>');
    } else {
        res.send(`<h1>So, you want the ${collectibles[i].name}? For ${collectibles[i].price}, it can be yours!</h1>`);
    }
});

//4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

server.get('/shoes', (req, res) => {
    let {minprice,maxprice,type} = req.query;
    let filterShoes = shoes;
    if (minprice) {
        filterShoes = filterShoes.filter(shoe => shoe.price >= minprice);
    }
    if (maxprice) {
        filterShoes = filterShoes.filter(shoe => shoe.price <= maxprice);
    }
    if (type) {
        filterShoes = filterShoes.filter(shoe => shoe.type === type);
    }
    const returnedValues = filterShoes.map(shoe => ` ${shoe.name} - ${shoe.type} - $${shoe.price} `)
    res.send(`<h1>${returnedValues}</h1>`);
});


server.listen(port, () => {
    console.log(`server listening port ${port}`);
})