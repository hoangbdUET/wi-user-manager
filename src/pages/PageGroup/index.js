module.exports = PageGroup;
require('./style.less');
const React = require('react');
const ListGroup = require('../../components/ListGroup');
const {GroupInfoModal, ConfirmationModal} = require('../../dialogs');
const api = require('../../services/apiClient');

function PageGroup(props) {
    React.Component.call(this, props);
    this.state = {
        items: [],
        companies: [],
        isAddingGroup: false,
        isEditingGroup: false,
        isDeletingGroup: false
    }
    let _groups;
    
    this.componentWillMount = function () {
        this.initListFromServer();
    }

    this.submitAndCloseModel = function() {
        this.initListFromServer();
        console.log('run');
        this.setState({
            isEditingGroup: false
        });
    }

    this.initListFromServer  = function () {
        console.log('init');
        listGroups.call(this);
        listCompanies.call(this);
        listUsers.call(this);
    }


    let transform = group => ({
        idGroup: group.idGroup,
        name: group.name,
        description: group.description,
        company: (group.company || {}).name || ""
    });

    this.listCompanies = listCompanies.bind(this);

    function listCompanies() {
        api.getCompaniesPromise().then(companies => {
            this.setState({
                companies: companies
            })
        })
    }

    this.listGroups = listGroups.bind(this);

    function listGroups() {
        api.getGroupsPromise().then(groups => {
            _groups = groups;
            this.setState({
                items: groups.map(g => transform(g))
            });
        }).catch(e => console.error(e));
    }

    this.listUsers = listUsers.bind(this);

    function listUsers() {
        api.getUsersPromise().then(users => {
            this.setState({
                users
            });
        })
    }

    this.deleteGroup = deleteGroup.bind(this);

    function deleteGroup(selectedGroup) {
        api.deleteGroupPromise(selectedGroup.idGroup).then(deletedGroup => {
            this.setState(state => {
                let idx = state.items.findIndex(g => g.idGroup === deletedGroup.idGroup);
                state.items.splice(idx, 1);
                return {
                    items: state.items,
                    isDeletingGroup: false
                }
            });
        }).catch(e => console.error(e));
    }

    this.addGroup = addGroup.bind(this);

    function addGroup(aGroup) {
        let {company, ...group} = aGroup;
        api.addGroupPromise(group).then(addedGroup => {
            addedGroup.company = company;
            _groups.push(addedGroup);
            this.setState(state => {
                state.items.push(transform(addedGroup));
                return {
                    items: state.items,
                    isAddingGroup: false
                }
            });
        }).catch(e => console.log(e))
    }

    this.render = function () {
        return (<div className="PageGroup">

            <ListGroup itemPerPage={10} actions={[{
                name: "Add",
                handler: (selectedGroup) => {
                    this.setState({
                        isAddingGroup: true
                    });
                }, show: true
            }, {
                name: "Delete",
                handler: (selectedGroup) => {
                    this.setState({
                        isDeletingGroup: true,
                        selectedGroup
                    })
                }, show: true
            }, {
                name: "Edit",
                handler: (selectedGroup) => {
                    this.setState({
                        isEditingGroup: true,
                        selectedGroup
                    })
                }, show: true
            }, {
                name: 'Manage Users',
                handler: this.listGroups,
                show: true
            }, {
                name: "Refresh",
                handler: this.listGroups,
                show: true
            }]} items={this.state.items}/>
            {/* <GroupInfoModal isOpen={this.state.isAddingGroup}
                            onOk={this.addGroup}
                            onCancel={() => this.setState({isAddingGroup: false})} companies={this.state.companies}
                            users={this.state.users}
                            selectedCompany={getCompany(this.state.selectedGroup)}/> */}
            <GroupInfoModal isOpen={this.state.isEditingGroup} group={this.state.selectedGroup} groupUsers={getGroupUsers(this.state.selectedGroup)}
                            onOk={() => this.submitAndCloseModel()}
                            onCancel={() => this.setState({isEditingGroup: false})} companies={this.state.companies}
                            users={getUserNotInGroup(this.state.users, this.state.selectedGroup)}
                            selectedCompany={getCompany(this.state.selectedGroup)}
                            selectedGroupId = {(this.state.selectedGroup||{}).idGroup} />
            <ConfirmationModal isOpen={this.state.isDeletingGroup}
                               title="Confirmation" message="Are you sure to delete this group?"
                               onOk={() => this.deleteGroup(this.state.selectedGroup)}
                               onCancel={() => this.setState({isDeletingGroup: false})}/>
        </div>)
    }

    function getCompany(group) {
        if (!group) return;
        let oriGroup = _groups.find(g => g.idGroup === group.idGroup);
        return oriGroup.company;
    }
    function getGroupUsers(group) {
        if (!group) return;
        let oriGroup = _groups.find(g => g.idGroup === group.idGroup);
        return oriGroup.users;
    }
    function isExistUserInList(users, userId) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].idUser === userId) return true;
        }
        return false;
    }
    function getUserNotInGroup(users, selectedGr) {
        let originGr = (_groups || []).find(g => g.idGroup === (selectedGr||{}).idGroup);
        if (!originGr)
            return users;
        let usersInGr = originGr.users;
        let usersNotInGr = users.filter((u) => {
            return !isExistUserInList(usersInGr, u.idUser);
        });
        return usersNotInGr;
    }
}

PageGroup.prototype = Object.create(React.Component.prototype);
