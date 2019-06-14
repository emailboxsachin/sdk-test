/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function BreathehrPlugin(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

BreathehrPlugin.prototype.getInstallationIdsForBreatheConfigured = function() {
    var self = this;
    var config = self.config;
    var apiPath = 'configured/breathehr';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'plugin-breathe-hr')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            reject(e);
        });
    });
};

module.exports = BreathehrPlugin;