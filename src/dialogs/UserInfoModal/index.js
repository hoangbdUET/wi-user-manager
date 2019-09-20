module.exports = UserInfoModal;
const React = require("react");
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const PropTypes = require('prop-types');
require('./style.less');
const Editable = require('../../components/Editable');
const DropDown = require('../../components/DropDown');

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
        idLicensePackage: ""
    };

    this.status = [
        {
            statusName: "Active",
            status: "Active"
        },
        {
            statusName: "Inactive",
            status: "Inactive"
        }
    ];

    this.role = [
        {
            role: 0,
            roleName: "System Manager"
        },
        {
            role: 1,
            roleName: "Company Admin"
        },
        {
            role: 2,
            roleName: "Normal User"
        },
        {
            role: 3,
            roleName: "Admin Storage"
        }
    ];

    this.updateProps = function() {
        // console.log(this.props.user);
        console.log(this.props.licensePackages);
        this.setState({
            username: (this.props.user||{}).username,
            email: (this.props.user||{}).email,
            fullname: (this.props.user||{}).fullname,
            status: (this.props.user||{}).status,
            role: (this.props.user||{}).role,
            idLicensePackage: (this.props.user||{}).idLicensePackage
        });
    }


    this.render = function() {
        return (
            <Modal isOpen={this.props.isOpen} portalClassName="ModalStyle" 
                className="UserInfoModal" overlayClassName="modal-backdrop"
                onAfterOpen = {()=>{this.updateProps();}}>
                <h4>New User</h4>
                <div className="content-dialog">
                    <div style={{flex: 1, overflow: 'visible'}}>
                        <div className="fieldset">
                            <div>Username</div>
                            <Editable   value={this.state.username} 
                                        formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)}
                                        onValueChanged={(value) => this.setState((state)=>{
                                            return {
                                                username: value
                                            };
                                        })}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Email</div>
                            <Editable   value={this.state.email} 
                                        formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)}
                                        onValueChanged={(value) => this.setState((state)=>{
                                            return {
                                                email: value
                                            };
                                        })}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Full Name</div>
                            <Editable   value={this.state.fullname} 
                                        formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)}
                                        onValueChanged={(value) => this.setState((state)=>{
                                            return {
                                                fullname: value
                                            };
                                        })}
                            />
                        </div>
                        <div className="fieldset">
                            <div>License:</div>
                            <DropDown  getItem={(license) => (
                                <div style={{ height: '18px', display: 'flex', alignItems: 'center' }}>{license ? license.name : "[select license]"}</div>)}
                                items = {this.props.licensePackages}
                                itemHeight={18}
                                selectedItem={this.props.licensePackages.find((e)=>e.idLicensePackage === this.state.idLicensePackage)}
                                onItemClicked = {(license)=>{
                                    this.setState((state)=>{
                                        return {
                                            idLicensePackage: license.idLicensePackage
                                        }
                                    });
                                }}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Status:</div>
                            <DropDown  
                                getItem={(status) => 
                                    <div style={{ height: '18px', display: 'flex', alignItems: 'center' }}>{status ? status.statusName : "[select status]"}</div>
                                }
                                items = {this.status}
                                itemHeight={18}
                                selectedItem={this.status.find((e)=>e.status === this.state.status) || {}}
                                // disableSearch={true}
                                onItemClicked = {(status)=>{
                                    this.setState({
                                        status: status.status
                                    });
                                }}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Role:</div>
                            <DropDown  
                                getItem={(role) => 
                                    <div style={{ height: '18px', display: 'flex', alignItems: 'center' }}>{role ? role.roleName : "[select role]"}</div>
                                }
                                items = {this.role}
                                itemHeight={18}
                                selectedItem={this.role.find((e)=>e.role === this.state.role) || {}}
                                // disableSearch={true}
                                onItemClicked = {(role)=>{
                                    this.setState({
                                        role: role.role
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="footer-dialog">
                    <div className="btn-next" onClick={(e) => {props.onOk(Object.assign({}, this.state));}}>Ok</div>
                    <div className="btn-next" onClick={props.onCancel}>Close</div>
                </div>
                
            </Modal>
        );
    };
}

UserInfoModal.prototype = Object.create(React.Component.prototype);