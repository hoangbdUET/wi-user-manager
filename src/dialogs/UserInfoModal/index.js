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
    let user = props.user || {};
    return (
        <Modal isOpen={props.isOpen} portalClassName="ModalStyle" className="UserInfoModal" overlayClassName="modal-backdrop">
            <h4>New User</h4>
            <div className="content-dialog">
                <div style={{flex: 1, overflow: 'auto'}}>
                    <div className="fieldset">
                        <div>Username</div>
                        <Editable value={user.username} formatValue={(v) => ((v !== null && v !== undefined && v.length === 0 )? v : "[empty]")}/>
                    </div>
                    <div className="fieldset">
                        <div>Email</div>
                        <Editable value={user.email} formatValue={(v) => ((v !== null && v !== undefined && v.length === 0 )? v : "[empty]")}/>
                    </div>
                    <div className="fieldset">
                        <div>Full Name</div>
                        <Editable value={user.fullname} formatValue={(v) => ((v !== null && v !== undefined && v.length === 0 )? v : "[empty]")}/>
                    </div>
                    <div className="fieldset">
                        <div>Status</div>
                        <Editable value={user.status} formatValue={(v) => ((v !== null && v !== undefined && v.length === 0 )? v : "[empty]")}/>
                    </div>
                    <div className="fieldset">
                        <div>Role</div>
                        <Editable value={user.role} formatValue={(v) => ((v !== null && v !== undefined && v.length === 0 )? v : "[empty]")}/>
                    </div>
                </div>
            </div>
            <div className="footer-dialog">
                <div className="btn-next" onClick={(e) => props.onOk(user)}>Ok</div>
                <div className="btn-next" onClick={props.onCancel}>Close</div>
            </div>
            
        </Modal>
    )
}