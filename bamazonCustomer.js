var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Up and running!');
  useStore();
});

var useStore = function() {
    connection.query('select id, product_name, price from products', function(err, response) {
        if (err) throw err;
        console.log('WELCOME TO BAMAZON!');
        console.log('======================================');
        console.log('Take a look at out inventory.');
        console.log('ID. Product Name --- Price');
        for (i = 0; i < response.length; i++) {
            console.log(response[i].id + '. ' + response[i].product_name + ' --- ' + response[i].price);
        }
        buyProduct();
    });
};

var buyProduct = function() {
  inquirer.prompt([{
    name: "product",
    type: "input",
    message: "Which product ID are you interested in purchasing?"
  }, {
    name: 'quantity',
    type: 'input',
    message: 'How many would you like to buy?'
  }]).then(function(answer) {
    var quantity = answer.quantity;
    var query = "SELECT id, product_name, price, stock_quantity FROM products WHERE id = " + answer.product;
    connection.query(query, function(err, res) {
        for (i = 0; i < res.length; i++) {
            console.log("You've selected: " + quantity + ' ' + res[i].product_name);
            if (quantity <= res[i].stock_quantity) {
                console.log("======================================");
                console.log("Your items are in stock. Let's head to checkout!")
            } else {
                console.log("I'm sorry. That item is currently out of stock.")
            }
        }
    });
  });
};