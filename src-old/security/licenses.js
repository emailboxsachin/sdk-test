/*jshint -W079 */
var Promise = require('bluebird'),
	r = require('hg-base').RestConnector;

function Licenses(config) {
	var self = this;
	self.config = config;
	self.rest = new r(config);
}

Licenses.prototype.getLicenses = function(pageNo, perPageLimit) {
	var self = this;
	var config = self.config;

	var paginationParams = '?page_no=' + pageNo + '&per_page=' + perPageLimit;

	var apiPath = 'licenses' + paginationParams;

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

Licenses.prototype.getAllRolesAssignedToLicences = function(companyId) {
	var self = this;
	var config = self.config;

	var apiPath = 'licences/companies/' + companyId + '/roles';

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

Licenses.prototype.addRolesToLicense = function(licenseId, companyId, dataToPost, userId, userType) {
	var self = this;
	var config = self.config;

	var apiPath = 'licenses/roles/' + licenseId;

	return new Promise(function(fulfill, reject) {
		self.rest.set_headers(config.api.userType, userType);
        self.rest.set_headers(config.api.companyId, companyId);
        self.rest.set_headers(config.api.userId, userId);
        
		self.rest.call_api('POST', apiPath, dataToPost, 'security')
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

module.exports = Licenses;