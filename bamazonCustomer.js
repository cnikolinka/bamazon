var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// creates the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    // console.log("Connected as id: "+ connection.threadId);
    if (err) throw err;

});


var start = function() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Stock"],
            colWidths: [5, 25, 25, 8, 5]
        });
        //console.log("result" + results);

        for (var i = 0; i < results.length; i++) {
            table.push([
                results[i].item_id,
                results[i].product_name,
                results[i].department_name,
                results[i].price,
                results[i].stock_quantity
            ]);
        }

 
        console.log(table.toString());

        inquirer.prompt([{
                name: "id",
                type: "input",
                message: "What is the ID # of the product you would like to purchase?",
                validate: function(value) {
                    if (isNaN(value) == false) {
                        return true
                    } else {
                        return false;
                    }
                }
            }, {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function(value) {
                    if (isNaN(value) == false) {
                        return true
                    } else {
                        return false;
                    }
                }
            }

        ]).then(function(answer) {

            var quantity = answer.stock_quantity;
            var itemId = answer.item_id;
            connection.query('SELECT * FROM products WHERE ?', [{
                item_id: itemId
            }], function(err, selectedItem) {

                if (err) throw err;
                if (selectedItem[0].stock_quantity - quantity >= 0) {

                    var orderTotal = quantity * selectedItem[0].price;
                    
                    console.log('We have enough (' + selectedItem[0].product_name + ')!');
                    console.log('Quantity in stock: ' + selectedItem[0].stock_quantity + ' Order quantity: ' + quantity);
                    console.log('You will be charged $' + orderTotal + '. Thank you!');

                    connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [selectedItem[0].stock_quantity - quantity, itemId],
                        function(err, inventory) {
                            if (err) throw err;
                            orderAgain();
                        })
                } else {
                    console.log('Insufficient quantity.  Please adjust your order, we only have ' + selectedItem[0].stock_quantity + ' ' + selectedItem[0].product_name + 'in stock.');
                    orderAgain();
                }
            });
        });
    });
}

var orderAgain = function() {
    inquirer.prompt([{
        name: 'orderAgain',
        type: 'list',
        message: 'Would you like to order again?',
        choices: ['Yes', 'No']
    }]).then(function(answer) {
        if (answer.orderAgain === 'Yes') {
            start();
        } else {
            console.log('Thank you, come again!');
            process.exit();
        }
    })
}

start();