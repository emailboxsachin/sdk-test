/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Candidates(config, log) {
    var self = this;
    self.config = config;
    self.log = log;
    self.rest = new r(config, log);
}

Candidates.prototype.addCandidateForCompany = function(dataToPost, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId + '/candidates';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Candidates.prototype.updateCandidate = function(req, candidateId) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/' + candidateId;

    var dataToPost = req.body;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, dataToPost, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Candidates.prototype.getCandidatesReportingData = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'reporting_data/candidates';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response ? e.response.headers[config.api.messageKey] : e;

                reject(errMessage);
            });
    });
};

Candidates.prototype.getCandidateByEmailId = function(emailId, companyId, passErrorObj=false) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/email/' + emailId;
    //Temporary fix, this needs to be removed later to use req object from argument list
    var restObj = new r(config, self.log);

    return new Promise(function(fulfill, reject) {
        restObj.set_headers(config.api.companyId, companyId);
        restObj.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                if(passErrorObj){
                    reject(e);
                }else{
                    var errMessage = e.response.headers[config.api.messageKey];
                    reject(errMessage);
                }
            });
    });
};

Candidates.prototype.getCandidateById = function(candidateId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/' + candidateId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Candidates.prototype.getCandidateByIds = function(candidateIds, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/multiple/';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, candidateIds, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Candidates.prototype.addCandidatePreference = function(email, data, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/preferences/' + email;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Candidates.prototype.getCandidatePreference = function(link, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/preference/' + link;

    //Temporary fix, this needs to be removed later to use req object from argument list
    var restObj = new r(config, self.log);

    return new Promise(function(fulfill, reject) {
        restObj.set_headers(config.api.companyId, companyId);
        restObj.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Candidates.prototype.deleteCandidatePreference = function(link) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/preference/' + link;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('DELETE', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Candidates.prototype.getMatchingPreferenceCount = function(data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/preferences';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('propfind', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Candidates.prototype.upadteCandidatePreferenceFormBuilder = function(data) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/formbuilder/preference';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Candidates.prototype.getFieldsToMigrate = function() {
    var self = this;
    var config = self.config;
    var apiPath = 'migrate/fields/candidates';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Candidates.prototype.updateBulkCandidates = function(data) {
    var self = this;
    var config = self.config;
    var apiPath = 'bulk/candidates';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Candidates.prototype.deleteCandidate = function(candidateId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/' + candidateId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('DELETE', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Candidates.prototype.addCandidateActivity = function(data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/activity/add';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Candidates.prototype.getCandidateActivity = function(companyId, Id, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'events/activity/' + companyId + '/' + Id;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'reporting')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Candidates.prototype.getAllApplicationsOfCandidate = function(id, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidate/applications/' + id;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Candidates.prototype.getCandidateIdsOfMatchingPreferences = function(data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/preference';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Candidates.prototype.getMultipleCandidateDetailsByIds = function(data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'candidates/multiple/ids';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Candidates;
