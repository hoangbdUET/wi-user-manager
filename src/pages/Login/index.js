module.exports = Login;
const React = require('react');
const apiUser = require('./../../services/apiUser');
const Redirect = require('react-router-dom').Redirect;
const {toast} = require('react-toastify');
require('./style.less');

function Login(props) {
    React.Component.call(this, props);
    
    this.state = {
        username: "",
        password: "",
        changed: true
    }

    this.componentDidMount = function() {
        this.setState({
            username: "",
            password: ""
        });
    }

    this.login = function() {
        apiUser.login(this.state.username, this.state.password)
        .then((res)=>{
            console.log(res);
            toast.success('Login successfully');
            // this.props.location.pathname = this.props.location.from || '/';
            // window.location.href = this.props.from || "/";
            this.props.history.push(this.props.location.from || '/');
        })
        .catch((e)=>{
            toast.error(e);
        });
        this.setState({
            username: "",
            password: ""
        });
    }

    this.render = function() {
        if (apiUser.isLoggedIn()) {
            return <Redirect to={this.props.location.from || '/'} />
        }
        return (
            <div className="dialog-login" onKeyDown = {(e)=>{if (e.keyCode == 13) this.login();}}>
                <div className="left-dialog-login">

                </div>
                <div className="right-dialog-login">
                    <div style={{marginBottom:'10px'}}>Login to</div>
                    <div style={{marginBottom:'40px', fontWeight: 'bold', fontSize:'20px'}}>User Manager</div>
                    <input className="input-login" placeholder="Username" value = {this.state.username} onChange = {(e) => {this.setState({username: e.target.value})}}/>
                    <input className="input-login" placeholder="Password" type="password" value = {this.state.password} onChange = {(e) => {this.setState({password: e.target.value})}}/>
                    <input className="submit-login" type="Submit" value="Login" onChange={(e)=>{e.preventDefault()}} onClick={(e)=>{this.login();}}/>
                </div>
            </div>
        );
    }
}

Login.prototype = Object.create(React.Component.prototype);
