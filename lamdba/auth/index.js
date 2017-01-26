console.log('-------auth module---------');

var jwt = require('jsonwebtoken');
var config = require('config.json')('./config/config.json');

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'}); 

exports.handler = function(event, context) {   

    var bearerToken = event.authorizationToken;
    if (!databearerToken)
        context.succeed(failure('Invalid Authentication Token', 403));

    var bearer = bearerToken.split(' ')[0].toLowerCase();
    var token = bearerToken.split(' ')[1];

    if (bearer != 'bearer' || !token)
        context.succeed(failure('Invalid Authentication Token', 403));

    // verifies secret and checks exp
    jwt.verify(token, config.security.secretKey, function(err, decoded) {
        if (err) {
            context.succeed(failure('We cannot authenticate with this token', 403));
        } else {
            //  var params = {
            //     AttributesToGet: [
            //         "email","password"
            //     ],
            //     TableName : tableName,
            //     Key : { 
            //         "email" : {
            //             "S" : userEmail.toString()
            //         }
            //     }
            // }

            // dynamodb.getItem(params, function(err, data) {
            //     if (err) {
            //         context.succeed(failure('Invalid Authentication Token', 403));
            //     } 
            //     else {
            //         console.log(data);
            //     }
            // });
            
            authResponse.context = {};
            authResponse.context.stringKey = decoded.email;
            authResponse.context.numberKey = 123;
            authResponse.context.booleanKey = true;
            context.succeed(authResponse);
        }
    });
};

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