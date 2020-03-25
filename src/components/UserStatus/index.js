module.exports = UserStatus;
require('./style.less');
const React = require('react');
const apiUser = require('./../../services/apiUser');
const CenteredModal = require('./../CenteredModal');

function UserStatus(props) {
    React.Component.call(this, props);

    this.state = {
        modalOpen: false
    }

    this.componentDidMount = function() {
        this.setState({
            modalOpen: false
        });
    }

    this.logout = function() {
        apiUser.removeLoginSession();
        window.location.href = "/login";
    }

    this.onCancelModal = function() {
        this.setState({
            modalOpen: false
        })
    }

    this.openModal = function() {
        this.setState({
            modalOpen: true
        });
    }

    this.render = function() {
        return (
            <div className="UserStatus">
                <div className={"name"}>{localStorage.getItem('username') || "Guest"}/{localStorage.getItem('company') || "I2G"}</div>
                <div className={"logout-btn"} style={{cursor: 'pointer'}} onClick = {(e)=>{this.openModal();}}>Logout</div>
                <div className={"user-picture"}>{localStorage.getItem('username') || "Guest"}</div>

                <CenteredModal active={this.state.modalOpen} onCancel={()=>{this.onCancelModal();}}>
                    <div className={'header-dialog'}>Confirm logout?</div>
                    <div className="content-dialog">
                        Changes you made may be not saved.
                    </div>
                    <div className="footer-dialog">
                        <div className="btn-next" onClick = {()=>{this.onCancelModal();}}>Cancel</div>
                        <div className="btn-next" onClick = {()=>{this.logout();}} style={{background: '#4B7DEF', color: '#fff'}}>Logout</div>
                    </div>
                </CenteredModal>
            </div>
        );
    }
}

UserStatus.prototype = Object.create(React.Component.prototype);
