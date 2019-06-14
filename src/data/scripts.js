/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Scripts(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

Scripts.prototype.updateBulkLicenses = function(companies) {
    var self = this;
    var config = self.config;
    var apiPath = 'bulk/licenses';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, companies, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Scripts.prototype.updateEsTagMigrationFlag = function(data, service) {
    var self = this;
    var config = self.config;
    var apiPath = 'update/esTagFlag';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, service)
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Scripts;