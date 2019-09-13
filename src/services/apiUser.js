module.exports = {
    removeLoginSession: function() {
        localStorage.removeItem("token");
    }
}