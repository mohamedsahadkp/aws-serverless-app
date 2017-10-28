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
                    globalContext.succeed(success("You have signed up successfully", 200, null));
                }
            });
        }
    });
};

function validate(event, callback) {
    var reqBody = event;
    
    if(!reqBody.name)
        globalContext.succeed(failure('Name is required', 400));
    else if(!reqBody.mobile) 
        globalContext.succeed(failure('Mobile is required', 400));
    else if(!reqBody.email)
        globalContext.succeed(failure('Email is required', 400));
    else if(!reqBody.password)
        globalContext.succeed(failure('Password is required', 400));
    else
        callback(true);
}

function insertUserInfo(event, callback) {
    var tableName = "BlogAppUser";
    var userName = event.name;
    var userMobile = event.mobile;
    var userEmail = event.email;
    var userPassword = event.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(userPassword, salt);
  
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "userId" : { "S" : uuidV1() },
            "name": { "S": userName.toString() },
            "mobile": { "N": userMobile.toString() },
            "email": { "S": userEmail.toString() },
            "password": { "S": hash.toString() },
            "isVerified": { "BOOL": true },
            "status": { "BOOL": true },
        }
    }, function(err, data) {
        if (err) {
            console.log("Error :: Signup :: insertUserInfo :: " + err)
            globalContext.done(failure('Internal server error, Please try later', 500));
        } else {
            console.log("Success :: Signup :: insertUserInfo :: + %j", data)
            callback(true);
        }
    });
}