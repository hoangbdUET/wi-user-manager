module.exports = {
    getCompaniesPromise,
    deleteCompanyPromise,
    addCompanyPromise,
    editCompanyPromise,
    getGroupsPromise,
    addGroupPromise,
    deleteGroupPromise,
    editGroupPromise,
    getUsersPromise,
    getProjectsPromise,
    stopSharingProject,
    startSharingProject,
    removeUserFromGroup,
    addUsersToGroup,
    editGroupInfo,
    newGroup,
    getLicensePackages,
    newLicensePacage,
    updateLicensePackage,
    login,
    update,
    newUser,
    updateUserPromise,
    deleteUser,
    getFeatures,
    deleteLicensePackage,
    deleteFeature,
    getCompanyInfo,
    getListLicensePackageLeft,
    getListLicenseInCompany,
    licenseUpdate
};

const env = process.env.NODE_ENV;
console.log("=======", env);
let config = require('../config/default').default;
if (env === "development") {
    config = require("../config/default").dev;
} else if (env === "production") {
    config = require("../config/default").production;
}


const WI_AUTH_URL = config.wi_auth;
const WI_BACKEND_URL = config.wi_backend;

function doPost(url, params, token, service) {
    return new Promise((resolve, reject) => {
        let fullUrl = service === "BACKEND" ? WI_BACKEND_URL + url : WI_AUTH_URL + url;
        fetch(fullUrl, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": token || window.localStorage.getItem('token')
            }
        }).then(response => {
            if (response.status !== 200 && response.status !== 401) return reject(response.statusText);
            response.json().then(payload => {
                if (parseInt(payload.code) === 401) {
                    require('./apiUser').removeLoginSession();
                    if (!window.location.href === "/login") window.location.href = '/login';
                } else if (parseInt(payload.code) === 200) {
                    resolve(payload.content);
                } else {
                    reject(payload.reason);
                }
            }).catch(e => {
                reject(e.message);
            });
        }).catch(e => {
            reject(e.message);
        });
    });
}

function licenseUpdate(idCompany, idLicense, value) {
    return doPost('/license/update', {
        idCompany: idCompany,
        idLicensePackage: idLicense,
        value: value
    });
}

function getListLicenseInCompany(idCompany) {
    return doPost('/company/get-licenses', {idCompany});
}

function getListLicensePackageLeft() {
    return doPost('/company/get-licenses-left');
}

function getCompaniesPromise() {
    return doPost('/company/list', {}).then(rs => rs.sort((a,b)=>(a.name || "").localeCompare(b.name || "")));
}

function deleteCompanyPromise(idCompany) {
    return doPost('/company/delete', {idCompany});
}

function addCompanyPromise(company) {
    return doPost('/company/new', company);
}

function editCompanyPromise(company) {
    return doPost('/company/edit', company);
}

function getGroupsPromise() {
    return doPost('/group/list', {});
}

function addGroupPromise(group) {
    return doPost('/group/new', group);
}

function deleteGroupPromise(idGroup) {
    return doPost('/group/delete', {idGroup});
}

function editGroupPromise(group) {
    return doPost('/group/edit', group);
}

function getUsersPromise() {
    return doPost('/user/list', {});
}

function getProjectsPromise(users) {
    return doPost('/project/list-of-all-user', {
        users: users
    }, null, "BACKEND");
}

function getCompanyInfo(idCompany) {
    return doPost('/company/info', {idCompany: idCompany});
}

function stopSharingProject(project) {
    return doPost('/shared-project/remove', {...project})
}

function startSharingProject(project) {
    return doPost('/shared-project/new', {project_name: project.name, username: project.createdBy})
}

function removeUserFromGroup(idGroup, idUser) {
    return doPost('/group/remove-user', {idGroup: idGroup, idUser: idUser});
}

function addUsersToGroup(idGroup, users) {
    return doPost('/group/add-users-to-group', {idGroup: idGroup, idUsers: users});
}

function editGroupInfo(idGroup, name, description) {
    return doPost('/group/edit', {idGroup: idGroup, name: name, description: description});
}

function newGroup(group) {
    return doPost('/group/new', group);
}

function getLicensePackages() {
    return doPost('/license-package/list', {})
}

function deleteLicensePackage(payload) {
    return doPost('/license-package/delete', payload)
}

function newLicensePacage(item) {
    return doPost('/license-package/new', {...item})
}

function updateLicensePackage(item) {
    return doPost('/license-package/edit', {...item})
}

function getFeatures(payload) {
    return doPost('/feature/list', {...payload});
}

function deleteFeature(payload) {
    return doPost('/feature/delete', {...payload})
}

function login(username, password) {
    let params = {username: username, password: password};
    return fetch(WI_AUTH_URL + '/login', {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": 'application/json'
        }
    }).then(response => {
        return response.json();
    });
    // return doPost('/login', {username: username, password: password});
}

function update() {
    return doPost('/database/update', {}, null, 'BACKEND');
}

function newUser(user) {
    return doPost('/user/new', user);
}

function deleteUser(idUser) {
    return doPost('/user/delete', {idUser: idUser});
}

function updateUserPromise(payload) {
    return doPost('/user/edit', {...payload})
}
