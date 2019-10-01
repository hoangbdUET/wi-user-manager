module.exports = UserInfoModal;
const React = require("react");
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const PropTypes = require('prop-types');
require('./style.less');
const Editable = require('../../components/Editable');
const DropDown = require('../../components/DropDown');
// const DropDownWithOutSearchBar = require('../../components/DropDownWithoutSearchBar');

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
        password: "",
        repassword: "",
        idCompany: null
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
        this.setState({
            username: "",
            email: "",
            fullname: "",
            status: "",
            role: "",
            password: "",
            repassword: "",
            idCompany: null
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
                            <Editable value={this.state.username} formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)}
                                        onValueChanged={(value) => this.setState((state)=>{
                                            return {
                                                username: value
                                            };
                                        })}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Full Name</div>
                            <Editable value={this.state.fullname} formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)}
                                            onValueChanged={(value) => this.setState((state)=>{
                                                return {
                                                    fullname: value
                                                };
                                            })}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Password</div>
                            <Editable   value={this.state.password} 
                                        formatValue={(v) => {
                                            if (v.length === 0) {
                                                return '[empty]';
                                            }
                                            return new Array(v.length).fill('*', 0, v.length);
                                        }}
                                        onValueChanged={(value) => this.setState((state)=>{
                                            return {
                                                password: value
                                            };
                                        })}
                                        hideText
                            />
                        </div>
                        <div className="fieldset">
                            <div>Re-password</div>
                            <Editable   value={this.state.repassword} 
                                        formatValue={(v) => {
                                            if (v.length === 0) {
                                                return '[empty]';
                                            }
                                            return new Array(v.length).fill('*', 0, v.length);
                                        }}
                                        onValueChanged={(value) => this.setState((state)=>{
                                            return {
                                                repassword: value
                                            };
                                        })}
                                        hideText
                            />
                        </div>
                        <div className="fieldset">
                            <div>Email</div>
                            <Editable value={this.state.email} formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)}
                                            onValueChanged={(value) => this.setState((state)=>{
                                                return {
                                                    email: value
                                                };
                                            })}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Company:</div>
                            <DropDown  getItem={(company) => (
                                <div style={{ height: '18px', display: 'flex', alignItems: 'center' }}>{company ? company.name : "[select company]"}</div>)}
                                items = {this.props.companies}
                                itemHeight={18}
                                selectedItem={this.props.companies.find((e) => e.idCompany === this.state.idCompany)}
                                onItemClicked = {(clickedCompany)=>{
                                    this.setState((state)=>{
                                        return {
                                            idCompany: clickedCompany.idCompany
                                        }
                                    });
                                }}
                            />
                        </div>
                        {/* <div className="fieldset">
                            <div>Status</div>
                            <Editable value={this.state.status} formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)}
                                            onValueChanged={(value) => this.setState((state)=>{
                                                return {
                                                    status: value
                                                };
                                            })}
                            />
                        </div> */}
                        <div className="fieldset">
                            <div>Status:</div>
                            <DropDown  
                                getItem={(status) => 
                                    <div style={{ height: '18px', display: 'flex', alignItems: 'center' }}>{status ? status.statusName : "[select status]"}</div>
                                }
                                items = {this.status}
                                itemHeight={18}
                                // disableSearch={true}
                                selectedItem={this.status.find((e) => e.status === this.state.status)}
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
                                // disableSearch={true}
                                selectedItem={this.role.find((e) => e.role === this.state.role)}
                                onItemClicked = {(role)=>{
                                    this.setState({
                                        role: role.role
                                    });
                                }}
                            />
                        </div>
                        {/* <div className="fieldset">
                            <div>Role</div>
                            <Editable value={this.state.role} formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)} 
                                            onValueChanged={(value) => this.setState((state)=>{
                                                return {
                                                    role: value
                                                };
                                            })}
                            />
                        </div> */}
                        {/* <div className="fieldset">
                            <div>Company:</div>
                            <DropDown  getItem={(company) => (
                                <div style={{ height: '18px' }}>{company ? company.name : "[select company]"}</div>)}
                                items = {this.props.companies}
                                itemHeight={18}
                                onItemClicked = {(clickedCompany)=>{
                                    this.setState((state)=>{
                                        return {
                                            idCompany: clickedCompany.idCompany
                                        }
                                    });
                                }}
                            />
                        </div> */}
                    </div>
                </div>
                <div className="footer-dialog">
                    <div className="btn-next" onClick={(e) => props.onOk(Object.assign({},this.state))}>Ok</div>
                    <div className="btn-next" onClick={props.onCancel}>Close</div>
                </div>
                
            </Modal>
        );
    };
}

UserInfoModal.prototype = Object.create(React.Component.prototype);