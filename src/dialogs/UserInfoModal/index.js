module.exports = UserInfoModal;
const React = require("react");
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const PropTypes = require('prop-types');
require('./style.less');

UserInfoModal.protoTypes = {
    isOpen: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};

function UserInfoModal(props) {
    let user = props.user || {};
    return (
        <Modal isOpen={props.isOpen} className={"ModalSyle UserInfoModal"}>
            <h4>New Company</h4>
            <button onClick={(e) => props.onOk(user)}>Ok</button>
            <button onClick={props.onCancel}>Close</button>
        </Modal>
    )
}