'use strict';
function Sdk() {}

Sdk.storage = require('./storage/index.js');
Sdk.security = require('./security/index.js');
Sdk.messaging = require('./messaging/index.js');
Sdk.workflow = require('./workflow/index.js');
Sdk.data = require('./data/index.js');
Sdk.plugins = require('./plugins/index.js');
Sdk.search = require('./search/index.js');
Sdk.reporting = require('./reporting/index.js');

module.exports = Sdk;
