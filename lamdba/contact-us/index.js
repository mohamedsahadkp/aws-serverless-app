console.log('Loading Contact US');

var AWS = require('aws-sdk');
/* 
    Here we stored the accessKey, secerateKey config.json file. 
    You can also add  accessKey and secerateKey as Environment variables in lambda another option is
    set Lambda Role that have permssion to access DynamoDB
*/
//var config = require('config.json')('./config/config.json');
// var dynamoDBConfiguration = {
//     "accessKeyId": config.aws.accessKey,
//     "secretAccessKey": config.aws.secerateKey,
//     "region": config.aws.region
// };

// AWS.config.update(dynamoDBConfiguration);
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'}); 

exports.handler = function(event, context) {
    console.log(JSON.stringify(event, null, '  '));
    
    var tableName = "contact-us";
    
    var userName=event.name;
    var userEmail=event.email;
    var userMassage=event.message;
    
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "email": { "S": userName.toString() },
            "name": { "S": userEmail.toString() },
            "message": { "S": userMassage.toString() },
        }
    }, function(err, data) {
        if (err) {
            context.done(err);
        } else {
            console.log('great success: %j',data);
            context.succeed("Record Successfully Inserted");
        }
    });
};