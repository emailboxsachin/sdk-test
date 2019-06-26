var AWS = require('aws-sdk');
AWS.config.update({region: process.env.REGION});

// Create an SQS service object
var sqs = new AWS.SQS({
    apiVersion: process.env.APIVERSION,
    endpoint: process.env.ENDPOINT + ':' + process.env.SQSPORT
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
                console.log("Error", err);
                reject(err);
            } else {
                fulfill(data)
                console.log("Success", data.MessageId);
            }
        });
    }
}

module.exports = SQSMessaging;



