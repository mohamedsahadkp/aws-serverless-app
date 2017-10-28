console.log('-------BlogApp Login Module---------');

var AWS = require('aws-sdk');
var jwt = require('jsonwebtoken');
var config = require('./config.json');

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

exports.handler = function(event, context) { 
    globalContext = context;
    validate(event, function(data){
        if(data) {
            fetchUser(event, function(data){
                context.succeed(success("Successfully logged in", 200, data));
            });
        } else {
            context.succeed(failure("Cannot authenticate. Try again.", 401));
        }
    });
};

function validate(event, callback) {
    var reqBody = event;
    
    if(!reqBody.email)
        globalContext.succeed(failure('Email is required', 400));
    else if(!reqBody.password)
        globalContext.succeed(failure('Password is required', 400));
    else
        callback(true);
}

function getAllBlogs(event, callback) {  
    var params = {
        TableName : "BlogAppBlog",
        ProjectionExpression: "blogContent, blogHeading, userName"
    };

    dynamodb.scan(params,function (err, data) {
        if (err) {
            console.log("Error :: GetALLBlog :: getAllBlogs :: " + err)
            globalContext.succeed(failure('Unable to fetch blogs', 404));
        } else {
            console.log("Success :: GetALLBlog :: getAllBlogs ::" + JSON.stringify(data));
            var blogsData = [];
            var itemsProcessed = 0;
            data.Items.forEach(function(item) {
                blogsData.push({
                    "blogContent":item.blogContent['S'].toString(),
                    "blogHeading":item.blogHeading['S'].toString(),
                    "author": item.userName['S'].toString()
                });

                itemsProcessed++;
                if(itemsProcessed === data.Items.length) {
                    callback(blogsData);
                }
            });
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