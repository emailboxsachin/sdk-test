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

SQSMessaging.prototype.createQueue = function(){
    var params = {
        QueueName: process.env.QUEUENAME,
        Attributes: {
          'DelaySeconds': process.env.DELAYSECONDS,
          'MessageRetentionPeriod': process.env.MESSAGERETENTIONPERIOD
        }
    }; 
    return new Promise(function(fulfill, reject) {
        sqs.createQueue(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                reject(err);
            } else {
                fulfill(data);
                console.log("Success", data.QueueUrl);
            }
        });
    })
}

module.exports = SQSMessaging;



