console.log('-------blog post module---------');

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

    var blogHeadLine = event.headLine;
    var blogText = event.text;
    var blogPublishDate = event.publishedDate
    var blogAuthor = event.userID
    
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "headLine": { "S": blogHeadLine.toString() },
            "text": { "S": blogText.toString() },
            "publishedDate": { "N": blogPublishDate.toString() },
            "author": { "S": blogAuthor.toString() },
        }
    }, function(err, data) {
        if (err) {
            console.log("Error :: Blog Post :: index :: " + err)
            context.done(failure('Internal server error, Please try later', 500));
        } else {
            console.log("Success :: Blog Post :: index :: " + data)
            context.succeed(success('Successfully published your post', 200, null));    
        }
    });
};

function validate(event, callback) {
    var reqBody = event;
    
    if(!reqBody.headLine)
        context.done(failure('Blog head line is required', 400));
    else if(!reqBody.text) 
        context.done(failure('Blog body is required', 400));
    else if(!reqBody.userID)
        context.done(failure('Publisher is required', 400));
    else
        callback(true);
}