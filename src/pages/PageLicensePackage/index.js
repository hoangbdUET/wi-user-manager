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
const {toast} = require('react-toastify');

function myStringify(item) {
    return Object.values(item).filter(value => typeof value !== 'object').join(',').toLowerCase();
    // return JSON.stringify(item).toLowerCase()
}

function LicensePackage(props) {
    React.Component.call(this, props);

    this.state = {
        licensePackages: [],
        features: [],
        isAddingLicensePackage: false,
        isEditingLicensePackage: false,
        isDeletingLicensePackage: false,
        selectedLicensePackage: null,
        filter: ""
    };

    this.componentDidMount = function () {
        listPackage.call(this);
        listFeature.call(this);
    };

    this.listPackage = listPackage.bind(this);

    function listPackage() {
        api.getLicensePackages().then(packages => {
            this.setState({licensePackages: packages || []});
        });
    }

    this.listFeature = listFeature.bind(this);

    function listFeature() {
        api.getFeatures({}).then(features => {
            this.setState({features: features || []});
        });
    }

    this.deleteLicensePackage = deleteLicensePackage.bind(this);

    function deleteLicensePackage(selectedLicensePackage) {
        api.deleteLicensePackage(selectedLicensePackage).then(() => {
            listPackage.call(this);
            this.setState({isDeletingLicensePackage: false});
        }).catch(e => {
            toast.error(e);
        })
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

    this.filter = function (items) {
        return items
             .filter((item) => {
                let str = myStringify(item);
                return str.includes((this.state.filter||"").toLowerCase());
            });
    }


    this.editLicensePackage = editLicensePackage.bind(this);

    function editLicensePackage(item) {
        let payload = {
            name: item.name,
            description: item.description,
            idLicensePackage: item.selectedPackage.idLicensePackage,
            i2g_feature: item.featuresInPackage.map(f => {
                return {idFeature: f.idFeature}
            }) || []
        };
        api.updateLicensePackage(payload).then(() => {
            toast.success("Success");
            this.setState({isEditingLicensePackage: false});
            listPackage.call(this);
        }).catch(e => {
            toast.error(e);
        })
    }

    this.render = function () {
        if (apiUser.getRole() > 0) return <Redirect to={{pathname: "/", from: "/"}}/>;
        if (!apiUser.isLoggedIn()) return <Redirect to={{pathname: "/login", from: "/license-package"}}/>;
        return (
            <div className={"LicensePackage"} style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
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
                    <ListLicensePackage itemPerPage={10} items={this.filter(this.state.licensePackages || [])} actions={[
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
                    ]}  searchStr={this.state.filter}
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
                                             featuresInPackage={this.getFeaturesInPackage(this.state.selectedLicensePackage)}
                                             featuresNotInPackage={this.getFeaturesNotInPackage(this.state.features, this.state.selectedLicensePackage)}
                                             selectedPackage={Object.assign({}, this.state.selectedLicensePackage)}
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


    this.getFeaturesInPackage = function (selectedLicensePackage) {
        // if (!group) return;
        // console.log(_groups);
        // let oriGroup = (_groups|| []).find(g => g.idGroup === group.idGroup);
        // if (oriGroup) return oriGroup.users;
        // else return [];
        return (selectedLicensePackage || {}).i2g_features || [];
    }

    this.getFeaturesNotInPackage = function (features, selectedLicensePackage) {
        let featuresInPackage = this.getFeaturesInPackage(selectedLicensePackage);
        return (features || []).filter((feature) => {
            return featuresInPackage.findIndex((f) => f.idFeature === feature.idFeature) < 0;
        });
    }
}

LicensePackage.prototype = Object.create(React.Component.prototype);