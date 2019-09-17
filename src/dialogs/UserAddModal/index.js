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
        password: "",
        repassword: "",
        idCompany: null
    };

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
                    <div style={{flex: 1, overflow: 'auto'}}>
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
                            <div>Status</div>
                            <Editable value={this.state.status} formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)}
                                            onValueChanged={(value) => this.setState((state)=>{
                                                return {
                                                    status: value
                                                };
                                            })}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Role</div>
                            <Editable value={this.state.role} formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)} 
                                            onValueChanged={(value) => this.setState((state)=>{
                                                return {
                                                    role: value
                                                };
                                            })}
                            />
                        </div>
                        <div className="fieldset">
                        <div>Company:</div>
                            <DropDown  getItem={(company) => (
                                <div style={{ height: '18px' }}>{company ? company.name : "[select company]"}</div>)}
                                items={this.props.companies}
                                itemHeight={18}
                                onItemClicked = {(clickedCompany)=>{
                                    this.setState((state)=>{
                                        return {
                                            idCompany: clickedCompany.idCompany
                                        }
                                    });
                                }}
                            />
                        </div>
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