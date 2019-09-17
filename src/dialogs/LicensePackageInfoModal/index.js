module.exports = LicensePackageInfoModal;
require('./style.less');
const React = require('react');
const Fragment = React.Fragment;
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const api = require('../../services/apiClient');
const Editable = require('../../components/Editable');


function LicensePackageInfoModal(props) {
    React.Component.call(this, props);
    let item = this.props.item || {name: 'default', description: 'default'};
    item.description = item.description === null || item.description === undefined ? '' : item.description;

    this.render = function () {
        return (
            <Modal isOpen={this.props.isOpen} portalClassName="ModalStyle" className="LicensePackageInfoModal"
                   overlayClassName="modal-backdrop">
                <h4>Edit license package <b>{item.name}</b></h4>
                <div className="content-dialog">
                    <div style={{flex: 1, overflow: 'auto'}}>
                        <div className="fieldset">
                            <div>Name</div>
                            <Editable value={item.name}
                                      formatValue={(v) => ((v !== null && v !== undefined && v.length !== 0) ? v : "[empty]")}/>
                        </div>
                        <div className="fieldset">
                            <div>Description</div>
                            <Editable value={item.description}
                                      formatValue={(v) => ((v !== null && v !== undefined && v.length !== 0) ? v : "[empty]")}/>
                        </div>
                    </div>
                </div>
                <div className="footer-dialog">
                    <div className="btn-next" onClick={(e) => props.onOk(item)}>Ok</div>
                    <div className="btn-next" onClick={props.onCancel}>Close</div>
                </div>
            </Modal>
        )
    }
}

LicensePackageInfoModal.prototype = Object.create(React.Component.prototype);