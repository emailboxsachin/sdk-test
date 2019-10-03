/*jshint -W079 */
var Promise = require('bluebird');
var r = require('hg-base').RestConnector;


function Users(config, log) {
    var self = this;
    self.config = config;
    self.log = log;
    self.rest = new r(config);
}

Users.prototype.getUserDetails = function(userId, userType, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'users/' + userId;
    if (userType !== undefined && userType === 'admin') {
        apiPath = 'admin/users/' + userId;
    }

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'security')
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

Users.prototype.getUserToken = function(req, companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'users/token';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, req.user_id);
        req.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response.headers[config.api.messageKey];
                console.log(errMessage);
                reject(errMessage);
            });
    });
}

Users.prototype.getAdminUserByName = function(name) {
    var self = this;
    var config = self.config;
    var apiPath = 'admin/users/name/' + name;

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

Users.prototype.getKpiAdminData = function(req) {
    var self = this;
    var config = self.config;
    var apiPath = 'kpi/admin';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'security')
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

Users.prototype.validateUser = function(dataToPost, companyId, userType, req, fromRecPortal=false) {
    var self = this;
    var config = self.config;
    var apiPath = 'users/';
    if (userType !== undefined && userType === 'admin') {
        apiPath = 'admin/users/';
    }

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                if(fromRecPortal){
                    reject(e);
                }else{
                    var errMessage = e.response && e.response.headers ? e.response.headers[config.api.messageKey] : e;
                    console.log(errMessage);
                    reject(errMessage);
                }
            });
    });
};

Users.prototype.validateToken = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'users/simulateLogin';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.updateAdminLastCompany = function(dataToPost) {
    var self = this;
    var config = self.config;
    var apiPath = 'admin/users/company';

    return new Promise(function(fulfill, reject) {
        self.rest.call_api('PUT', apiPath, dataToPost, 'security')
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

Users.prototype.getUsersByRole = function(companyId, roleType, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId + '/users/role/' + roleType;

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('GET', apiPath, {}, 'security')
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

Users.prototype.getAdminUsersForCompany = function(companyId) {
    var self = this;
    var apiPath = 'companies/adminusers/' + companyId;
    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.validatePassword = function(companyId, data, req) {

    var self = this;
    var config = self.config;
    var apiPath = 'users/validatePassword/';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, data, 'security')
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

Users.prototype.createMasterGroup = function(req, companyId, data, userId, userType) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = "users/mastergroup";

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.userType, userType);
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);

        req.rest.call_api('POST', apiPath, data, 'security')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.removeMasterGroup = function(req, companyId, data, userId, userType) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = "users/removemastergroup";

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.userType, userType);
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);

        req.rest.call_api('POST', apiPath, data, 'security')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.getMasterUsersForCompanies = function(req, data) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = "companies/masterusers";

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'security')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.getMasterUsersForClient = function(req, companyId, clientCompanyId) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = "companies/masterusers/" + companyId + "/" + clientCompanyId;

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, null, 'security')
            .then(function(response) {
                fulfill(response.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.addUserForCompany = function(companyId, data, userId, userType) {
    var self = this;
    var log = self.log;
    var config = self.config;

    var apiPath = "companies/" + companyId + "/users";

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

Users.prototype.getUsersForComapny = function(companyId, pageNo, perPageLimit) {
    var self = this;
    var config = self.config;
    var paginationParams = '?page_no=' + pageNo + '&per_page=' + perPageLimit;

    var apiPath = 'companies/' + companyId + '/users' + paginationParams;

    return new Promise(function(fulfill, reject) {
        self.rest.set_headers(config.api.companyId, companyId);
        self.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.getAllUsersOfCompany = function(companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/users/all';
    return new Promise(function(fulfill, reject) {
        var newRest = new r(self.config, self.log);
        newRest.set_headers(config.api.companyId, companyId);
        newRest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.getAllUsersForComapny = function(companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId + '/allUsers';
    return new Promise(function(fulfill, reject) {
        self.rest.set_headers(config.api.companyId, companyId);
        self.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });

};

Users.prototype.getAllInterviewUsersForCompany = function(companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/' + companyId + '/allInterviewUsers';
    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.getAgencyProfilesForCompany = function(companyId) {
    var self = this;
    var config = self.config;
    var apiPath = 'agencies/users/profiles/';
    return new Promise(function(fulfill, reject) {
        self.rest.set_headers(config.api.companyId, companyId);
        self.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.resendRegistrationEmailToUser = function(companyId, userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'users/' + userId + '/resendRegistrationEmail';

    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.call_api('POST', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.addUserByRoleTypeForCompany = function(data, companyId, userId, userType, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/users';
    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.set_headers(config.api.userType, userType);
        req.rest.call_api('POST', apiPath, data, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.getUserWithRoleType = function(userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'users/role_type/' + userId;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.deleteUser = function(deleteId, companyId, userId, userType, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'users/' + deleteId;
    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.call_api('DELETE', apiPath, req.body, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

//This method will be used to update user information only e.g. user name, email, password, telephone, etc.
//And won't be used if user's team id or role type needs to be changed
Users.prototype.updateUserById = function(uptUserId, data, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'users/' + uptUserId;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.updateUser = function(uptId, data, companyId, userId, userType, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'users/role_type/' + uptId;
    return new Promise(function(fulfill, reject) {
        req.rest.set_headers(config.api.companyId, companyId);
        req.rest.set_headers(config.api.userId, userId);
        req.rest.set_headers(config.api.userType, userType);
        req.rest.call_api('PUT', apiPath, data, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.getUsersByIds = function(data) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/users/Ids';
    return new Promise(function(fulfill, reject) {
        self.rest.call_api('GET', apiPath, data, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.getAllAccessibleSubClients = function(userId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'sub-clients/users/' + userId;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.updateMasterGroup = function(data, companyId, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'companies/master/group/' + companyId;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.assignUsersToMasterGroup = function(req, data) {
    var self = this;
    var apiPath = 'assign/users/master/group';
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.removeUsersFromMasterGroup = function(req, data) {
    var self = this;
    var apiPath = 'remove/users/master/group';
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, data, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};


Users.prototype.validateCredentialsForUser = function(req, email, password) {
    var self = this;
    var apiPath = 'users/credentials/validate';
    const payload = {
        email,
        password,
    }
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, payload, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.validateEmailForUser = function(req, email) {
    var self = this;
    var apiPath = 'users/email/validate/' + email;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('PUT', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.bulkAddUser = function(data, req) {
    var self = this;
    var apiPath = 'bulk/add/users';
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, data, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.forgotpasswordValidate = function(req, email) {
    var self = this;
    var apiPath = 'forgotpassword/validate/' + email;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.resetpassword = function(link, req) {
    var self = this;
    var apiPath = 'resetpassword/' + link;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.getUsersReportingData = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'reporting_data/users';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response ? e.response.headers[config.api.messageKey] : e;

                reject(errMessage);
            });
    });
};

Users.prototype.getAllUsers = function(dataToPost, req) {
    var self = this;
    var config = self.config;
    var apiPath = 'users/all';

    return new Promise(function(fulfill, reject) {
        req.rest.call_api('POST', apiPath, dataToPost, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                var errMessage = e.response ? e.response.headers[config.api.messageKey] : e;

                reject(errMessage);
            });
    });
};

Users.prototype.getMasterCompanyDomain = function(companyId, req) {
    const self = this;
    const apiPath = `companies/${companyId}/getMasterCompanyDomain`;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

Users.prototype.validateEmailExists = function(email, companyId, req) {
    const self = this;
    const apiPath = `users/validate/${email}`;
    return new Promise(function(fulfill, reject) {
        req.rest.call_api('GET', apiPath, {}, 'security')
            .then(function(records) {
                fulfill(records.body);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

module.exports = Users;