'use strict';
/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Files(config, log) {
    var self = this;
    self.config = config;
    self.rest = new r(config, log);
}

Files.prototype.helloWorld = function(){
    return new Promise(function(fulfill, reject) {
        // req.rest.set_headers(config.api.companyId, companyId);
        // req.rest.call_api('GET', apiPath, {}, 'storage')
            // .then(function(records) {
                fulfill('hello world');
            // })
            // .catch(function(e) {
                // var errMessage = e.response.headers[config.api.messageKey];
                // console.log(errMessage);
                // reject(errMessage);
            // });
    });
}

Files.prototype.getFileDetails = function(fileId, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'files/' + fileId;

    //Check if querystring param is present
    if (req.query && req.query.updated_preview) {
        apiPath += '?updated_preview=' + req.query.updated_preview;
    }

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'storage')
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

Files.prototype.getDownloadUrl = function(fileId, companyId, expiry, req) {
    var self = this;
    var config = self.config;

    var expiryInSeconds = expiry ? '?expiry=' + expiry : '';
    var apiPath = 'files/' + fileId + '/url' + expiryInSeconds;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'storage')
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

Files.prototype.updateFileFields = function(fileId, companyId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'files/' + fileId;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('PUT', apiPath, data, 'storage')
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

Files.prototype.postProcessFile = function(fileId, data) {
    var self = this;
    var config = self.config;
    var apiPath = 'files/' + fileId + '/postprocess';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('POST', apiPath, data, 'storage')
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

Files.prototype.deleteFile = function(fileId, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'files/' + fileId;
    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('DELETE', apiPath, {}, 'storage')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Files.prototype.triggerZipProcess = function(fileId, companyId, dataString) {
    var self = this;
    var config = self.config;
    var apiPath = 'files/' + fileId + '/trigger_zip';
    return new Promise(function(fulfill, reject) {
        self.rest.set_headers(config.api.companyId, companyId);
        const data = {
            metadata: {
                html: dataString
            }
        }
        self.rest.call_api('POST', apiPath, data, 'storage')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Files.prototype.deleteMultipleFiles = function(fileIds) {
    var self = this;
    var config = self.config;
    var apiPath = 'files/bulk'
    return new Promise(function(fulfill, reject) {
        self.rest.call_api('DELETE', apiPath, fileIds, 'storage')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Files.prototype.deleteFileFromUrl = function(awsUrl, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'files?url=' + awsUrl;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('DELETE', apiPath, {}, 'storage')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Files.prototype.getSignedUrlFromKey = function(awsUrl, req, expiry) {
    var self = this;
    var config = self.config;
    var expiryInSeconds = expiry ? '&expiry=' + expiry : '';
    var apiPath = 'files?url_key=' + awsUrl + expiryInSeconds;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'storage')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Files.prototype.getBbliteFromAws = function(data) {
    var self = this;
    var config = self.config;
    var apiPath = 'bblite/aws';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, data, 'storage')
            .then(function(record) {
                fulfill(record.body);
            })
            .catch(function(e) {
                return reject(e);
            });
    });
};

Files.prototype.uploadNewFile = function(req, fileData) {
    var self = this;
    var config = self.config;
    var apiPath = 'files/new';
    return new Promise(function(fulfill, reject) {
        req.rest.set_headers('files', true);
        req.rest.call_api('POST', apiPath, {}, 'storage', fileData)
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                console.log("Could not upload file ", e);
                reject(e);
            });
    });
};

Files.prototype.uploadFile = function(fileData, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'files';
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, fileData, 'storage')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                console.log("Could not upload file ", e);
                reject(e);
            });
    });
};

Files.prototype.postProcessAgencyFiles = function(fileData, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'files/agency/postprocess';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, fileData, 'storage')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Files;