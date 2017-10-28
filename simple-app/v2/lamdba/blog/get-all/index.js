console.log('-------BlogApp GetAllBlogs Module---------');

var AWS = require('aws-sdk');
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
    getAllBlogs(event, function(data){
        context.succeed(success("Successfully loaded all blogs", 200, data));
    });
};

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