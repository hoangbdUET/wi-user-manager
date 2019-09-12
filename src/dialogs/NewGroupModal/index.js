module.exports = NewGroupModal;
require('./style.less');
const React = require('react');
const Modal = require('react-modal');
const api = require('../../services/apiClient');
const Editable = require('../../components/Editable');
const DropDown = require('../../components/DropDown');

function NewGroupModal(props) {
    React.Component.call(this, props);

    this.render = function () {
        return (
            <Modal isOpen={this.props.isOpen}
                portalClassName="ModalStyle"
                className="NewGroupModal"
                overlayClassName="modal-backdrop"
            >
                <h4>Add new group</h4>
                {/* <div className="content-dialog">
                    <div className="fieldset"><label>XIn CHao</label></div>
                </div> */}
                
                <div className="footer-dialog">
                    <div className="btn-next" onClick={(e) => {
                        // e.preventDefault();
                        // this.submitAndClose(e);
                        this.props.onOk();
                    }}>OK</div>
                    <div className="btn-next" onClick={(e) => {
                        // this.clearModelSession();
                        this.props.onCancel();
                    }}>Cancel</div>
                </div>
            </Modal>
        );
    };
}



NewGroupModal.prototype = Object.create(React.Component.prototype);