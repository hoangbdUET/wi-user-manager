module.exports = PageUser;
require('./style.less');
const React = require('react');
const api = require('../../services/apiClient');
const UserInfoModal = require('../../dialogs/UserInfoModal');
const ConfirmationModal = require('../../dialogs/ConfirmationModal');
const ListUser = require('../../components/ListUser');
const {toast} = require('react-toastify');

function PageUser(props) {
    React.Component.call(this, props);
    this.state = {
        items: [],
        isAddingUser: false,
        isEditingUser: false,
        isDeletingUser: false
    };
    this.componentDidMount = function() {
        listUser.call(this);
    }

    this.listUser = listUser.bind(this);

    function listUser() {
        api.getUsersPromise().then(users => {
            this.setState({items: users})
        }).catch(err => {
            console.log(err);
        })
    }

    this.callApiAddUser = callApiAddUser.bind(this);

    function callApiAddUser(user) {
        console.log("Call api adduser ", user);
    }

    this.callApiUpdateUser = callApiUpdateUser.bind(this);

    function callApiUpdateUser(user) {
        console.log("call api edit user", user);
    }

    this.callApiDeleteUser = callApiDeleteUser.bind(this);

    function callApiDeleteUser(user) {
        console.log("call api delete user", user);
        this.setState({isDeletingUser: false})
    }

    this.startDeleteUser = startDeleteUser.bind(this);

    function startDeleteUser(selectedUser) {
        this.setState({isDeletingUser: true, selectedUser: selectedUser});
        console.log("Delete ", selectedUser);
    }

    this.startAddUser = startAddUser.bind(this);

    function startAddUser() {
        this.setState({isAddingUser: true});
    }

    function addUser(user) {
        console.log("Add user ", user);
    }

    this.startEditUser = startEditUser.bind(this);

    function startEditUser(user) {
        console.log("edit user", user)
        this.setState({isEditingUser: true, selectedUser: user});
    }


    this.render = function () {
        return (
            <div className={"PageUser"}>
                <ListUser itemPerPage={20} items={this.state.items}
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
                               onCancel={(e) => this.setState({isEditingUser: false})} user={this.state.selectedUser}/>
                <UserInfoModal isOpen={this.state.isAddingUser} onOk={this.callApiAddUser} action={"add"}
                               onCancel={(e) => this.setState({isAddingUser: false})}/>
                <ConfirmationModal isOpen={this.state.isDeletingUser} title={"Confirmation"}
                                   message={"Are you sure to delete selected user?"}
                                   onCancel={() => this.setState({isDeletingUser: false})}
                                   onOk={() => this.callApiDeleteUser(this.state.selectedUser)}
                />
            </div>
        )
    };
}

PageUser.prototype = Object.create(React.Component.prototype);