console.log('-------BlogApp Auth Module---------');

var jwt = require('jsonwebtoken');
var config = require('./config.json');

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'}); 

var failure = function(message, code) {
    return ({
        status: 0,
        message: message.toString(),
        code: code,
        data: null
    });
};

exports.handler = function(event, context) {   

    var bearerToken = event.authorizationToken;
    if (!bearerToken)
        context.succeed(failure('Invalid Authentication Token', 403));

    var bearer = bearerToken.split(' ')[0].toLowerCase();
    var token = bearerToken.split(' ')[1];

    if (bearer != 'bearer' || !token)
        context.succeed(failure('Invalid Authentication Token', 403));

    // verifies secret and checks exp
    jwt.verify(token, config.security.secretKey, function(err, decoded) {
        if (err) {
            console.log("Error :: Auth :: handler - jwt :: " + err)
            context.succeed(failure('We cannot authenticate with this token', 403));
        } else {

             var tableName = "BlogAppUser";
             var params = {
                AttributesToGet: [
                    "name"
                ],
                TableName : tableName,
                Key : { 
                    "email" : {
                        "S" : decoded.userEmail.toString()
                    }
                }
            }

            dynamodb.getItem(params, function(err, data) {
                if (err) {
                    console.log("Error :: Auth :: handler - dynamodb :: " + err)
                    context.succeed(failure('Internal server error, Please try again', 500));
                } 
                else {
                    userName = user.Item.name['S'].toString();
                    authResponse.context = {};
                    authResponse.context.userId = decoded.userId;
                    authResponse.context.userName = userName;
                    authResponse.context.userEmail = decoded.userEmail;
                    context.succeed(authResponse);
                }
            });
        }
    });
};