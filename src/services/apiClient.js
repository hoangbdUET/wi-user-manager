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
    editGroupInfo
};

//const WI_AUTH_URL = "https://users.i2g.cloud";
const WI_AUTH_URL = "http://admin.dev.i2g.cloud";
const WI_BACKEND_URL = "http://dev.i2g.cloud";

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
                resolve(payload.content);
            }).catch(e => {
                reject(e);
            });
        }).catch(e => {
            reject(e);
        })
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