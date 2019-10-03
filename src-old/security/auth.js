/*jshint -W079 */
const Promise = require('bluebird');

function auth(config, log) {
  const self = this;
  self.config = config;
  self.log = log;
}

auth.prototype.resetAccountLock = function(putData, req) {
  const self = this;
  const apiPath = 'auth/resetAccountLock';

  return new Promise(function(fulfill, reject) {
    req.rest.call_api('PUT', apiPath, putData, 'security')
      .then(function(response) {
        fulfill(response.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

auth.prototype.discardCurrentFailedLoginCounter = function(putData, req) {
  const self = this;
  const apiPath = 'auth/discardCurrentFailedLoginCounter';

  return new Promise(function(fulfill, reject) {
    req.rest.call_api('PUT', apiPath, putData, 'security')
      .then(function(response) {
        fulfill(response.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

auth.prototype.incrementFailedLoginCounter = function(putData, req) {
  const self = this;
  const apiPath = 'auth/incrementFailedLoginCounter';

  return new Promise(function(fulfill, reject) {
    req.rest.call_api('PUT', apiPath, putData, 'security')
      .then(function(response) {
        fulfill(response.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

auth.prototype.resetFailedLoginCounter = function(putData, req) {
  const self = this;
  const apiPath = 'auth/resetFailedLoginCounter';

  return new Promise(function(fulfill, reject) {
    req.rest.call_api('PUT', apiPath, putData, 'security')
      .then(function(response) {
        fulfill(response.body);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

module.exports = auth;