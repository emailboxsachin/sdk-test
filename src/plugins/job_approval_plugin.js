/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function jobApprovalPlugin(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

jobApprovalPlugin.prototype.getApproverDetailsforNode = function(data, req) {
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', `admin-settings`, data, 'plugin-job-approval-process')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            reject(e);
        });
    });
};

jobApprovalPlugin.prototype.getApprovalDetailsforJobs = function(data, req) {
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', `jobs/approvals`, data, 'plugin-job-approval-process')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            reject(e);
        });
    });
};

jobApprovalPlugin.prototype.processApproval = function(id, userId, req) {
    const self = this;
    const config = self.config;
    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('GET', `process/${id}?internal=true`, {}, 'plugin-job-approval-process')
        .then(function (records) {
            fulfill(records.body);
        })
        .catch(function(e) {
            reject(e);
        });
    });
};

module.exports = jobApprovalPlugin;