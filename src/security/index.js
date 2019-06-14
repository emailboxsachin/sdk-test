function SecurityProxy() {
}

SecurityProxy.rights = require('./rights');
SecurityProxy.users = require('./users');
SecurityProxy.teams = require('./teams');
SecurityProxy.licenses = require('./licenses');
SecurityProxy.roles = require('./roles');
SecurityProxy.groups = require('./groups');
SecurityProxy.agencies = require('./agencies');
SecurityProxy.auth = require('./auth');

module.exports = SecurityProxy;