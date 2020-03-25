module.exports = PageProject;
require('./style.less');
const React = require('react');
const ListProject = require('../../components/ListProject');
const api = require("../../services/apiClient");
const LeftNavigation = require('./../LeftNavigation');
const Redirect = require('react-router-dom').Redirect;
const apiUser = require('../../services/apiUser');
const UserStatus = require('../../components/UserStatus');

function myStringify(item) {
    return Object.values(item).filter(value => typeof value !== 'object').join(',').toLowerCase();
    // return JSON.stringify(item).toLowerCase()
}

function PageProject() {
    this.state = {
        items: [],
        sharedStatus: 'none',
        filter: ""
    };
    this.componentDidMount = function () {
        self.listProjects.call(this);
        this.props.resetFilter();
    };
    // this.listProjects = listProjects.bind(this);
    let self = this;
    this.listProjects = function () {
        api.getUsersPromise().then(users => {
            if (users) {
                users = users.map(u => (u.username));
                api.getProjectsPromise(users).then(projects => {
                    self.setState({
                        items: projects
                    });
                });
            } else {
                //nothing
            }
        })
    }

    // this.getItemList = function () {
    //     if (this.state.filter == "") return this.state.items;
    //     return this.state.items.filter((item) => {
    //         return JSON.stringify(item).toLowerCase().includes(this.state.filter.toLowerCase());
    //     });
    // }

    this.startSharingProject = startSharingProjectClicked.bind(this);

    function startSharingProjectClicked(selectedProject) {
        if (!selectedProject) return;
        console.log("Start sharing ", selectedProject);
        api.startSharingProject(selectedProject).then(() => {
            self.listProjects()
        })
    }

    this.stopSharingProjectClicked = stopSharingProjectClicked.bind(this);

    function stopSharingProjectClicked(selectedProject) {
        if (!selectedProject) return;
        console.log("Stop sharing ", selectedProject);
        api.stopSharingProject(selectedProject).then(() => {
            self.listProjects()
        })
    }

    this.filter = function (items) {
        return items
             .filter((item) => {
                let str = myStringify(item);
                return str.includes((this.state.filter||"").toLowerCase());
            });
    }
    

    this.render = function () {
        if (!apiUser.isLoggedIn()) return <Redirect to={{pathname:"/login", from:"/project"}} />;
        return (
            <div className={"PageProject"} style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <LeftNavigation routes={
                    [

                        { path: "/user", label: "User" },
                        { path: "/group", label: "Group" },
                        { path: "/company", label: "Company" },
                        { path: "/project", label: "Project" },
                        { path: '/license-package', label: "License Package" }
                    ]
                } />
                <div style={{ width: 'calc(100vw - 102px)', display: 'flex', flexDirection: 'column' }}>
                    <div className={"top-bar"}>
                        <div className={"search-box"}>
                            <div style={{ marginRight: '10px', color: '#000' }} className={"ti ti-search"} />
                            <input placeholder="Filter" value={this.state.filter} onChange={(e) => {
                                this.setState({ filter: e.target.value });
                            }} />
                        </div>
                        <UserStatus />
                    </div>
                    <ListProject
                        itemPerPage={10} actions={[
                            {
                                name: "Stop Sharing", handler: (selectedProject) => {
                                    return stopSharingProjectClicked(selectedProject);
                                },
                                show: ([selectedProject]) => (selectedProject ? !!selectedProject.shareKey : false)
                            },
                            {
                                name: "Start Sharing", handler: (selectedProject) => {
                                    return startSharingProjectClicked(selectedProject);
                                },
                                show: ([selectedProject]) => (selectedProject ? (!selectedProject.shareKey) : false)
                            },
                            { name: "Refresh", handler: self.listProjects, show: true }

                        ]} items={this.filter(this.state.items || [])} searchStr={this.state.filter}
                    />
                </div>
            </div>
        )
    }
}

PageProject.prototype = Object.create(React.Component.prototype);
