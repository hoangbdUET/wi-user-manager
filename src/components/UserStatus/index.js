module.exports = UserStatus;
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
            <React.Fragment>
                <div className={"name"}>{localStorage.getItem('username') || "Guest"}/{localStorage.getItem('company') || "I2G"}</div>
                <div className={"logout-btn"} style={{cursor: 'pointer'}} onClick = {(e)=>{
                    this.openModal();
                }}>Logout</div>
                <div className={"user-picture"} />

            <CenteredModal active={this.state.modalOpen} onCancel={()=>{this.onCancelModal();}}>
                <div>
                    <h1>Confirm logout ?</h1>
                    <button onClick = {()=>{this.logout();}}>Yes</button>
                    <button onClick = {()=>{this.onCancelModal();}}>No</button>
                </div>
            </CenteredModal>
            </React.Fragment>
        );
    }
}

UserStatus.prototype = Object.create(React.Component.prototype);
