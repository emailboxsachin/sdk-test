/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Tags(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

Tags.prototype.addTagForEntities = function(companyId, userId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'tags';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        var service = 'data';
        if (data.entity_type.toLowerCase() === 'users') {
            service = 'security';
        }
        req.rest.call_api('POST', apiPath, data, service)
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};

Tags.prototype.getAllTagsForEntities = function(companyId, userId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'tags/entities';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        var service = 'data';
        if (data.entity_type.toLowerCase() === 'users') {
            service = 'security';
        }
        req.rest.call_api('POST', apiPath, data, service)
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};

Tags.prototype.assignEntitiesToTag = function(companyId, userId, tagId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'tags/' + tagId;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        var service = 'data';
        if (data.entity_type.toLowerCase() === 'users') {
            service = 'security';
        }
        req.rest.call_api('PUT', apiPath, data, service)
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};

Tags.prototype.getAllTagsForCompany = function(companyId, entity_type, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'tags';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        var service = 'data';
        if (entity_type.toLowerCase() === 'users') {
            service = 'security';
        }
        req.rest.call_api('GET', apiPath, {}, service)
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};

Tags.prototype.removeTagFromEntities = function(companyId, userId, tagId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'tags/' + tagId + '/entities';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        var service = 'data';
        if (data.entity_type.toLowerCase() === 'users') {
            service = 'security';
        }
        req.rest.call_api('DELETE', apiPath, data, service)
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};

Tags.prototype.deleteTag = function(companyId, userId, tagId, entity_type, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'tags/' + tagId;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        var service = 'data';
        if (entity_type.toLowerCase() === 'users') {
            service = 'security';
        }
        req.rest.call_api('DELETE', apiPath, {}, service)
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};

Tags.prototype.getUsersAssociatedToTag = function(tagId) {
    var self = this;
    var config = self.config;
    var apiPath = 'tags/users/' + tagId;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });

    });
};


module.exports = Tags;