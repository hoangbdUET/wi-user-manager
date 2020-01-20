module.exports = UserInfoModal;
const React = require("react");
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const PropTypes = require('prop-types');
require('./style.less');
const Editable = require('../../components/Editable');
const DropDown = require('../../components/DropDown');
const apiUser = require('./../../services/apiUser');

const SearchableDropdown = require('./../../components/SearchableDropdown').default;

const apiService = require('./../../services/apiClient');
const userService = require('./../../services/apiUser');

const { toast } = require('react-toastify');

UserInfoModal.protoTypes = {
    isOpen: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};

function UserInfoModal(props) {
    React.Component.call(this, props);
    this.state = {
        username: "",
        email: "",
        fullname: "",
        status: "",
        role: "",
        idLicensePackage: "",
        password: "",
        repassword: "",
        lefts: [],
        tabIdx: 0,
        groups: [],
        removeGroups: [],
        idCompany: null
    };

    this.status = [
        {
            display: "Active",
            value: "Active"
        },
        {
            display: "Inactive",
            value: "Inactive"
        }
    ];

    this.role = [
        {
            value: 0,
            display: "System Manager"
        },
        {
            value: 1,
            display: "Company Admin"
        },
        {
            value: 2,
            display: "Normal User"
        },
        {
            value: 3,
            display: "Company Storage (Full permission)"
        },
        {
            value: 3.1,
            display: "Company Storage (Upload only)"
        },
        {
            value: 3.2,
            display: "Company Storage (Organize only)"
        },
        {
            value: 3.3,
            display: "Company Storage (View only)"
        }
    ];

    this.updateProps = function () {
        
        //console.log(this.props.licensePackages);
        this.setState({
            idUser: (this.props.user || {}).idUser,
            username: (this.props.user || {}).username,
            email: (this.props.user || {}).email,
            fullname: (this.props.user || {}).fullname,
            status: (this.props.user || {}).status,
            role: (this.props.user || {}).role,
            idLicensePackage: (this.props.user || {}).idLicensePackage,
            idCompany: (this.props.user || {}).idCompany,
            lefts: [],
            groups: Object.assign([], (this.props.user || {}).groups || []),
            removeGroups: [],
            tabIdx: 0,
            password: "",
            repassword: ""
        });
        apiService.getListLicensePackageLeft()
            .then((rs) => {
                this.setState({
                    lefts: rs
                })
            })
            .catch((e) => {
                toast.error(e);
            })
    }

    this.getOutOfGroup = function(idx) {
        this.setState((state)=>{
            state.removeGroups.push({idGroup: state.groups[idx].idGroup, idUser: (this.props.user || {}).idUser});
            state.groups.splice(idx, 1);
            return {
                removeGroups: state.removeGroups,
                groups: state.groups
            };
        });
    }


    this.render = function () {
        return (
            <Modal isOpen={this.props.isOpen} portalClassName="ModalStyle"
                className="UserInfoModal" overlayClassName="modal-backdrop"
                onAfterOpen={() => {
                    this.updateProps();
                }}>
                <div className="header-dialog-tab">
                    <div className="title-dialog">Edit User {this.state.username}</div>
                    <div className="tab-controls">
                        <div className={this.state.tabIdx == 0 ? "active-tab" : ""} onClick={() => this.setState({
                            tabIdx: 0
                        })}>General</div>
                        <div className={this.state.tabIdx == 1 ? "active-tab" : ""} onClick={() => this.setState({
                            tabIdx: 1
                        })}>Groups</div>
                    </div>
                </div>
                <div className="content-dialog">
                    <div style={{ flex: 1, overflow: 'visible' }}>
                        {
                            this.state.tabIdx == 0 ?
                            <div>
                            <div className="fieldset">
                                <div>Username</div>
                                <Editable value={this.state.username}
                                    formatValue={(v) => ((v === null || v === undefined || v.length === 0) ? "[empty]" : v)}
                                    onValueChanged={(value) => this.setState((state) => {
                                        return {
                                            username: value
                                        };
                                    })}
                                    disabled={true}
                                />
                            </div>
                            <div className="fieldset">
                                <div>Password</div>
                                <Editable value={this.state.password}
                                    formatValue={(v) => {
                                        if (v.length === 0) {
                                            return '[empty]';
                                        }
                                        return new Array(v.length).fill('*', 0, v.length);
                                    }}
                                    onValueChanged={(value) => this.setState((state) => {
                                        return {
                                            password: value
                                        };
                                    })}
                                    hideText
                                />
                            </div>
                            <div className="fieldset">
                                <div>Re-password</div>
                                <Editable value={this.state.repassword}
                                    formatValue={(v) => {
                                        if (v.length === 0) {
                                            return '[empty]';
                                        }
                                        return new Array(v.length).fill('*', 0, v.length);
                                    }}
                                    onValueChanged={(value) => this.setState((state) => {
                                        return {
                                            repassword: value
                                        };
                                    })}
                                    hideText
                                />
                            </div>
                            <div className="fieldset">
                                <div>Email</div>
                                <Editable value={this.state.email}
                                    formatValue={(v) => ((v === null || v === undefined || v.length === 0) ? "[empty]" : v)}
                                    onValueChanged={(value) => this.setState((state) => {
                                        return {
                                            email: value
                                        };
                                    })}
                                />
                            </div>
                            <div className="fieldset">
                                <div>Full Name</div>
                                <Editable value={this.state.fullname}
                                    formatValue={(v) => ((v === null || v === undefined || v.length === 0) ? "[empty]" : v)}
                                    onValueChanged={(value) => this.setState((state) => {
                                        return {
                                            fullname: value
                                        };
                                    })}
                                />
                            </div>
                            {userService.getRole() > 0 ? 
                                <React.Fragment></React.Fragment>
                                :
                                <div className="fieldset">
                                    <div>Company:</div>
                                    <SearchableDropdown choices={this.props.companies.map((e) => ({ value: e.idCompany, display: e.name }))}
                                        value={this.state.idCompany} onChange={(e) => { this.setState({ idCompany: e }) }}
                                    />
                                </div>
                            }
                            <div className="fieldset">
                                <div>Role:</div>
                                <SearchableDropdown maxHeight="200px"
                                    choices={this.role.filter((e) => e.value >= apiUser.getRole())} value={this.state.role} onChange={(e) => { this.setState({ role: e }); }}
                                />
                            </div>
                            <div className="fieldset">
                                <div>License:</div>
                                <SearchableDropdown choices={this.state.lefts.map((e) => ({ value: e.idLicensePackage, display: e.name + " (" + e.left + " left)" }))}
                                    value={this.state.idLicensePackage} onChange={(e) => { this.setState({ idLicensePackage: e }) }}
                                />
                            </div>
                            <div className="fieldset">
                                <div>Status:</div>
                                <SearchableDropdown
                                    choices={this.status} value={this.state.status} onChange={(e) => { this.setState({ status: e }); }}
                                />
                            </div>
                            </div>
                            :
                            <div>
                                <div style={{height: "400px", overflow: "auto", margin: "30px"}}>
                                    {
                                        this.state.groups.map((e, idx)=>{
                                        return <div key={idx} className={"group-element"}>{e.name}<span onClick={()=>{this.getOutOfGroup(idx)}} className={"ti ti-close"}></span></div>
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="footer-dialog">
                    <div className="btn-next" onClick={(e) => {
                        props.onOk(Object.assign({}, this.state));
                    }} style={{ background: '#4B7DEF', color: '#fff' }}>Ok
                    </div>
                    <div className="btn-next" onClick={props.onCancel}>Close</div>
                </div>

            </Modal>
        );
    };
}

UserInfoModal.prototype = Object.create(React.Component.prototype);