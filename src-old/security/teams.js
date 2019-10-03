/*global load */
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Teams(config) {
    var self = this;
    self.config = config;
    self.rest = new r(config);
}

Teams.prototype.getTeamIdOfUser = function(userId) {
    var self = this;
    var config = self.config;
    
    var apiPath = 'teams/users/' + userId;
   
    var dataToPost = null;

    return new Promise(function(fulfill, reject) {        
        self.rest.call_api('GET', apiPath, {}, 'security')   
        .then(function (records) {
            fulfill(records.body);
        })        
        .catch(function(e) {
            var errMessage = e.response.headers[config.api.messageKey];
            console.log(errMessage);
            reject(errMessage);
        });
    });    

};

Teams.prototype.addDefaultTeamForCompany = function(companyId, data) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = "companies/" + companyId + "/teams";
    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, 'security')
        .then(function(response) {
            fulfill(response.body);
        })
        .catch(function(e) {
            reject(e);
        });
    });
};

Teams.prototype.getDefaultTeamOfCompany = function(companyId) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = "companies/" + companyId + "/teams/default";
    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'security')
        .then(function(response) {
            fulfill(response.body);
        })
        .catch(function(e) {
            reject(e);
        });
    });
};

module.exports = Teams;