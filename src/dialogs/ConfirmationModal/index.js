module.exports = ConfirmationModal;
const React = require('react');
const Modal = require('react-modal');

function ConfirmationModal(props) {
    return (<Modal isOpen={props.isOpen} className="ModalStyle ConfirmationModal">
        <h3>{props.title}</h3>
        <div><span>{props.message}</span></div>
        <button onClick={() => props.onOk(props.params)}>Yes</button>
        <button onClick={props.onCancel}>No</button>
    </Modal>)
}
