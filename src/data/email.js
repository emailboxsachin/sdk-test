/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Email(config, log) {
    var self = this;
    self.config = config;
    self.rest = new r(config, log);
}

Email.prototype.sendEmails = function(companyId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'email/send/emails';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Email;
