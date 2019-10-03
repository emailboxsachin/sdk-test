function MessagingProxy() {
}

MessagingProxy.sqs = require('./sqsMessaging');

module.exports = MessagingProxy;