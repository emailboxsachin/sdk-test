/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Costs(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

Costs.prototype.createCost = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'cost';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, req.body, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};

Costs.prototype.updateCost = function(id, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'cost/' + id;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, req.body, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};

Costs.prototype.getCost = function(id, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'cost/' + id;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, req.body, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};

Costs.prototype.deleteCost = function(id, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'cost/' + id;

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

Costs.prototype.deleteBulkCost = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'bulk/cost/delete';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, req.body, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};

Costs.prototype.getAllCostsCompany = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'cost/all/company';

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

Costs.prototype.exportCost = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'cost/export/all';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, req.body, 'data')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};


module.exports = Costs;