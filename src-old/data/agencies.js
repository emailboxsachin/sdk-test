/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Agencies(config, log) {
    var self = this;
    self.config = config;
    self.log = log;
    self.rest = new r(config, log);
}

Agencies.prototype.signUpAgency = function(companyId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/signup/';

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

Agencies.prototype.listAgenciesForCompany = function(companyId, type, page_no, per_page, req) {
    var self = this;
    var apiPath = 'agencies/list?type=' + type + '&page_no=' + page_no + '&per_page=' + per_page;
    var config = self.config;

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

Agencies.prototype.attachDetachAgencies = function(companyId, setting, userType) {
    var self = this;
    var apiPath = 'agencies/default/' + setting;
    var config = self.config;

    //Temporary fix, this needs to be removed later to use req object from argument list
    var restObj = new r(config, self.log);

    return new Promise(function(fulfill, reject) {
        restObj.set_headers(config.api.companyId, companyId);
        restObj.set_headers(config.api.userType, userType);
        restObj.call_api('PUT', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Agencies.prototype.updateAgencyStatusForCompany = function(companyId, userId, agency_id, data, req) {
    var self = this;
    var apiPath = 'agencies/status/' + agency_id;
    var config = self.config;

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

Agencies.prototype.deleteAgencyLinkForCompany = function(companyId, agency_id) {
    var self = this;
    var apiPath = 'agencies/status/' + agency_id;
    var config = self.config;

    //Temporary fix, this needs to be removed later to use req object from argument list
    var restObj = new r(config, self.log);

    return new Promise(function(fulfill, reject) {
        restObj.set_headers(config.api.companyId, companyId);
        restObj.call_api('DELETE', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Agencies.prototype.getAgencyDetailsById = function(agency_id, companyId, req) {
    var self = this;
    var apiPath = 'agencies/details/' + agency_id;
    var config = self.config;

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

Agencies.prototype.releaseJobsToAgencies = function(data, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/release/jobs';

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

Agencies.prototype.checkAgencyExistsForCompany = function(email, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/company/' + email;

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

Agencies.prototype.getAgencyProfileById = function(agency_id, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/profiles/' + agency_id;

    //Temporary fix, this needs to be removed later to use req object from argument list
    var restObj = new r(config, self.log);

    return new Promise(function(fulfill, reject) {
        restObj.set_headers(config.api.companyId, companyId);
        restObj.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Agencies.prototype.updateAgencyProfileById = function(agency_id, data, user, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/profiles/' + agency_id;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, user);
        req.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Agencies.prototype.withdrawJobsFromAgencies = function(data, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/withdraw/jobs';

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

Agencies.prototype.getAgencyJobList = function(job_id, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/job/list/' + job_id;

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

Agencies.prototype.getJobsForAgency = function(agency_id, page_no, per_page) {
    var self = this;
    var apiPath = 'agencies/job/released/' + agency_id + '?page_no=' + page_no + '&per_page=' + per_page;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Agencies.prototype.getApplicationsForJob = function(agency_id, job_id, page_no, per_page) {
    var self = this;
    var apiPath = 'jobs/' + job_id + '/agencies/applications/' + agency_id + '?page_no=' + page_no + '&per_page=' + per_page;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Agencies.prototype.getCompaniesForAgency = function(agency_id) {
    var self = this;
    var apiPath = 'companies/agencies/' + agency_id;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Agencies.prototype.getMultipleAgencyProfiles = function(agencyIds, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/profiles/mutiple';
    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, agencyIds, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};



module.exports = Agencies;
