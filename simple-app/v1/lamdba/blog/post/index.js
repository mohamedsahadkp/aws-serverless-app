console.log('-------BlogApp Signup Module---------');

var AWS = require('aws-sdk');
var bcrypt = require('bcryptjs');
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

exports.handler = function(event, context) { 
    globalContext = context;  
    validate(event, function(data){
        if(data) {
            insertUserInfo(event, function(data) {
                if(data) {
                    globalContext.succeed(success("Your blog posted successfully ", 200, null));
                }
            });
        }
    });
};

function validate(event, callback) {
    var reqBody = event;
    
    if(!reqBody.blogHeading)
        globalContext.succeed(failure('Blog heading is required', 400));
    else if(!reqBody.blogContent) 
        globalContext.succeed(failure('Blog content is required', 400));
    else
        callback(true);
}

function newBlog(event, callback) {
    var tableName = "BlogAppBlog";
    var blogHeading = event.blogHeading;
    var blogContent = event.blogContent;
    var userId = "";
    var userEmail = "";
    var userName = "";
   
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "userId" : { "S" : uuidV1() },
            "blogHeading": { "S": userName.toString() },
            "blogContent": { "N": userMobile.toString() },
            "userEmail": { "S": userEmail.toString() },
            "userName": { "S": hash.toString() },
            "date": {"N": ""},
            "status": { "BOOL": true },
        }
    }, function(err, data) {
        if (err) {
            console.log("Error :: Blog Post :: newBlog :: " + err)
            globalContext.done(failure('Internal server error, Please try later', 500));
        } else {
            console.log("Success :: Blog Post :: newBlog :: + %j", data)
            callback(true);
        }
    });
}