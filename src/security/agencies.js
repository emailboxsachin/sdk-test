/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Agencies(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

Agencies.prototype.createAgencyUser = function(data) {
    var self = this;
    var apiPath = 'agencies/users';
    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Agencies.prototype.validateAgencyUser = function(data) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/validateuser';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, 'security')
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

Agencies.prototype.updateAgencyUser = function(agencyId, dataToPut) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/users/' + agencyId;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, dataToPut, 'security')
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

Agencies.prototype.getAgencyUser = function(agencyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/users/' + agencyId;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'security')
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

Agencies.prototype.forgotPasswordValidate = function(emailId) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/forgotpassword/validate/' + emailId;    

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

Agencies.prototype.validateResetPasswordLink = function(link) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/resetpassword/' + link;    

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


module.exports = Agencies;