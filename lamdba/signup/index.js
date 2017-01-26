console.log('-------Signup Module---------');

var AWS = require('aws-sdk');
var bcrypt = require('bcryptjs');
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

exports.handler = function(event, context) {   
    validate(event, function(data){
        if(data) {
            insertUserInfo(event, function(data) {
                if(data) {
                    insertLoginInfo(event, function(data){
                        if(data) {
                            context.succeed("You have signed up successfully", 200);
                        }
                    });
                }
            });
        }
    });
};

function validate(event, callback) {
    var reqBody = event;
    
    if(!reqBody.name)
        context.done(failure('Name is required', 400));
    else if(!reqBody.mobile) 
        context.done(failure('Mobile is required', 400));
    else if(!reqBody.email)
        context.done(failure('Email is required', 400));
    else if(!reqBody.password)
        context.done(failure('Password is required', 400));
    else
        callback(true);
}

function insertUserInfo(event, callback) {
    var tableName = "User";
    var userName = event.name;
    var userMobile = event.mobile;
  
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "name": { "S": userEmail.toString() },
            "mobile": { "N": mobile.toString() },
            "isVerified": { "S": true },
            "status": { "S": true },
        }
    }, function(err, data) {
        if (err) {
            console.log("Error :: Signup :: insertUserInfo :: " + err)
            context.done(failure('Internal server error, Please try later', 500));
        } else {
            console.log("Success :: Signup :: insertUserInfo :: + %j", data)
            callback(true);
        }
    });
}

function insertLoginInfo(event, callback) {
    var tableName = "Login";
    
    var userEmail=event.email;
    var userPassword=event.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(userPassword, salt);
    
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "email": { "S": userEmail.toString() },
            "password": { "S": hash.toString() },
            "isAdmin": { "S": false },
            "status": { "S": true },
        }
    }, function(err, data) {
        if (err) {
            console.log("Error :: Signup :: insertLoginInfo :: " + err)
            context.done(failure('Internal server error, Please try later', 500));
        } else {
            console.log("Success :: Signup :: insertLoginInfo :: + %j", data)
            callback(true);
        }
    });
}