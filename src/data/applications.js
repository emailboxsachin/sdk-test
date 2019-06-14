/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Applications(config, log) {
    var self = this;
    self.config = config;
    self.rest = new r(config, log);
}

Applications.prototype.addApplicationToJob = function(dataToPost, jobId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/' + jobId + '/applications';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                //var errMessage = e.response.headers[config.api.messageKey];

                reject(e);
            });
    });
};

Applications.prototype.getApplication = function(appId, companyId, userId, req) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'applications/' + appId;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.getApplicationsReportingData = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'reporting_data/applications';

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

Applications.prototype.getApplicationByAttachCvId = function(uniqueId, req) {
    var self = this;

    var apiPath = 'applications/attachcvlaterid/' + uniqueId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.updateApplication = function(appId, data, req) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'applications/' + appId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.getIncompleteApplicants = function(data) {
    var self = this;
    var apiPath = 'applications/getincompleteapplicants';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.addFormBuilderDataToApplication = function(data) {
    var self = this;
    var apiPath = 'formbuilder/application/';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.getApplicantJobDetails = function(applicantId) {
    var self = this;
    var apiPath = 'applicantdata/all/' + applicantId;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.getAllApplicationsOfJob = function(jobId, status, req) {
    var self = this;

    if (status === undefined || status === '') {
        status = 'default';
    }

    var apiPath = 'jobs/' + jobId + '/allapplications/' + status;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.getAllConfigRatings = function(req) {
    var self = this;
    var apiPath = 'applications/config/ratings';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.addNewRating = function(data, id, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/' + id + '/rating';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.deleteApplication = function(appId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/' + appId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('DELETE', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.generateApplicantPDF = function(applicationId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/' + applicationId + '/generatepdf';

    var dataToPost = data || {};

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.generateActonomyRecord = function(applicationId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/' + applicationId + '/generateactonomy';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.generateApplicantQAPDF = function(applicationId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/' + applicationId + '/generateqapdf';

    var dataToPost = data || {};

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.writeBulkMailMsgToQueue = function(data, req) {
    var self = this;
    var config = self.config;

    var apiPath = 'applications/bulk/mail';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });

};

Applications.prototype.getLatestApplication = function(candidateId, jobId, req) {
    var self = this;
    var config = self.config;

    var apiPath = 'latest/application/' + candidateId + '/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.checkApplicationExists = function(jobId, candidateId, req, passErrorObj=false) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/exists/' + jobId + '/' + candidateId;
    apiPath += passErrorObj ? "?send_response=true" : "";

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
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

Applications.prototype.getOtherApplicationsCountByAppIds = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/other_applications';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Applications.prototype.createBulkApplications = function(data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/bulk/candidates';

    return new Promise(function(fulfill, reject) {
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

Applications.prototype.changeBulkAppStatus = function(status, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/bulk/status/' + status;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Applications.prototype.getApplicationRatingDetails = function(applicantId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/' + applicantId + '/rating/details';

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

Applications.prototype.getOtherApplicationDetails = function(applicantId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/' + applicantId + '/other_applications_details';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response ? e.response.headers[config.api.messageKey] : e;
                reject(errMessage);
            });
    });
};

Applications.prototype.getJobByApplicationId = function(appId) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'applications/' + appId + '/job';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.getAllApplicantDetails = function(appIds, companyId, req) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'applications/details/all';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, appIds, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.addApplicationScoring = function(appId, jobId, data, req) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'applications/score/' + appId + '/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.getApplicantsNotScored = function(jobId, req) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'applications/not/scored/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.updateBulkApplications = function(data) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'bulk/applications';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.decryptSensitiveData = function(data, id, req) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'decrypt/sensitive/' + id;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.getDecryptedSensitiveFieldsOfEntity = function(entityId, entityType, req) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'decrypt/sensitive_info/' + entityType + '/' + entityId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.updateVsqForApplication = function(data, req) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'applications/jobBoard/vsq';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Applications.prototype.getApplicationDataForFourthHr = function(appId, req) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'fourthhr/applications/' + appId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Applications.prototype.processIndeedApplyApplication = function(data, req) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = 'applications/indeedApply/postProcess';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Applications.prototype.getSpecificFieldsOfApplication = function(data, req) {
    var self = this;
    var log = self.log;
    var config = self.config;
    var apiPath = 'applications/getSpecificFields';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Applications.prototype.updateApplicantStatusAfterEmail = function(data, req) {
    var self = this;
    var log = self.log;
    var config = self.config;
    var apiPath = 'applications/mail/status';
     return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Applications.prototype.changeApplicationStatus = function(appId, data, req) {
    const self = this;
    const apiPath = 'applications/status/' + appId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Applications;
