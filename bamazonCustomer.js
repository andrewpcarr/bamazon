var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "BaQaR049!",
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

// var quantity = function() {
//   inquirer.prompt({
//     name: "product",
//     type: "input",
//     message: "How many would you like to purchase?"
//   }).then(function(answer) {
//     var query = "SELECT id, product_name, price FROM products WHERE id = " + answer.product;
//     connection.query(query, function(err, res) {
    
    
//     for (i = 0; i < res.length; i++) {
//         console.log("You've selected: " + res[i].product_name);
//     }
//     quantity();
//     });
//   });
// };

// var multiSearch = function() {
//   var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//   connection.query(query, function(err, res) {
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].artist);
//     }
//     runSearch();
//   });
// };

// var rangeSearch = function() {
//   inquirer.prompt([{
//     name: "start",
//     type: "input",
//     message: "Enter starting position: ",
//     validate: function(value) {
//       if (isNaN(value) === false) {
//         return true;
//       }
//       return false;
//     }
//   }, {
//     name: "end",
//     type: "input",
//     message: "Enter ending position: ",
//     validate: function(value) {
//       if (isNaN(value) === false) {
//         return true;
//       }
//       return false;
//     }
//   }]).then(function(answer) {
//     var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//     connection.query(query, [answer.start, answer.end], function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log("Position: " + res[i].position + " || Song: " + res[i].song
//           + " || Artist: " + res[i].artist + " || Year: " + res[i].year);
//       }
//       runSearch();
//     });
//   });
// };

// var songSearch = function() {
//   inquirer.prompt({
//     name: "song",
//     type: "input",
//     message: "What song would you like to look for?"
//   }).then(function(answer) {
//     console.log(answer.song);
//     connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//       console.log("Position: " + res[0].position + " || Song: " + res[0].song
//         + " || Artist: " + res[0].artist + " || Year: " + res[0].year);
//       runSearch();
//     });
//   });
// };
