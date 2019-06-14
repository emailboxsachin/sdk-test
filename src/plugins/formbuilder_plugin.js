/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function FormbuilderPlugin(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

FormbuilderPlugin.prototype.getFormContextByInstallationId = function(installationId) {
    var self = this;
    var config = self.config;
    var apiPath = 'admin-settings/' + installationId;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'plugin-formbuilder')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            var errMessage = (e.response && e.response.headers) ? e.response.headers[config.api.messageKey] : e;
            reject(errMessage);
        });
    });
};

module.exports = FormbuilderPlugin;