'use strict';
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Search(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

Search.prototype.listAllJobsByCompanyId = function(companyId, req, sortOrder="asc") {

    var self = this;
    var config = self.config;
    var paginationParams = '?m=JOBS&so=' + sortOrder;
    var apiPath = 'searchAllPublishedJobs' + paginationParams;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Search.prototype.listIntranetJobsByCompanyId = function(companyId, req) {

    var self = this;
    var config = self.config;
    var paginationParams = '?m=JOBS';
    var apiPath = 'searchAllIntranetJobs' + paginationParams;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Search.prototype.getJobs = function(req, queryParams) {
    var self = this;
    var config = self.config;
    var apiPath = 'searchJobs' + queryParams;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Search.prototype.getApplicationsCount = function(req, jobId, fromdate, flag) {
    var self = this;
    var config = self.config;
    flag = (undefined !== flag) ? flag : false;
    var apiPath = 'searchApplications' + '/' + jobId + '/count/' + fromdate + '?shortlist_flag=' + flag;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Search.prototype.getApplicationsCountForJobs = function(req, body, fromdate, flag) {
    var self = this;
    var config = self.config;
    flag = (undefined !== flag) ? flag : false;
    var apiPath = 'searchApplications/count/' + fromdate + '?shortlist_flag=' + flag;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, body, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Search.prototype.saveSearch = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'searchSave/get/all';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Search.prototype.getEntitiesData = function(req, params) {
    var self = this;
    var config = self.config;
    var apiPath = 'searchAll' + params;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Search.prototype.searchFields = function(req, params) {
    var self = this;
    var config = self.config;
    var apiPath = 'searchFields' + params;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Search.prototype.searchIds = function(req, params) {
    var self = this;
    var config = self.config;
    var apiPath = 'searchIds' + params;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Search.prototype.searchAdvancedCandidates = function(req, body) {
    var self = this;
    var config = self.config;
    var apiPath = 'searchAdvancedCandidates';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, body, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Search.prototype.getDocumentCount = function(params, companyId) {
    const self = this;
    const apiPath = 'documentCount' + params;
    const restObj = new r(self.config);

    return new Promise(function(fulfill, reject) {
        restObj.set_headers(self.config.api.companyId, companyId);
        restObj.call_api('GET', apiPath, {}, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Search.prototype.getSpecificFields = function(params, companyId) {
    const self = this;
    const apiPath = 'specificFields' + params;
    const restObj = new r(self.config);

    return new Promise(function(fulfill, reject) {
        restObj.set_headers(self.config.api.companyId, companyId);
        restObj.call_api('GET', apiPath, {}, 'search')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Search;