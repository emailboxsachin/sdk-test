/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Interviews(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

Interviews.prototype.createInterview = function(data, companyId, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'interview';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Interviews.prototype.updateInterview = function(data, id, companyId, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'interview/' + id;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Interviews.prototype.getInterviewDetails = function(interviewId, companyId, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'interviews/' + interviewId;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Interviews.prototype.getAllInterviews = function(companyId, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'interviews/all';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Interviews.prototype.getInterviewDetailsByUniqueId = function(id, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'interview/unique/' + id;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Interviews.prototype.acceptInterviewForCandidate = function(id, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'interview/accept/' + id;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('PUT', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Interviews.prototype.getInterviewTimeSlots = function(id, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'interview/timeslots/' + id;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Interviews.prototype.scheduleSelfServiceInterview = function(id, postdata, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'interview/schedule/' + id;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, postdata, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Interviews;