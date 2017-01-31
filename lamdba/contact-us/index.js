console.log('-------blog contact-us module---------');

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'}); 

failure = function(message, code) {
    return ({
        status: 0,
        message: message.toString(),
        code: code,
        data: null
    });
};

success = function(message, code, results) {
    return ({
        status: 1,
        message: message,
        code: code,
        data: results
    });
};

exports.handler = function(event, context) {    
    var tableName = "contact-us";
    
    var userName=event.name;
    var userEmail=event.email;
    var userMassage=event.message;
    
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "email": { "S": userName.toString() },
            "name": { "S": userEmail.toString() },
            "message": { "S": userMassage.toString() },
        }
    }, function(err, data) {
        if (err) {
            console.log("Error :: Blog ContactUS :: index :: " + err)
            context.done(failure('Internal server error, Please try later', 500));
        } else {
            console.log("Success :: Blog ContactUS :: index :: " + data)
            context.succeed(success('Successfully posted your request', 200, null));    
        }
    });
};