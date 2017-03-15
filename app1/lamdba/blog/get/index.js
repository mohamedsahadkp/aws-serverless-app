console.log('-------blog get module---------');

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
    var tableName = "Blog";

   var params = {
        AttributesToGet: [
            "blogID", "headLine", "text", "publishedDate", "userID"
        ],
        TableName : tableName,
        Key : { 
            "email" : {
                "S" : userEmail.toString()
            }
        }
    }

    dynamodb.getItem(params, function(err, data) {
        if (err) {
            console.log("Error :: Blog Get :: index :: " + err)
            context.done(failure('Internal server error, Please try later', 500));
        } else {
            console.log("Success :: Blog Get :: index :: " + data)
            publisherUserName(data.userID, function(data) {
                context.succeed(success("Successfully load all blog post", 200, data));
            });
        }
    });
};

function publisherUserName(userID, calllback) {
    var tableName = "User";

   var params = {
        AttributesToGet: [
            "Name"
        ],
        TableName : tableName,
        Key : { 
            "email" : {
                "S" : userID.toString()
            }
        }
    }

    dynamodb.getItem(params, function(err, data) {
        if (err) {
            //console.log("Error :: Blog Get :: publisherUserName :: " + err)
            context.done(failure('Internal server error, Please try later', 500));
        } else {
            //console.log("Success :: Blog Get :: publisherUserName :: " + data)
            calllback(data);
        }
    });
}
