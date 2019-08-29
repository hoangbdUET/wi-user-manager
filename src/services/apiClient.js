module.exports = {
	getCompaniesPromise: getCompaniesPromise
}

const WI_AUTH_URL = "http://admin.dev.i2g.cloud";
function getCompaniesPromise() {
	return new Promise((resolve, reject) => {
		fetch(WI_AUTH_URL + "/company/list", {
			method: "POST",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": 'application/json'
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
	})
}