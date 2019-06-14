/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function ReportingPlugin(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

ReportingPlugin.prototype.generateCompanyReport = function(companyId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'charts/' + companyId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'plugin-reporting')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

module.exports = ReportingPlugin;