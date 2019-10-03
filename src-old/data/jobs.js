/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Jobs(config, log) {
    var self = this;
    self.config = config;
    self.rest = new r(config, log);
}

Jobs.prototype.getJobByNumber = function(jobNumber, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/bynumber/' + jobNumber;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
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

Jobs.prototype.getSEOUrlByJobNumber = function(jobNumber, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/seourl/' + jobNumber;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
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

Jobs.prototype.getJobsReportingData = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'reporting_data/jobs';

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

Jobs.prototype.triggerJobCenterUpload = function(jobId, dataToPut, companyId, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/jobcenter/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('PUT', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.listJobsByCompanyId = function(companyId, additionalParams, req) {

    var self = this;
    var config = self.config;
    var paginationParams = '?page_no=' + additionalParams.page_no + '&per_page=' + additionalParams.per_page;
    var apiPath = 'jobs/publishedJobs' + paginationParams;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
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

Jobs.prototype.updateJob = function(jobId, dataToPut, companyId, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('PUT', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.getJobById = function(jobId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/' + jobId;

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

Jobs.prototype.getReports = function(report, companyId, statustype, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/reports/' + report;
    if (statustype !== '') {
        apiPath += '/' + statustype;
    }

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
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

Jobs.prototype.listJobsOnStatus = function(status, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/status/' + status;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
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

Jobs.prototype.getIndeedFeed = function(source) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/xmlfeed/source';
    if (source) {
        apiPath += '?source=' + source;
    }

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

Jobs.prototype.bulkDeleteJob = function(data, companyId, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/bulk/delete';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('DELETE', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Jobs.prototype.releaseToEWR = function(companyId, dataToPut, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/releaseToEWR';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Jobs.prototype.globalUnpublish = function(companyId, id, dataToPut, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/unpublish/global/' + id;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('PUT', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Jobs.prototype.storeVacancyPosterResponse = function(jobId, dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/vpcallback/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.addFormBuilderDataToJob = function(data) {
    var self = this;
    var apiPath = 'formbuilder/job/';

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

Jobs.prototype.addJobByVAF = function(companyId, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId + '/jobs/vaf';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('POST', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.updateJobHistory = function(id, data) {
    var self = this;
    var config = self.config;
    var apiPath = 'approval/history/' + id;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.insertJobApprovalHistory = function(jobId) {
    var self = this;
    var config = self.config;
    var apiPath = 'approval/history/' + jobId;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.getJobApprovalHistory = function(jobId) {
    var self = this;
    var config = self.config;
    var apiPath = 'approval/history/' + jobId;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.publishToSocialMedia = function(site, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/publish/social/' + site;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.checkUserIsHMForJobs = function(userId, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/user/check/' + userId;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('PUT', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.getAllSubclientsJobs = function(companyId, showParentJob, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'multiclient/jobs/' + companyId;
    if (showParentJob === 'true') {
        apiPath = apiPath + '?showParentJob=' + showParentJob;
    }
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.getPreDraftJobsByUser = function(req) {
    var self = this;
    var config = self.config;
    var paginationParams = '?page_no=' + req.param('page_no') + '&per_page=' + req.param('per_page');
    var apiPath = 'jobs/user' + paginationParams;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Jobs.prototype.getJobsForUser = function(req, userId) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/users/' + userId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Jobs.prototype.bulkUpdateJob = function(req, dataToPost, companyId, userId) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/bulk/update';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        if(userId){
            req.rest.set_headers(config.api.userId, userId);
        }
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

Jobs.prototype.createJob = function(companyId, dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId + '/jobs';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Jobs.prototype.deleteJob = function(jobId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('DELETE', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};
Jobs.prototype.getJobStatuses = function() {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/statuses';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Jobs.prototype.createAutoTagSetting = function(data, req) {
    var self = this;
    var apiPath = 'job/auto/tag';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Jobs.prototype.getAutoTagSettingByJobId = function(jobId, req) {
    var self = this;
    var apiPath = 'job/auto/tag/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Jobs.prototype.deleteAutoTagSettingById = function(jobId, req) {
    var self = this;
    var apiPath = 'job/auto/tag/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('DELETE', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Jobs.prototype.releaseToReed = function(data, req) {
    var self = this;
    var apiPath = 'jobs/releaseToReed';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Jobs.prototype.releaseToTotalJobs = function(companyId, dataToPut, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/totalJobs/release';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Jobs.prototype.withdrawFromTotalJobs = function(companyId, dataToPut, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/totalJobs/withdraw';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Jobs.prototype.updateOnTotalJobs = function(companyId, dataToPut, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/totalJobs/update';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Jobs.prototype.refreshOnTotalJobs = function(companyId, dataToPut, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/totalJobs/refresh';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Jobs.prototype.unpublishFromReed = function(jobId, data, req) {
    var self = this;
    var apiPath = 'jobs/unpublish/reed/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};


Jobs.prototype.mutipleJobsUnpublish = function(dataToPut, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/mutiple/unpublish';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Jobs.prototype.releaseToTotalJobsGroup = function(companyId, dataToPut, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/tjg/release';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Jobs.prototype.releaseToJobSiteGroup = function(companyId, dataToPut, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/jsg/release';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, dataToPut, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};
Jobs.prototype.getCVlibData = function(req, res) {
    var apiPath = 'jobs/cvLibrary/data';
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
Jobs.prototype.releaseToCVLib = function(data, req) {
    var self = this;
    var apiPath = 'jobs/cvLibrary/release';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Jobs.prototype.unpublishFromCVLib = function(jobId, data, req) {
    var self = this;
    var apiPath = 'jobs/unpublish/cvLibrary/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Jobs.prototype.getIndeedApplyQuestions = function(jobId, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'jobs/indeedApply/questions/' + jobId;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Jobs;