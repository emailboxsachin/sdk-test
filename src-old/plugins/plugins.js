/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function Plugins(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

Plugins.prototype.deletePluginById = function(id) {
    var self = this;
    var config = self.config;
    var apiPath = 'plugins/'+id;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('DELETE', apiPath, {}, 'plugin')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            var errMessage = e.response.headers[config.api.messageKey];
            reject(errMessage);
        });
    });
};

Plugins.prototype.getAllPlugins = function() {
    var self = this;
    var config = self.config;
    var apiPath = 'plugins/';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'plugin')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            var errMessage = e.response.headers[config.api.messageKey];
            reject(errMessage);
        });
    });
};

Plugins.prototype.getPluginsByTypeOrId = function(typeOrUuid) {
    var self = this;
    var config = self.config;
    var apiPath = 'plugins/' + typeOrUuid;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'plugin')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            var errMessage = e.response.headers[config.api.messageKey];
            reject(errMessage);
        });
    });
};

Plugins.prototype.getPluginsPublicUrl = function(pluginId) {
    var self = this;
    var config = self.config;
    var apiPath = 'plugins/' + pluginId + '/purl';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'plugin')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            var errMessage = e.response.headers[config.api.messageKey];
            reject(errMessage);
        });
    });
};

Plugins.prototype.createPlugin = function(data) {
    var self = this;
    var config = self.config;
    var apiPath = 'plugins';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, 'plugin')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            var errMessage = e.response.headers[config.api.messageKey];
            reject(errMessage);
        });
    });
};

Plugins.prototype.updatePlugin = function(pluginUuid, data) {
    var self = this;
    var config = self.config;
    var apiPath = 'plugins/' + pluginUuid;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, data, 'plugin')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            var errMessage = e.response.headers[config.api.messageKey];
            reject(errMessage);
        });
    });
};

Plugins.prototype.insertApplicantIntoActonomy = function(data) {
    var self = this;
    var config = self.config;
    var apiPath = 'mbupload';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, 'plugin-matchbase')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            var errMessage = e.response ? e.response.headers[config.api.messageKey] : e;
            reject(errMessage);
        });
    });
};


module.exports = Plugins;