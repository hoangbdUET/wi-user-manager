module.exports = {
	getCompaniesPromise: getCompaniesPromise,
	deleteCompanyPromise: deleteCompanyPromise
}

const WI_AUTH_URL = "http://127.0.0.1:2999";
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