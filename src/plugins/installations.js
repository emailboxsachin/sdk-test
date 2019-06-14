/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function Installations(config, log) {
    var self = this;
    self.config = config;
    self.rest = new r(config, log);
}

Installations.prototype.getInstallationsByResourceId = function(resourceId) {
    var self = this;
    var config = self.config;
    var apiPath = 'installations/' + resourceId;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'plugin')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Installations.prototype.getInstallationsByResources = function(dataToPost) {
    var self = this;
    var config = self.config;
    var apiPath = 'installations/resources';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, dataToPost, 'plugin')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Installations.prototype.createInstallation = function(req, resourceId) {
    var self = this;
    var config = self.config;
    var apiPath = 'installations/' + resourceId;

    var dataToPost = req.body;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, dataToPost, 'plugin')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Installations.prototype.deleteInstallationById = function(installationId) {
    var self = this;
    var config = self.config;
    var apiPath = 'installations/' + installationId;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('DELETE', apiPath, {}, 'plugin')
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

Installations.prototype.getResourcesFromInstallations = function(installationIds) {
    var self = this;
    var config = self.config;
    var apiPath = 'resource_ids/installations';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, installationIds, 'plugin')
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

Installations.prototype.getUuidInstallations = function(installationIds) {
    var self = this;
    var config = self.config;
    var apiPath = 'uuids/resource_id/installations';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, installationIds, 'plugin')
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

Installations.prototype.bulkUpdateInstallation = function(dataToPost) {
    var self = this;
    var config = self.config;
    var apiPath = 'installations/bulkUpdateInstallation';
    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, dataToPost, 'plugin')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

module.exports = Installations;