module.exports = UserStatus;
const React = require('react');
const apiUser = require('./../../services/apiUser');

function UserStatus(props) {
    React.Component.call(this, props);

    this.logout = function() {
        apiUser.removeLoginSession();
        window.location.href = "/login";
    }

    this.render = function() {
        return (
            <React.Fragment>
                <div className={"name"}>{localStorage.getItem('username') || "Guest"}/{localStorage.getItem('company') || "I2G"}</div>
                <div className={"logout-btn"} style={{cursor: 'pointer'}} onClick = {(e)=>{
                    this.logout();
                }}>Logout</div>
                <div className={"user-picture"} />
            </React.Fragment>
        );
    }
}

UserStatus.prototype = Object.create(React.Component.prototype);
