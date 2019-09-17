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
    login,
    update
};

// const WI_AUTH_URL = "https://users.i2g.cloud";
// const WI_AUTH_URL = "http://127.0.0.1:2999";
const WI_AUTH_URL = "http://admin.dev.i2g.cloud";
const WI_BACKEND_URL = "http://dev.i2g.cloud";

const apiUser = require('./apiUser');

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
            response.json().then(payload => {
                if (parseInt(payload.code) === 401) {
                    console.log('redirect and logout');
                    apiUser.removeLoginSession();
                    if (!window.location.href == "/login") window.location.href = '/login';
                }
                resolve(payload.content);
            }).catch(e => {
                reject(e);
            });
        }).catch(e => {
            reject(e);
        });
    });
}

function getCompaniesPromise() {
    return doPost('/company/list', {});
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

function login(username, password) {
    params = {username: username, password: password};
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
