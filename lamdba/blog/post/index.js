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
    var blogAuthor = event.author
    
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
            context.done(failure('Failed to publish your post', 500));
        } else {
            //console.log('great success: %j',data);
            context.succeed(success('Successfully published your post', 200, null));    
        }
    });
};
