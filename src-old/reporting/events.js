/*global load */
/*jshint -W079 */
var Promise = require('bluebird');

function Events(config) {
    var self = this;
    self.config = config;
}

Events.prototype.addEvent = function(rest, companyId, data) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId + '/events';

    return new Promise(function(fulfill, reject) {
        rest.call_api('POST', apiPath, data, 'reporting')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Events.prototype.deleteActivityByRecordId = function(rest, recordId) {
    var self = this;
    var config = self.config;
    var apiPath = 'events/activity/' + recordId;

    return new Promise(function(fulfill, reject) {
        rest.call_api('DELETE', apiPath, {}, 'reporting')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Events;