/*function StorageProxy() {
}

StorageProxy.files = require('./files');

module.exports = StorageProxy;
*/

function MessagingProxy() {
}

MessagingProxy.sqs = require('./sqsMessaging');

module.exports = MessagingProxy;
