console.log('-------BlogApp Login Module---------');

var AWS = require('aws-sdk');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
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

var globalContext = null;
var userDetails = null;

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

function fetchUser(event, callback) {
    var tableName = "BlogAppUser";
    
    var userEmail = event.email;
    var userVPassword = event.password;
    
    var params = {
    TableName: tableName,
        Key:{
            "email" : {
                "S" : userEmail.toString()
            }
        }
    };

    dynamodb.getItem(params, function(err, user) {
        if (err) {
            console.log("Error :: Login :: fetchUser :: " + err)
            globalContext.succeed(failure('Internal server error, Please try later', 500));
        } 
        else {
            //console.log("Success :: Login :: fetchUser :: + %j", user)
            userDetails = user;
            comparePassword(userVPassword, user, function(data){
                callback(data);
            });
        }
    });
}

function comparePassword(userVPassword, user, callback) {
    bcrypt.compare(userVPassword, user.Item.password['S'].toString(), function(err, isMatch) {
        if (err) {
            console.log("Error :: Login :: comparePassword :: " + err);
            globalContext.succeed(failure('Internal server error, Please try again', 500));
        } else {
            generateToken(isMatch, function(data){
                callback(data);
            });
        }
    });
}

function generateToken(isMatch, callback) {
    userId = userDetails.Item.userId['S'].toString();
    userEmail = userDetails.Item.email['S'].toString();

	 if(isMatch) {
        var token = jwt.sign({
            userId : userId,
            email: userEmail,
            time: new Date().getTime()
            }, config.security.secretKey);

        callback({
            userId: userId,
            email: userEmail,
            token: token
        });
    } else {
        globalContext.succeed(failure("Wrong email or password. Try again.", 401));
    }
}
