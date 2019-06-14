/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;

function Groups(config) {
	var self = this;
	self.config = config;
	self.rest = new r(config);
}

Groups.prototype.addGroupForCompany = function(companyId, data, userId, userType) {
	var self = this;
	var config = self.config;

	var apiPath = 'companies/' + companyId + '/groups';

	return new Promise(function(fulfill, reject) {
		self.rest.set_headers(config.api.userType, userType);
		self.rest.set_headers(config.api.companyId, companyId);
		self.rest.set_headers(config.api.userId, userId);

		self.rest.call_api('POST', apiPath, data, 'security')
			.then(function(response) {
				fulfill(response.body);
			})
			.catch(function(e) {
				reject(e);
			});
	});
};

Groups.prototype.updateGroup = function(companyId, data, groupId, userId, userType) {
	var self = this;
	var config = self.config;

	var apiPath = "groups/" + groupId;

	return new Promise(function(fulfill, reject) {
		self.rest.set_headers(config.api.userType, userType);
		self.rest.set_headers(config.api.companyId, companyId);
		self.rest.set_headers(config.api.userId, userId);

		self.rest.call_api('PUT', apiPath, data, 'security')
			.then(function(response) {
				fulfill(response.body);
			})
			.catch(function(e) {
				reject(e);
			});
	});
};

Groups.prototype.getAllGroupsForCompany = function(companyId, page_no, per_page) {
	var self = this;
	var config = self.config;

	var apiPath = "companies/" + companyId + "/groups?per_page="+per_page+"&page_no="+page_no;

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

Groups.prototype.getGroupById = function(groupId) {
	var self = this;
	var config = self.config;

	var apiPath = "groups/" + groupId;

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

module.exports = Groups;