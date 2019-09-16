module.exports = PageProject;
require('./style.less');
const React = require('react');
const ListProject = require('../../components/ListProject');
const api = require("../../services/apiClient");

function PageProject() {
    this.state = {
        items: [],
        sharedStatus: 'none'
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
                    this.setState({
                        items: projects
                    });
                });
            } else {
                //nothing
            }
        })
    }

    this.getItemList = function() {
        if (this.props.filter == "") return this.state.items;
        return this.state.items.filter((item)=>{
            return JSON.stringify(item).toLowerCase().includes(this.props.filter.toLowerCase());
        });
    }

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

    this.render = function () {
        return (<div className={"PageProject"}>
            <ListProject
                itemPerPage={10} actions={[
                {
                    name: "Stop Sharing", handler: (selectedProject) => {
                        return stopSharingProjectClicked(selectedProject);
                    },
                    show: ([selectedProject]) => (selectedProject? !!selectedProject.shareKey : false)
                },
                {
                    name: "Start Sharing", handler: (selectedProject) => {
                        return startSharingProjectClicked(selectedProject);
                    },
                    show: ([selectedProject]) => (selectedProject ? (!selectedProject.shareKey): false)
                },
                {name: "Refresh", handler: self.listProjects, show: true}

            ]} items={this.getItemList()}
            />
        </div>)
    }
}

PageProject.prototype = Object.create(React.Component.prototype);
