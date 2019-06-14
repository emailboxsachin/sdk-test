/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Brands(config, log) {
    var self = this;
    self.config = config;
    self.rest = new r(config, log);
}

Brands.prototype.createBrand = function(dataToPost, req) {
    var self = this;
    var apiPath = 'brands';

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

Brands.prototype.getBrandById = function(brandId, req) {
    var self = this;
    var apiPath = 'brands/' + brandId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Brands.prototype.updateBrand = function(brandId, data, req) {
    var self = this;
    var apiPath = 'brands/' + brandId;

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

Brands.prototype.getAllBrandsOfCompany = function(req) {
    var self = this;
    var apiPath = 'brands';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Brands.prototype.deleteBrand = function(brandId, req) {
    var self = this;
    var apiPath = 'brands/' + brandId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('DELETE', apiPath, {}, 'data')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};


module.exports = Brands;
