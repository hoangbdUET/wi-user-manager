module.exports = PageProject;
require('./style.less');
const React = require('react');
const ListProject = require('../../components/ListProject');
const api = require("../../services/apiClient");

function PageProject() {
    this.state = {
        items: [],
        selectedUser: {}
    };
    this.componentDidMount = function () {
        listProjects.call(this);
    };
    this.listProjects = listProjects.bind(this);

    function listProjects() {
        api.getProjectsPromise().then(projects => {
            this.setState({
                items: projects
            })
        })
    }

    this.render = function () {
        return (<div className={"PageProject"}>
            <ListProject
                itemPerPage={10} actions={[
                {name: "Refresh", handler: this.listProjects},
                {
                    name: "Stop Sharing", handler: () => {
                    }
                },
                {
                    name: "Start Sharing", handler: () => {
                    }
                }

            ]} items={this.state.items}
            />
        </div>)
    }
}

PageProject.prototype = Object.create(React.Component.prototype);
