function DataProxy() {}

DataProxy.companies = require('./companies');
DataProxy.jobs = require('./jobs');
DataProxy.candidates = require('./candidates');
DataProxy.applications = require('./applications');
DataProxy.agencies = require('./agencies');
DataProxy.scripts = require('./scripts');
DataProxy.interviews = require('./interviews');
DataProxy.tags = require('./tags');
DataProxy.costs = require('./costs');
DataProxy.notifications = require('./notifications');
DataProxy.email = require('./email');
DataProxy.custom_fields = require('./custom_fields');
DataProxy.brands = require('./brands');
module.exports = DataProxy;
