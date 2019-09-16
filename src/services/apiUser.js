const api = require('./apiClient');
module.exports = {
    removeLoginSession: function() {
        localStorage.removeItem("token");
        localStorage.removeItem('username');
        localStorage.removeItem('company');
    },
    isLoggedIn: function() {
        return localStorage.getItem('token');
    },
    login: function(username, password) {
        return new Promise((resolve, reject)=>{
            api.login(username, password)
            .then((res)=>{
                console.log(res);
                if (res.code == 200) {
                    localStorage.setItem('token', res.content.token);
                    localStorage.setItem('username', res.content.user.username);
                    resolve(true);
                } else {
                    reject(res.reason);
                }
            })
            .catch((e)=>{
                reject(e.message);
            });
        });
    }
}