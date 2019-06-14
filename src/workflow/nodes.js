/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function Nodes(config, log) {
    var self = this;
    self.config = config;
    self.log = log;
    self.rest = new r(config, log);
}

Nodes.prototype.getNextNode = function(nodeId) {
    var self = this;
    var config = self.config;
    var apiPath = 'nodes/' + nodeId + '/next';

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

Nodes.prototype.getNode = function(nodeId) {
    var self = this;
    var config = self.config;
    var apiPath = 'nodes/' + nodeId;

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

Nodes.prototype.getAllNodesForWorkflow = function(workflowId, pageNo, perPageLimit) {
    var self = this;
    var config = self.config;
    var paginationParams = '?page_no=' + pageNo + '&per_page=' + perPageLimit;

    var apiPath = 'workflows/' + workflowId + '/nodes' + paginationParams;

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

Nodes.prototype.addNodeToWorkflow = function(workflowId, companyId, userId, data) {
    var self = this;
    var config = self.config;

    var apiPath = 'workflows/' + workflowId + '/nodes';

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

Nodes.prototype.updateNode = function(nodeId, companyId, userId, data) {
    var self = this;
    var config = self.config;

    var apiPath = 'nodes/' + nodeId;

    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, companyId);
        newRest.set_headers(config.api.userId, userId);

        newRest.call_api('PUT', apiPath, data, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Nodes.prototype.bulkUpdateNodes = function(companyId, userId, data) {
    var self = this;
    var config = self.config;

    var apiPath = 'nodes/bulk/update';

    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, companyId);
        newRest.set_headers(config.api.userId, userId);

        newRest.call_api('PUT', apiPath, data, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Nodes.prototype.setNextNode = function(nodeId, companyId, userId, data) {
    var self = this;
    var config = self.config;

    var apiPath = 'nodes/' + nodeId + '/next';

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

Nodes.prototype.updateMultipleNodes = function(data, wfId, userId, req) {
    var self = this;
    var config = self.config;

    var apiPath = 'nodes/multiple/' + wfId;

    return new Promise(function(fulfill, reject) {
        if (userId) {
            req.rest.set_headers(config.api.userId, userId);
        }
        req.rest.call_api('PUT', apiPath, data, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Nodes.prototype.getNodeStatusTypes = function() {
    var self = this;
    var config = self.config;

    var apiPath = 'nodes/types/';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Nodes.prototype.getMutipleNodesById = function(nodeIds) {
    var self = this;
    var config = self.config;

    var apiPath = 'nodes/multiple';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, nodeIds, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Nodes.prototype.getFormBuilderNodesForCompany = function(companyIds) {
    var self = this;
    var config = self.config;

    var apiPath = 'nodes/formbuilder/companies/';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, companyIds, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Nodes.prototype.deleteOldNodeAndCreateNewNode = function(companyId, userId, data, req) {
    var self = this;
    var config = self.config;

    var apiPath = 'hr/delete_node';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);

        req.rest.call_api('POST', apiPath, data, 'workflow')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Nodes;