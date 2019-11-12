module.exports = PageFeature;
require('./style.less')
const React = require('react');
const api = require('../../services/apiClient');
const ListFeature = require('../../components/ListFeature')
const LeftNavigation = require('../LeftNavigation');
const Redirect = require('react-router-dom').Redirect;
const apiUser = require('../../services/apiUser');
const UserStatus = require('../../components/UserStatus');
const {toast} = require('react-toastify');

function PageFeature(pops) {
    this.state = {
        items: [],
        filter: ""
    };
    let self = this;
    this.componentDidMount = function () {
        self.getAllFeatures();
    };
    this.deleteFeature = function (selectedFeature) {
        api.deleteFeature({idFeature: selectedFeature.idFeature}).then(() => {
            self.getAllFeatures();
        }).catch(err => {
            toast.error(err);
        })
    };
    this.getAllFeatures = function () {
        api.getFeatures().then(f => {
            self.setState({items: f})
        })
    };
    this.getItemList = function () {
        if (this.state.filter === "") return this.state.items;
        return this.state.items.filter((item) => {
            return JSON.stringify(item).toLowerCase().includes(this.state.filter.toLowerCase());
        });
    };
    this.render = function () {
        if (!apiUser.isLoggedIn()) return <Redirect to={{pathname: "/login", from: "/company"}}/>;
        return (<div className={"PageFeature"} style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
            <LeftNavigation routes={
                [
                    {path: "/user", label: "User"},
                    {path: "/group", label: "Group"},
                    {path: "/company", label: "Company"},
                    {path: "/project", label: "Project"},
                    {path: '/license-package', label: "License Package"},
                    {path: '/feature', label: "Feature"}
                ]
            }/>
            <div style={{width: 'calc(100vw - 102px)', display: 'flex', flexDirection: 'column'}}>
                <div className={"top-bar"}>
                    <div className={"search-box"}>
                        <div style={{marginRight: '10px', color: '#000'}} className={"ti ti-search"}/>
                        <input placeholder="Filter" value={this.state.filter} onChange={(e) => {
                            this.setState({filter: e.target.value});
                        }}/>
                    </div>
                    <UserStatus/>
                </div>
                <ListFeature itemPerPage={10} items={this.getItemList()} actions={[
                    {
                        name: "Delete",
                        handler: selectedFeature => this.deleteFeature(selectedFeature),
                        show: ([selectedFeature]) => (!!selectedFeature)
                    },
                    {
                        name: "Import", handler: () => {
                            console.log("Import clicked")
                        }, show: true
                    },
                    {name: "Refresh", handler: self.getAllFeatures, show: true}
                ]} searchStr={this.state.filter}/>
            </div>
        </div>)
    }
}

PageFeature.prototype = Object.create(React.Component.prototype);