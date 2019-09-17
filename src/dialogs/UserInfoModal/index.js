module.exports = UserInfoModal;
const React = require("react");
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const PropTypes = require('prop-types');
require('./style.less');
const Editable = require('../../components/Editable');

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
        role: ""
    };

    this.updateProps = function() {
        this.setState({
            username: (this.props.user||{}).username,
            email: (this.props.user||{}).email,
            fullname: (this.props.user||{}).fullname,
            status: (this.props.user||{}).status,
            role: (this.props.user||{}).role
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
                            <div>Status</div>
                            <Editable   value={this.state.status} 
                                        formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)}
                                        onValueChanged={(value) => this.setState((state)=>{
                                            return {
                                                status: value
                                            };
                                        })}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Role</div>
                            <Editable   value={this.state.role} 
                                        formatValue={(v) => ((v === null || v === undefined || v.length === 0 )? "[empty]" : v)}
                                        onValueChanged={(value) => this.setState((state)=>{
                                            return {
                                                role: value
                                            };
                                        })}
                            />
                        </div>
                    </div>
                </div>
                <div className="footer-dialog">
                    <div className="btn-next" onClick={(e) => {props.onOk(user);}}>Ok</div>
                    <div className="btn-next" onClick={props.onCancel}>Close</div>
                </div>
                
            </Modal>
        );
    };
}

UserInfoModal.prototype = Object.create(React.Component.prototype);