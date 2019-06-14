/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Companies(config, log) {
    var self = this;
    self.config = config;
    self.log = log;
    self.rest = new r(config, log);
}

Companies.prototype.getCompanyIdByDomain = function(domainName, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/id/' + domainName;

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

Companies.prototype.getLatestCompany = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/latest';

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

Companies.prototype.getCompaniesSubClients = function(req, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/subclients/' + companyId;

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

Companies.prototype.getCompaniesSubClientDetails = function(req, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/subclientdetails/' + companyId;

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

Companies.prototype.getCompaniesReports = function(req, reportId) {
    var self = this;
    var config = self.config;
    const reportType =  req.query.report_type || '';
    const dateFrom =  req.query.date_from || '';
    const dateTo =  req.query.date_to || '';
    var additionalParams = '';
    if(reportType && dateFrom && dateTo) {
        additionalParams = '?report_type=' + reportType + '&date_from=' + dateFrom + '&date_to=' + dateTo;
    }

    var apiPath = 'reports/' + reportId + additionalParams;

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

Companies.prototype.getMultiClientStatusOfAts = function(req, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/getmulticlientstatus/' + companyId;

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

Companies.prototype.getCompany = function(companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId;

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

Companies.prototype.getAllCompanies = function(page_no, per_page, req) {
    var self = this;
    var config = self.config;
    var paginationParams = '?page_no=' + page_no + '&per_page=' + per_page;
    var apiPath = 'companies' + paginationParams;

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

Companies.prototype.getAllCompaniesInSystem = function(page_no, per_page, req) {
    var self = this;
    var config = self.config;
    var paginationParams = '?page_no=' + page_no + '&per_page=' + per_page;
    var apiPath = 'companies/all' + paginationParams;

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

Companies.prototype.getJobWorkflowCompanies = function(limit) {
    var self = this;
    var config = self.config;
    var limitParams = '?limit=' + limit;
    var apiPath = 'companies/jobworkflows' + limitParams;

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

Companies.prototype.writeToMessageQueue = function(queueTopic, queueData) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/writetomessagequeue';

    var data = {};
    data.queue_topic = queueTopic;
    data.queue_data = queueData;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response ? e.response.headers[config.api.messageKey] : e;
                reject(errMessage);
            });
    });
};

Companies.prototype.getWorkflowUnmigratedCompanies = function(data) {
    var self = this;
    var config = self.config;

    var apiPath = 'companies/unmigratedworkflows';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Companies.prototype.createClientRequest = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/addclient';

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

Companies.prototype.addSubClientToAts = function(req, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId + '/addsubclient';

    var dataToPost = req.body;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);

        req.rest.call_api('POST', apiPath, dataToPost, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Companies.prototype.removeSubClientFromAts = function(req, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId + '/removesubclient';

    var dataToPost = req.body;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);

        req.rest.call_api('POST', apiPath, dataToPost, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Companies.prototype.addCompany = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies';

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

Companies.prototype.updateCompany = function(dataToPost, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, dataToPost, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Companies.prototype.deleteCompany = function(companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('DELETE', apiPath, {}, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Companies.prototype.addCompanySettings = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/settings';

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

Companies.prototype.getCompanySettings = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/settings';

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

Companies.prototype.getAllCompanySettings = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'all/companies/settings';

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

Companies.prototype.updateCompanySettings = function(dataToPost, companyId, userType, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/settings';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.userType, userType);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.set_headers(config.api.companyId, companyId);

        req.rest.call_api('PUT', apiPath, dataToPost, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Companies.prototype.updateSpecificSettingsForCompany = function(dataToPost, companyId, userType, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/settings/specific';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.userType, userType);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.set_headers(config.api.companyId, companyId);

        req.rest.call_api('PUT', apiPath, dataToPost, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Companies.prototype.getKpiData = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'kpi/admin';

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

Companies.prototype.getSources = function(companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/listSource';

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

Companies.prototype.addSeoSettings = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/settings/seo';

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

Companies.prototype.addThemeSettings = function(dataToPost, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/settings/theme';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
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

Companies.prototype.updateCompanyLicenses = function(data, companyId, userId) {
    var self = this;

    var config = self.config;
    var apiPath = 'companies/settings/licenses';
    //Temporary fix, this needs to be removed later to use req object from argument list
    var restObj = new r(config, self.log);

    return new Promise(function(fulfill, reject) {
        restObj.set_headers(config.api.companyId, companyId);
        restObj.set_headers(config.api.userId, userId);
        restObj.call_api('PUT', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Companies.prototype.getCompanyLicensesStatus = function(field, property, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/settings/specific';

    var data = {};
    data.field = field;
    data.property = property;

    //Temporary fix, this needs to be removed later to use req object from argument list
    var restObj = new r(config, self.log);

    return new Promise(function(fulfill, reject) {
        restObj.set_headers(config.api.companyId, companyId);
        restObj.call_api('GET', apiPath, data, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Companies.prototype.getCompaniesReportingData = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'reporting_data/companies';

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

Companies.prototype.writeBulkMessagesToQueue = function(queueTopic, queueData) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/bulk/writetomessagequeue';

    var data = {};
    data.queue_topic = queueTopic;
    data.queue_data = queueData;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                var errMessage = e.response ? e.response.headers[config.api.messageKey] : e;
                reject(errMessage);
            });
    });
};

Companies.prototype.getCompanyNewSettings = function(req) {
    var self = this;
    var config = self.config;
    const apiPath = 'companies/settingsObject?get_from_db=' + req.query.get_from_db;

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

Companies.prototype.writeBatchDataToQueue = function(data, req) {
    const self = this;
    const apiPath = 'companies/batch/writeToMessageQueue';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'data')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};


module.exports = Companies;
