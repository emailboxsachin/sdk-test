/*jshint -W079 */
var Promise = require('bluebird'),
    r = require('hg-base').RestConnector;

function Roles(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

Roles.prototype.addRoleToCompany = function(companyId, dataToPost, userId, userType) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/roles';

    return new Promise(function(fulfill, reject) {
        self.rest.set_headers(config.api.userType, userType);
        self.rest.set_headers(config.api.companyId, companyId);
        self.rest.set_headers(config.api.userId, userId);

        self.rest.call_api('POST', apiPath, dataToPost, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                console.log(errMessage);
                reject(errMessage);
            });
    });
};

Roles.prototype.updateRole = function(roleId, companyId, dataToPost, userId, userType) {
    var self = this;
    var config = self.config;
    var apiPath = 'roles/' + roleId;

    return new Promise(function(fulfill, reject) {
        self.rest.set_headers(config.api.userType, userType);
        self.rest.set_headers(config.api.companyId, companyId);
        self.rest.set_headers(config.api.userId, userId);

        self.rest.call_api('PUT', apiPath, dataToPost, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                console.log(errMessage);
                reject(errMessage);
            });
    });
};

Roles.prototype.getAllInternalRoles = function(companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'roles/internal';

    return new Promise(function(fulfill, reject) {
        self.rest.set_headers(config.api.companyId, companyId);
        self.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Roles.prototype.getRole = function(id_or_name) {
    var self = this;
    var apiPath = 'roles/' + id_or_name;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Roles.prototype.getRoleTypeOfUser = function(userId) {
    var self = this;
    var apiPath = 'roles/users/role_type';

    return new Promise(function(fulfill, reject) {
        self.rest.set_headers(config.api.userId, userId);
        self.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};


module.exports = Roles;