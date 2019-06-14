/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function Envelopes(config, log) {
    var self = this;
    self.config = config;
    self.log = log;
    self.rest = new r(config, log);
}

Envelopes.prototype.createEnvelope = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes';

    var dataToPost = req.body;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Envelopes.prototype.getEnvelope = function(envelopeId, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/' + envelopeId;

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

Envelopes.prototype.getCurrentNodeForEnvelope = function(envelopeId, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/' + envelopeId + '/node';

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

Envelopes.prototype.getEnvelopeOfApplicationByType = function(applicationId, envType, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/application/' + envType + '/' + applicationId;

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

Envelopes.prototype.updateEnvelopeEdge = function(envId, dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/' + envId + '/node';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, dataToPost, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Envelopes.prototype.updateEnvelopeData = function(envId, dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/' + envId + '/data';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, dataToPost, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Envelopes.prototype.getEnvelopeByReturnId = function(returnId, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/returnid/' + returnId;

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

Envelopes.prototype.createBulkEnvelopes = function(data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/bulk';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Envelopes.prototype.getEnvelopesFromResourceIds = function(envelopeIds) {
    var self = this;
    var config = self.config;
    var apiPath = 'resources/envelopes';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, envelopeIds, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Envelopes.prototype.updateBulkEnvelopeEdge = function(data, req) {
    var self = this;
    var apiPath = 'envelopes/bulk/edge';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Envelopes.prototype.checkEnvelopeStatusAndUpdate = function(data, req) {
    var self = this;
    var apiPath = 'envelopes/check/job/status';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};
Envelopes.prototype.getDataFromPcom = function(envelopeId, nodeId, installationId, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/getDataFromPcom/' + envelopeId + '/' + nodeId + '/' + installationId;
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
Envelopes.prototype.createPcom = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/createPcom';

    var dataToPost = req.body;
    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, dataToPost.companyId);
        newRest.call_api('POST', apiPath, dataToPost, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};

Envelopes.prototype.getAllInstallationIds = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/getAllInstallationIds';
    var dataToPost = req.body;
    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, dataToPost.companyId);
        newRest.call_api('POST', apiPath, dataToPost, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};
Envelopes.prototype.addBulkDataToNodeInstallation = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/addBulkDataToNodeInstallation';
    var dataToPost = req.body;
    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, dataToPost.companyId);
        newRest.call_api('POST', apiPath, dataToPost, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                reject(errMessage);
            });
    });
};
Envelopes.prototype.updateBulkEnvelopes = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'applications/bulk/updateEnvData';
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

Envelopes.prototype.resetPcomObj = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/resetPcom';
    var dataToPost = req.body;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Envelopes.prototype.getPcomObj = function(envelopeId) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/getPcom/' + envelopeId;
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

Envelopes.prototype.updateEnvelopesDataBulk = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'envelopes/updateBulkEnvelopeData';
    var dataToPost = req.body;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, dataToPost, 'workflow')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];

                reject(errMessage);
            });
    });
};

Envelopes.prototype.processIndeedApplyApplEnvelope = function(data, req) {
    var self = this;
    var apiPath = 'envelopes/indeedApply/postProcess';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'workflow')
            .then(function(resp) {
                fulfill(resp);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Envelopes;