function WorkflowProxy() {
}

WorkflowProxy.workflows = require('./workflows');
WorkflowProxy.envelopes = require('./envelopes');
WorkflowProxy.nodes = require('./nodes');

module.exports = WorkflowProxy;
