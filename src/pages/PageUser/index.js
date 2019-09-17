module.exports = PageUser;
require('./style.less');
const React = require('react');
const api = require('../../services/apiClient');
const UserInfoModal = require('../../dialogs').UserInfoModal;
const ConfirmationModal = require('../../dialogs').ConfirmationModal;
const UserAddModal = require('../../dialogs').UserAddModal;
const ListUser = require('../../components/ListUser');
const { toast } = require('react-toastify');
const LeftNavigation = require('./../LeftNavigation');
const apiUser = require('../../services/apiUser');
const Redirect = require('react-router-dom').Redirect;
const UserStatus = require('../../components/UserStatus');

function PageUser(props) {
    React.Component.call(this, props);
    this.state = {
        items: [],
        companies: [],
        isAddingUser: false,
        isEditingUser: false,
        isDeletingUser: false,
        filter: ""
    };
    this.componentDidMount = function () {
        this.initFromServer();
    }

    this.initFromServer = function() {
        listUser.call(this);
        listCompanies.call(this);
    }

    this.getItemList = function () {
        if (this.state.filter == "") return (this.state.items || []);
        if (this.state.items.length)
            return this.state.items.filter((item) => {
                return JSON.stringify(item).toLowerCase().includes(this.state.filter.toLowerCase());
            });
        return [];
    }

    this.listUser = listUser.bind(this);

    function listUser() {
        api.getUsersPromise().then(users => {
            this.setState({ items: users })
        }).catch(err => {
            console.log(err);
        })
    }

    this.listCompanies = listCompanies.bind(this);

    function listCompanies() {
        api.getCompaniesPromise().then(companies => {
            this.setState({
                companies: companies
            });
        }).catch((e)=>{
            toast.error(e);
        })
    }

    this.callApiAddUser = callApiAddUser.bind(this);

    function callApiAddUser(user) {
        if (user.password != user.repassword) {
            toast.error('Your confirm password is not match');
            return;
        }
        api.newUser(user)
        .then((rs)=>{
            toast.success('Create user successfully');
            this.initFromServer();
            this.setState({
                isAddingUser: false
            });
        })
        .catch(e=>{toast.error(e);});
    }

    this.callApiUpdateUser = callApiUpdateUser.bind(this);

    function callApiUpdateUser(user) {
        console.log("call api edit user", user);
    }

    this.callApiDeleteUser = callApiDeleteUser.bind(this);

    function callApiDeleteUser(user) {
        console.log('run');
        api.deleteUser(user.idUser)
        .then((rs)=>{
            toast.success('Delete user successfully');
            this.initFromServer();
            this.setState({ isDeletingUser: false });
        })
        .catch(e=>{
            toast.error(e);
        });
    }

    this.startDeleteUser = startDeleteUser.bind(this);

    function startDeleteUser(selectedUser) {
        this.setState({ isDeletingUser: true, selectedUser: selectedUser });
        console.log("Delete ", selectedUser);
    }

    this.startAddUser = startAddUser.bind(this);

    function startAddUser() {
        this.setState({ isAddingUser: true });
    }

    function addUser(user) {
        console.log("Add user ", user);
    }

    this.startEditUser = startEditUser.bind(this);

    function startEditUser(user) {
        console.log("edit user", user)
        this.setState({ isEditingUser: true, selectedUser: user });
    }


    this.render = function () {
        if (!apiUser.isLoggedIn()) return <Redirect to={{pathname:"/login", from:"/user"}} />;
        return (
            <div className={"PageUser"} style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                <LeftNavigation routes={
                    [
                        { path: "/user", label: "User" },
                        { path: "/group", label: "Group" },
                        { path: "/company", label: "Company" },
                        { path: "/project", label: "Project" },
                        { path: '/license-package', label: "License Package" }
                    ]
                } />
                <div style={{width: 'calc(100vw - 102px)', display: 'flex', flexDirection: 'column'}}>
                    <div className={"top-bar"}>
                        <div className={"search-box"}>
                            <div style={{ marginRight: '10px', color: '#000' }} className={"ti ti-search"} />
                            <input placeholder="Filter" value={this.state.filter} onChange={(e) => {
                                this.setState({ filter: e.target.value });
                            }} />
                        </div>
                        <UserStatus />
                    </div>
                <ListUser itemPerPage={20} items={this.getItemList()}
                    actions={[{
                        name: "Add", handler: this.startAddUser, show: true
                    }, {
                        name: "Delete", handler: this.startDeleteUser, show: true
                    }, {
                        name: "Edit", handler: this.startEditUser, show: true
                    }, {
                        name: "Refresh", handler: this.listUser, show: true
                    }]}
                />
                <UserInfoModal isOpen={this.state.isEditingUser} onOk={this.callApiUpdateUser} action={"edit"}
                    onCancel={(e) => this.setState({ isEditingUser: false })} user={this.state.selectedUser} />
                <UserAddModal isOpen={this.state.isAddingUser} onOk={this.callApiAddUser} action={"add"}
                    onCancel={(e) => this.setState({ isAddingUser: false })} 
                    companies = {this.state.companies}/>
                <ConfirmationModal isOpen={this.state.isDeletingUser} title={"Confirmation"}
                    message={"Are you sure to delete selected user?"}
                    onCancel={() => this.setState({ isDeletingUser: false })}
                    onOk={() => this.callApiDeleteUser(this.state.selectedUser)}
                />
                </div>
            </div>
        )
    };
}

PageUser.prototype = Object.create(React.Component.prototype);