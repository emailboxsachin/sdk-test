/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function Rights(config) {
	var self = this;
	self.config = config;
	self.rest = new r(config);
}

Rights.prototype.getAllRights = function() {
	var self = this;
	var config = self.config;

	var apiPath = 'rights';

	return new Promise(function(fulfill, reject) {
		self.rest.call_api('GET', apiPath, {}, 'security')
			.then(function(records) {
				fulfill(records.body);
			})
			.catch(function(e) {
				var errMessage = e.response.headers[config.api.messageKey];
				console.log(errMessage);
				reject(errMessage);
			});
	});
};

module.exports = Rights;