module.exports = PageGroup;
require('./style.less');
const React = require('react');
const ListGroup = require('../../components/ListGroup');
const { GroupInfoModal, ConfirmationModal, NewGroupModal } = require('../../dialogs');
const api = require('../../services/apiClient');
const LeftNavigation = require('./../LeftNavigation');
const Redirect = require('react-router-dom').Redirect;
const apiUser = require('../../services/apiUser');
const UserStatus = require('../../components/UserStatus');

function PageGroup(props) {
    React.Component.call(this, props);
    this.state = {
        items: [],
        companies: [],
        isAddingGroup: false,
        isEditingGroup: false,
        isDeletingGroup: false,
        filter: ""
    }
    let _groups;

    this.componentDidMount = function () {
        this.initListFromServer();
        this.props.resetFilter();
    }


    this.initListFromServer = function () {
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
            });
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

    this.getItemList = function () {
        if (this.state.filter == "") return this.state.items;
        return this.state.items.filter((item) => {
            return JSON.stringify(item).toLowerCase().includes(this.state.filter.toLowerCase());
        });
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
            this.initListFromServer();
        }).catch(e => console.error(e));
    }

    this.addGroup = addGroup.bind(this);

    function addGroup(aGroup) {
        let { company, ...group } = aGroup;
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
        if (!apiUser.isLoggedIn()) return <Redirect to={{pathname:"/login", from:"/group"}} />;
        return (
            <div className={"PageGroup"} style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <LeftNavigation routes={
                    [

                        { path: "/user", label: "User" },
                        { path: "/group", label: "Group" },
                        { path: "/company", label: "Company" },
                        { path: "/project", label: "Project" },
                        { path: '/license-package', label: "License Package" }
                    ]
                } />
                <div style={{ flex: 1 }}>
                    <div className={"top-bar"}>
                        <div className={"search-box"}>
                            <div style={{ marginRight: '10px', color: '#000' }} className={"ti ti-search"} />
                            <input placeholder="Filter" value={this.state.filter} onChange={(e) => {
                                this.setState({ filter: e.target.value });
                            }} />
                        </div>
                        <UserStatus />
                    </div>

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
                        handler: () => { this.initListFromServer(); },
                        show: true
                    }]} items={this.getItemList()} />
                    {/* <GroupInfoModal isOpen={this.state.isAddingGroup}
                            onOk={this.addGroup}
                            onCancel={() => this.setState({isAddingGroup: false})} companies={this.state.companies}
                            users={this.state.users}
                            selectedCompany={getCompany(this.state.selectedGroup)}/> */}
                    <GroupInfoModal isOpen={this.state.isEditingGroup} group={this.state.selectedGroup} groupUsers={getGroupUsers(this.state.selectedGroup)}
                        onOk={() => {
                            this.initListFromServer();
                            this.setState({
                                isEditingGroup: false
                            });
                        }}
                        onCancel={() => this.setState({ isEditingGroup: false })} companies={this.state.companies}
                        users={getUserNotInGroup(this.state.users, this.state.selectedGroup)}
                        selectedCompany={getCompany(this.state.selectedGroup)}
                        selectedGroupId={(this.state.selectedGroup || {}).idGroup} />
                    <ConfirmationModal isOpen={this.state.isDeletingGroup}
                        title="Confirmation" message="Are you sure to delete this group?"
                        onOk={() => {
                            this.deleteGroup(this.state.selectedGroup);
                        }}
                        onCancel={() => this.setState({ isDeletingGroup: false })} />
                    <NewGroupModal
                        isOpen={this.state.isAddingGroup}
                        onCancel={() => this.setState({ isAddingGroup: false })}
                        onOk={() => {
                            this.initListFromServer();
                            this.setState({ isAddingGroup: false });
                        }}
                        companies={this.state.companies} />
                </div>
            </div>
        );
    }

    function getCompany(group) {
        if (!group) return;
        let oriGroup = (_groups|| []).find(g => g.idGroup === group.idGroup);
        if (oriGroup) return oriGroup.company;
        else return {};
    }
    function getGroupUsers(group) {
        if (!group) return;
        let oriGroup = (_groups|| []).find(g => g.idGroup === group.idGroup);
        if (oriGroup) return oriGroup.users;
        else return [];
    }
    function isExistUserInList(users, userId) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].idUser === userId) return true;
        }
        return false;
    }
    function getUserNotInGroup(users, selectedGr) {
        let originGr = (_groups || []).find(g => g.idGroup === (selectedGr || {}).idGroup);
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
