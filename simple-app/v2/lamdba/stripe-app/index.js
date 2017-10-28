
var stripe = require('stripe')('<stripe-key>');

//Create New Customer. It will return customer_id, please save into db for future transaction 

// stripe.customers.create(
//   { email: 'customer@example.com' },
//   function(err, customer) {
//         console.log(err); // null if no error occurred 
//         console.log(customer); // the created customer object 
//   }
// );

// Add credit card for payment. customer_id is intput
// var customer_id = "cus_AUY96jKi4kaO73";
// stripe.customers.createSource(customer_id, {
//     source: {
//        object: 'card',
//        exp_month: 10,
//        exp_year: 2018,
//        number: '4242 4242 4242 4242',
//        cvc: 100
//     }, function(err, source) {
//       console.log(err); // null if no error occurred 
//       console.log(source); // the created customer object 
//   }
// });

//Make payment. customer_id is intput
// var customer_id = "cus_AUY96jKi4kaO73";
// stripe.charges.create({
//     amount: 1600,
//     currency: 'usd',
//     customer: customer_id
// });

//var stripe = require('stripe')(PLATFORM_SECRET_KEY);
stripe.accounts.create(
  {
    country: "US",
    managed: true
  }
);
