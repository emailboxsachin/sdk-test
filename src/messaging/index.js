// function MessagingProxy() {
// }

// MessagingProxy.emails = require('./emails');

// module.exports = MessagingProxy;

function MessagingProxy() {
}

MessagingProxy.sqs = require('./sqsMessaging');

module.exports = MessagingProxy;