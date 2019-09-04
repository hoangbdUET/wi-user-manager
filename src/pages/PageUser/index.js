module.exports = PageUser;
require('./style.less');
const React = require('react');
const api = require('../../services/apiClient');
const ListUser = require('../../components/ListUser');

function PageUser(props) {
    React.Component.call(this, props);
    this.state = {
        items: [],
        isAddingUser: false,
        isEditingUser: false,
        isDeletingUser: false
    };
    listUser.call(this);

    this.listUser = listUser.bind(this);

    function listUser() {
        api.getUsersPromise().then(users => {
            this.setState({items: users})
        }).catch(err => {
            console.log(err);
        })
    }

    this.deleteUser = deleteUser.bind(this);

    function deleteUser(selectedUser) {
        console.log("Delete ", selectedUser);
    }

    this.startAddUser = startAddUser.bind(this);

    function startAddUser() {

    }

    function addUser(user) {
        console.log("Add user ", user);
    }

    this.startEditUser = startEditUser.bind(this);

    function startEditUser(user) {
        console.log("edit user", user)
    }


    this.render = function () {
        return (
            <div className={"PageUser"}>
                <ListUser itemPerPage={1000} items={this.state.items}
                          actions={[{
                              name: "Add", handler: this.startAddUser
                          }, {
                              name: "Delete", handler: this.deleteUser
                          }, {
                              name: "Edit", handler: this.startEditUser
                          }, {
                              name: "Refresh", handler: this.listUser
                          }]}
                />
            </div>
        )
    };
}

PageUser.prototype = Object.create(React.Component.prototype);