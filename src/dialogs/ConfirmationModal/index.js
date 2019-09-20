module.exports = ConfirmationModal;
const React = require('react');
const Modal = require('react-modal');

function ConfirmationModal(props) {
    return (<Modal isOpen={props.isOpen} portalClassName="ModalStyle" className="ConfirmationModal" overlayClassName="modal-backdrop">
        <h4>{props.title}</h4>
        <div className="content-dialog">
            <div className="fieldset" style={{border: "none"}}><label>{props.message}</label></div>
        </div>
        <div className={"footer-dialog"}>
            <div className="btn-next" onClick={() => props.onOk(props.params)}>Yes</div>
            <div className="btn-next" onClick={props.onCancel}>No</div>

        </div>
    </Modal>)
}
