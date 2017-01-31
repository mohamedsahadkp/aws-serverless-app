console.log('Loading Contact US');

var AWS = require('aws-sdk');
var jwt = require('jsonwebtoken');
var config = require('config.json')('./config/config.json');

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
    var tableName = "Login";
    
    var userEmail = event.email;
    var userPassword = event.password;
    
    var params = {
        AttributesToGet: [
            "userID", "email", "password"
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
            console.log("Error :: Login :: index :: " + err)
            context.done(failure('Internal server error, Please try later', 500));
        } 
        else {
            console.log(data);
            comparePassword(userPassword, data.password, function(data){
                if(data == true) {
                    generateToken(userEmail, function(data) {
                        context.succeed(success("Successfully logged in", 200, data));
                    });
                } else {
                    context.succeed(failure("Wrong email or password. Try again.",401));
                }
            });
        }
    });
};

function comparePassword(userPassword, candidatePassword, callback) {
    bcrypt.compare(userPassword, candidatePassword, function(err, isMatch) {
        if (err) {
            console.log("Error :: Login :: comparePassword :: " + err);
            context.done(failure('Internal server error, Please try later', 500));
        } else {
            return callback(null, isMatch);
        }
    });
};

function generateToken(userEmail, userID, callback) {
	var token = jwt.sign({
        userID : userID,
		email: userEmail,
		time: new Date().getTime()
	}, config.security.secretKey);

	var op = {
		email: login.email,
	    token: token
	};
    callback(op);
}