console.log('-------BlogApp BlogPost Module---------');

var AWS = require('aws-sdk');
var jwt = require('jsonwebtoken');
var config = require('./config.json');
var uuidV1 = require('uuid/v1');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'}); 

var failure = function(message, code) {
    return ({
        status: 0,
        message: message.toString(),
        code: code,
        data: null
    });
};

var success = function(message, code, results) {
    return ({
        status: 1,
        message: message,
        code: code,
        data: results
    });
};

var globalContext;
var userDetails;

exports.handler = function(event, context) { 
    globalContext = context; 
    console.log("headers" + JSON.stringify(event.headers));

    validate(event, function(data){
        if(data) {
            tokenVerification(event.headers.Authorization, function(data){
                if(data) {
                    newBlog(event, function(data) {
                        if(data) {
                            globalContext.succeed(success("Your blog posted successfully ", 200, null));
                        }
                    });
                }
            })
        }
    });
};

function validate(event, callback) {
    var reqBody = event.body;
    
    if(!event.headers.Authorization)
        globalContext.succeed(failure('Invalid Authentication Token', 403));
    else if(!reqBody.blogContent) 
        globalContext.succeed(failure('Blog content is required', 400));
    else if(!reqBody.blogHeading)
        globalContext.succeed(failure('Blog heading is required', 400));
    else
        callback(true);
}

function newBlog(event, callback) {
    var tableName = "BlogAppBlog";
    var blogHeading = event.body.blogHeading;
    var blogContent = event.body.blogContent;
    var userId = userDetails.userId['S'].toString();
    var userEmail = userDetails.email['S'].toString();
    var userName = userDetails.name['S'].toString();
 
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "BlogId" : { "S" : uuidV1() },
            "blogHeading": { "S": blogHeading },
            "blogContent": { "S": blogContent },
            "userEmail": { "S": userEmail },
            "userName": { "S": userName },
            "userId": {"S" : userId },
            "date": {"S": "Date"},
            "status": { "BOOL": true },
        }
    }, function(err, data) {
        if (err) {
            console.log("Error :: BlogPost :: newBlog :: " + err)
            globalContext.done(failure('Internal server error, Please try later', 500));
        } else {
            console.log("Success :: BlogPost :: newBlog :: + %j", data)
            callback(true);
        }
    });
}

function tokenVerification(bearerToken, callback) {   

    if (!bearerToken)
        globalContext.succeed(failure('Invalid Authentication Token', 403)); 

    var bearer = bearerToken.split(' ')[0].toLowerCase();
    var token = bearerToken.split(' ')[1];
   
    if (bearer != 'bearer' || !token)
        globalContext.succeed(failure('Invalid Authentication Token', 403));

    jwt.verify(token, config.security.secretKey, function(err, decoded) {
        if (err) {
            console.log("Error :: BlogPost :: tokenVerification - jwt :: " + err)
            globalContext.succeed(failure('We cannot authenticate with this token', 403));
        } else {
             console.log(JSON.stringify(decoded));
             var tableName = "BlogAppUser";
             var params = {
                AttributesToGet: [
                    "userId","name","email"
                ],
                TableName : tableName,
                Key : { 
                    "email" : {
                        "S" : decoded.email
                    }
                }
            }

            dynamodb.getItem(params, function(err, data) {
                if (err) {
                    console.log("Error :: BlogPost :: tokenVerification - dynamodb :: " + err)
                    globalContext.succeed(failure('Internal server error, Please try again', 500));
                } else {
                    userDetails = data.Item;
                    callback(true);
                }
            });
        }
    });
}