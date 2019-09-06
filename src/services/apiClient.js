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
    getProjectsPromise
}

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

function getProjectsPromise() {
    return doPost('/project/list-of-all-user', {
        users: ["hoang", "duyenn", "thangbm", "cuongnd", "canh", "123", "nhan", "thang", "cuong", "hungson", "tkvmai", "tan", "tunghx", "tuanbv", "dodv", "nhan1", "thong", "thuy", "hoangbd", "essuser", "phamthephuong", "hungnk", "thuy2", "danghoang", "test", "cuongh", "thuy3", "thuy4", "nkthanh", "thuypham", "chat1", "chat2", "chat3", "chat4", "chat5", "biendongpoc", "dai", "1234", "nghia", "nghiatran", "dinhhoa", "hoangkx", "lam", "joelaambiase", "bingjian", "dang.hoang", "1", "danghoang1", "cuongcc", "phuc", "2", "bmq", "tien", "3", "vuthithuythuy", "1111", "0", "4", "duyen1", "duyenb_test", "thuyen", "ty", "hoi", "an", "anhh", "bui", "hoang_12", "Cuong1", "ess_anhnguyen", "son", "duyenn1", "ess_thuynguyen", "ess_trungdoan", "ess_hieuvu", "ess_kienmai", "ess_hoadinh", "ess_joe", "pvu_thuyen", "pvu_ty", "thinh", "partner_jinhan", "duyennn", "ess_hieutran", "hoangthanh751996"]
    }, null, "BACKEND");
}