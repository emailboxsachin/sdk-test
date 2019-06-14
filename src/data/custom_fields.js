/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function CustomFields(config, log) {
  var self = this;
  self.config = config;
  self.log = log;
}

CustomFields.prototype.addCustomFields = function(req) {
  const self = this;
  const apiPath = 'customFields';

  return new Promise(function(fulfill, reject) {
    req.rest.set_headers(self.config.api.companyId, req.companyId);
    req.rest.call_api('POST', apiPath, req.body, 'data')
      .then(function(records) {
        fulfill(records.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

CustomFields.prototype.getAllCustomFieldsList = function(req) {
  const self = this;
  const apiPath = 'customFields/list';

  return new Promise(function(fulfill, reject) {
    req.rest.set_headers(self.config.api.companyId, req.companyId);
    req.rest.call_api('GET', apiPath, {}, 'data')
      .then(function(records) {
        fulfill(records.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

CustomFields.prototype.getCustomFieldsDetails = function(uuid, req) {
  const self = this;
  const apiPath = 'customFields/' + uuid;

  return new Promise(function(fulfill, reject) {
    req.rest.set_headers(self.config.api.companyId, req.companyId);
    req.rest.call_api('GET', apiPath, {}, 'data')
      .then(function(records) {
        fulfill(records.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

CustomFields.prototype.updateCustomFieldsOrder = function(entityType, req) {
  const self = this;
  const apiPath = 'customFields/' + entityType + '/reorder';

  return new Promise(function(fulfill, reject) {
    req.rest.set_headers(self.config.api.companyId, req.companyId);
    req.rest.call_api('PUT', apiPath, req.body, 'data')
      .then(function(records) {
        fulfill(records.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

CustomFields.prototype.updateCustomFields = function(uuid, entityType, req) {
  const self = this;
  const apiPath = 'customFields/' + entityType + '/' + uuid;

  return new Promise(function(fulfill, reject) {
    req.rest.set_headers(self.config.api.companyId, req.companyId);
    req.rest.call_api('PUT', apiPath, req.body, 'data')
      .then(function(records) {
        fulfill(records.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

CustomFields.prototype.deleteCustomFields = function(uuid, req) {
  const self = this;
  const apiPath = 'customFields/' + uuid;

  return new Promise(function(fulfill, reject) {
    req.rest.set_headers(self.config.api.companyId, req.companyId);
    req.rest.call_api('DELETE', apiPath, {}, 'data')
      .then(function(records) {
        fulfill(records.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

CustomFields.prototype.getCustomFieldsValue = function(uuid, entityType, companyId, userType, req) {
  const self = this;
  const apiPath = 'customFields/value/' + entityType + '/' + uuid;

  return new Promise(function(fulfill, reject) {
    req.rest.set_headers(self.config.api.companyId, companyId);
    req.rest.set_headers(self.config.api.userType, userType);
    req.rest.call_api('GET', apiPath, {}, 'data')
      .then(function(records) {
        fulfill(records.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
CustomFields.prototype.updateCustomFieldsValue = function(companyId, userId, userName, req) {
  const self = this;
  const apiPath = 'customFields/value';

  return new Promise(function(fulfill, reject) {
    req.rest.set_headers(self.config.api.companyId, companyId);
    req.rest.set_headers(self.config.api.userId, userId);
    req.rest.set_headers(self.config.api.userName, userName);
    req.rest.call_api('PUT', apiPath, req.body, 'data')
      .then(function(records) {
        fulfill(records.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

module.exports = CustomFields;