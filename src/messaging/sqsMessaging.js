var AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

// Create an SQS service object
var sqs = new AWS.SQS({
    apiVersion: process.env.APIVERSION,
    region: process.env.REGION
  });

function SQSMessaging() {
    var self = this;    
}

SQSMessaging.prototype.sendMessage = function(message){
    var params = {
        DelaySeconds: process.env.DELAYSECONDS,
        MessageBody: message,
        QueueUrl: process.env.QUEUEURL
    };
    
    return new Promise(function(fulfill, reject) {
        sqs.sendMessage(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                fulfill(data)
            }
        });
    })
}

module.exports = SQSMessaging;