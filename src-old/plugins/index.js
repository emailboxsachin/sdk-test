function PluginProxy() {
}

PluginProxy.plugins = require('./plugins');
PluginProxy.installations = require('./installations');
PluginProxy.reporting_plugin = require('./reporting_plugin');
PluginProxy.formbuilder_plugin = require('./formbuilder_plugin');
PluginProxy.breathehr_plugin = require('./breathehr_plugin');
PluginProxy.job_approval_plugin = require('./job_approval_plugin');


module.exports = PluginProxy;
