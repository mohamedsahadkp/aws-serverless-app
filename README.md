# Serverless App (ayablogger)
A simple blog appplication build using serverless architecture. 
For serverless architecture we used aws s3, lambda, api-gateway and dynamodb 

# Architecture of Serverless Blog App
![alt tag](https://raw.githubusercontent.com/mohamedsahadkp/serverless/master/resource/architecture.jpg)


#### auth0
auth0 is managed Authentication servers.
Using auth0 we authenticate and authorize our app and APIs with any identity provider running on any stack any device or cloud.

We implemented login with google and facebook option with the help auth0.

#### AWS S3
Amazon S3 is object storage service to store and retrieve any amount of data from anywhere on the web

We can host a static website on Amazon S3. On a static website, individual web pages include static content. 
They may also contain client-side scripts.

This app front is completely built using angularjs and pushed S3.

#### AWS APIGateway
Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale
ayablogger app use APIGateway manage all API.

APIGateway will trigger lamdba function when a API request came.

#### AWS Lambda
AWS Lambda lets you run code without provisioning or managing servers. With Lambda, you can run code for virtually any type of application or backend service. 
Just upload your code and Lambda takes care of everything required to run and scale your code with high availability.

We implemented backend service in nodejs and pushed AWS Lambda.

#### AWS Dynamodb
Amazon DynamoDB is database we are using.
DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.
