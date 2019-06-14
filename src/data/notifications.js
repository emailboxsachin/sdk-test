/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Notifications(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

Notifications.prototype.postBulkNotification = function(data) {
    var self = this;
    var config = self.config;
    var apiPath = 'bulk/notification';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, 'notifications')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};


Notifications.prototype.getAllNotificationsForChannel = function(channelId, params) {
    var self = this;
    var config = self.config;
    var apiPath = 'notifications/all/' + channelId + '?';
    var reqParams = [];
    if('read_flag' in params){
        reqParams.push('read_flag=' + params.read_flag);
        delete params['read_flag'];
    }
    for (key in params){
        reqParams.push(key + "=" + params[key])
    }
    apiPath += reqParams.join('&');

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'notifications')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Notifications.prototype.setNotificationsAsRead = function(data) {
    var self = this;
    var config = self.config;
    var apiPath = 'notifications';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, data, 'notifications')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Notifications.prototype.setAllAsReadForChannel = function(channelId, data) {
    var self = this;
    var config = self.config;
    var apiPath = 'notifications/read/all/' + channelId;

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, data, 'notifications')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};


module.exports = Notifications;