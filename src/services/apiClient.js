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
}

//const WI_AUTH_URL = "https://users.i2g.cloud";
const WI_AUTH_URL = "http://admin.dev.i2g.cloud";
function doPost(url, params, token) {
	return new Promise((resolve, reject) => {
		fetch(WI_AUTH_URL + url, {
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