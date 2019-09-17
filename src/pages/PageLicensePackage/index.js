module.exports = LicensePackage;
const React = require('react');
require('./style.less');
let ListLicensePackage = require('../../components/ListLicensePackage');
const LeftNavigation = require('./../LeftNavigation');
const api = require('../../services/apiClient');
const {ConfirmationModal, LicensePackageInfoModal, LicensePackageNewModal} = require('../../dialogs');
const Redirect = require('react-router-dom').Redirect;
const apiUser = require('../../services/apiUser');
const UserStatus = require('../../components/UserStatus');


function LicensePackage(props) {
    this.state = {
        items: [],
        isAddingLicensePackage: false,
        isEditingLicensePackage: false,
        isDeletingLicensePackage: false,
        selectedLicensePackage: null
    };
    this.componentDidMount = function () {
        listPackage.call(this);
    };

    this.listPackage = listPackage.bind(this);

    function listPackage() {
        api.getLicensePackages().then(packages => {
            this.setState({items: packages || []});
        });
    }

    this.deleteLicensePackage = deleteLicensePackage.bind(this);

    function deleteLicensePackage(selectedLicensePackage) {
        console.log("Call delete ", selectedLicensePackage);
    }

    this.newLicensePackage = newLicensePackage.bind(this);

    function newLicensePackage(item) {
        api.newLicensePacage(item).then(() => {
            listPackage.call(this);
            this.setState({isAddingLicensePackage: false})
        }).catch(e => {
            console.log(e)
        })
    }

    this.editLicensePackage = editLicensePackage.bind(this);

    function editLicensePackage(item) {
        console.log(item)
        api.updateLicensePackage(item).then(() => {
            listPackage.call(this);
            this.setState({isEditingLicensePackage: false});
        }).catch(e => {
            console.log(e);
        })
    }

    this.render = function () {
        if (!apiUser.isLoggedIn()) return <Redirect to={{pathname: "/login", from: "/license-package"}}/>;
        return (
            <div className={"LicensePackage"} style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                <LeftNavigation routes={
                    [

                        {path: "/user", label: "User"},
                        {path: "/group", label: "Group"},
                        {path: "/company", label: "Company"},
                        {path: "/project", label: "Project"},
                        {path: '/license-package', label: "License Package"}
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
                    <ListLicensePackage itemPerPage={10} items={this.state.items} actions={[
                        {
                            name: "Add", handler: () => {
                                this.setState({
                                    isAddingLicensePackage: true
                                });
                            }, show: true
                        },
                        {
                            name: "Edit", handler: (selectedLicensePackage) => {
                                this.setState({
                                    selectedLicensePackage: selectedLicensePackage,
                                    isEditingLicensePackage: true
                                });
                            }, show: ([selectedLicensePackage]) => (!!selectedLicensePackage)
                        },
                        {
                            name: "Delete", handler: (selectedLicensePackage) => {
                                this.setState({
                                    selectedLicensePackage: selectedLicensePackage,
                                    isDeletingLicensePackage: true
                                });
                            }, show: ([selectedLicensePackage]) => (!!selectedLicensePackage)
                        },
                        {name: "Refresh", handler: listPackage.bind(this), show: true}
                    ]}
                    />
                    <ConfirmationModal isOpen={this.state.isDeletingLicensePackage}
                                       title="Confirmation" message="Are you sure to delete this package?"
                                       onOk={() => {
                                           this.listPackage();
                                           this.deleteLicensePackage(this.state.selectedLicensePackage);
                                       }}
                                       onCancel={() => this.setState({isDeletingLicensePackage: false})}
                    />
                    <LicensePackageInfoModal isOpen={this.state.isEditingLicensePackage}
                                             onCancel={() => {
                                                 this.setState({isEditingLicensePackage: false});
                                                 this.listPackage();
                                             }}
                                             onOk={item => this.editLicensePackage(item)}
                                             item={this.state.selectedLicensePackage}
                    />
                    <LicensePackageNewModal isOpen={this.state.isAddingLicensePackage}
                                            onCancel={() => {
                                                this.setState({isAddingLicensePackage: false});
                                                this.listPackage();
                                            }}
                                            onOk={item => this.newLicensePackage(item)}
                    />
                </div>
            </div>
        );
    }
}

LicensePackage.prototype = Object.create(React.Component.prototype);