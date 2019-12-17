let role = null;
const api = require('./apiClient');
module.exports = {
    removeLoginSession: function() {
        localStorage.removeItem("token");
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('company');
        role = null;
    },
    isLoggedIn: function() {
        return localStorage.getItem('token');
    },
    login: function(username, password) {
        return new Promise((resolve, reject)=>{
            api.login(username, password)
            .then((res)=>{
                if (res.code == 200) {
                    if (res.content.user.role <= 1) {
                        localStorage.setItem('token', res.content.token);
                        localStorage.setItem('username', res.content.user.username);
                        localStorage.setItem('role', res.content.user.role);
                        //get company name 
                        api.getCompanyInfo(res.content.user.idCompany)
                        .then((rs)=>{
                            localStorage.setItem('company', rs.name);
                            resolve(true);
                        })
                        .catch(e=>{
                            reject(e.message);
                        });
                    } else {
                        reject("Have no permission to access");
                    }
                } else {
                    reject(res.reason);
                }
            })
            .catch((e)=>{
                reject(e.message);
            });
        });
    },
    getRole: function() {
        return localStorage.getItem('role');
    },
    getCompanyName: function() {
        return localStorage.getItem('company');
    }
};