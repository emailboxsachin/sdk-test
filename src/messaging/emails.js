/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Emails(config, log) {
    var self = this;
    self.config = config;
    self.log = self.log;
    self.rest = new r(config, log);
}

Emails.prototype.getEmailTemplate = function(key, companyId) {
    var self = this;
    var config = self.config;

    var apiPath = 'emails/' + key + '/templates/';

    var dataToPost = null;

    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        if (companyId !== undefined) {
            newRest.set_headers(config.api.companyId, companyId);
        }
        newRest.call_api('GET', apiPath, {}, 'messaging')
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

Emails.prototype.getEmailTemplateForCompanies = function(key, data, req) {
    var self = this;
    var config = self.config;

    var apiPath = 'emails/' + key + '/templates/';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'messaging')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response ? e.response.headers[config.api.messageKey] : e;
                reject(errMessage);
            });
    });
};

Emails.prototype.getAllEmailTemplateKeys = function() {
    var self = this;
    var config = self.config;

    var apiPath = 'emails/templates/keys';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'messaging')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });

};

Emails.prototype.addCompanyTemplate = function(data, req) {
    var self = this;
    var config = self.config;

    var apiPath = 'emails/templates';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'messaging')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });

};

Emails.prototype.updateCompanyTemplate = function(key, data, req) {
    var self = this;
    var config = self.config;

    var apiPath = 'emails/templates/' + key;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'messaging')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Emails.prototype.deleteCompanyTemplate = function(key, req) {
    var self = this;
    var config = self.config;

    var apiPath = 'emails/templates/' + key;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('DELETE', apiPath, {}, 'messaging')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Emails.prototype.getEmailTemplatesFromType = function(emailTypeId, companyId, req) {
    var self = this;
    var config = self.config;

    var apiPath = 'emails/type/templates/' + emailTypeId;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'messaging')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Emails.prototype.getAllEmailTemplateTypes = function(req) {
    var self = this;
    var config = self.config;

    var apiPath = 'emails/types/all';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'messaging')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Emails.prototype.getMultipleTemplate = function(defaultTemplateKeys, customTemplateKeys, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'emails/templates/multiple';
    var data = {
        "default_template_keys": defaultTemplateKeys,
        "custom_template_keys": customTemplateKeys
    };

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, data, 'messaging')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

module.exports = Emails;