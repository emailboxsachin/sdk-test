/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function Workflows(config, log) {
    var self = this;
    self.config = config;
    self.log = log;
    self.rest = new r(config, log);
}

Workflows.prototype.getWorkflowForCompany = function(companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId + '/workflows';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Workflows.prototype.isLastNodeInWorkflow = function(nodeId, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'nodes/' + nodeId + '/last';

    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, companyId);
        newRest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Workflows.prototype.getWorkflowTypes = function() {
    var self = this;
    var config = self.config;
    var apiPath = 'workflows/types';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Workflows.prototype.getApplicationStatuses = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'workflows/appstatuses';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Workflows.prototype.getJobStatuses = function(companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'workflows/jobstatuses';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Workflows.prototype.getApplicationWorkflow = function(companyId, workflowId, deviceType, isTargetInternal, jobId) {
    var self = this;
    var config = self.config;
    var queryString = workflowId ? '?workflow_id=' + workflowId : '';

    if (deviceType) {
        queryString += workflowId ? '&' : '?';
        queryString += 'device_type=' + deviceType;
    }
    if (workflowId || deviceType) {
        queryString += '&is_target_internal=' + isTargetInternal;
    } else {
        queryString += '?is_target_internal=' + isTargetInternal;
    }
    if(jobId){
        queryString += "&id=" + jobId;
    }

    var apiPath = 'workflows/appWorkflow' + queryString;

    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, companyId);
        newRest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Workflows.prototype.addWorkflowForCompany = function(companyId, data, userId) {
    var self = this;
    var config = self.config;

    var apiPath = 'companies/' + companyId + '/workflows';

    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, companyId);
        newRest.set_headers(config.api.userId, userId);

        newRest.call_api('POST', apiPath, data, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Workflows.prototype.getWorkflowFormContext = function(companyId, applicationId, workflowType) {
    var self = this;
    var config = self.config;
    var queryString = applicationId ? '?application_id=' + applicationId : '';

    if (workflowType) {
        queryString += applicationId ? '&' : '?';
        queryString += 'workflow_type=' + workflowType;
    }

    var apiPath = 'workflows/formcontext/' + companyId + queryString;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Workflows.prototype.generateWorkflowBackup = function(companyId, workflowId, userId) {
    var self = this;
    var config = self.config;

    var apiPath = 'workflows/' + workflowId + '/backup';

    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, companyId);
        newRest.set_headers(config.api.userId, userId);

        newRest.call_api('POST', apiPath, {}, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Workflows.prototype.restoreWorkflowBackup = function(companyId, workflowsBackupId, userId) {
    var self = this;
    var config = self.config;

    var apiPath = 'workflows/' + workflowsBackupId + '/restore';

    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, companyId);
        newRest.set_headers(config.api.userId, userId);

        newRest.call_api('PUT', apiPath, {}, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Workflows.prototype.getWorkflowBackups = function(companyId, workflowId, limit, userId) {
    var self = this;
    var config = self.config;
    var limitQuery = limit ? ('?limit=' + limit) : '';

    var apiPath = 'workflows/' + workflowId + '/backup' + limitQuery;

    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, companyId);
        newRest.set_headers(config.api.userId, userId);

        newRest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Workflows.prototype.computeUserStatuses = function(userType, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/compute/status?user_type=' + userType;

    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, companyId);
        newRest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Workflows.prototype.getAllWorkflowByStatusByCompanyId = function(companyId, type, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'all/workflows/company/' + type;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Workflows.prototype.getAllVafApprovers = function(companyId, userId, req) {
    var self = this;
    var config = self.config;
    
    var apiPath = 'workflow/vaf/approvers';
    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};



module.exports = Workflows;