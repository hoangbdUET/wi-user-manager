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
    this.state = {};

    this.render = function () {
        return (
            <Modal isOpen={this.props.isOpen} portalClassName="ModalStyle" className="LicensePackageInfoModal"
                   onAfterOpen={() => {
                       this.setState({
                           name: this.props.item.name,
                           description: this.props.item.description,
                           idLicensePackage: this.props.item.idLicensePackage
                       });
                   }}
                   overlayClassName="modal-backdrop">
                <h4>Edit license package <b>{this.state.name}</b></h4>
                <div className="content-dialog">
                    <div style={{flex: 1, overflow: 'auto'}}>
                        <div className="fieldset">
                            <div>Name</div>
                            <Editable value={this.state.name || ""}
                                      formatValue={(v) => ((v !== null && v !== undefined && v.length !== 0) ? v : "[empty]")}
                                      onValueChanged={(v) => this.setState({name: v})}
                                      disabled={true}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Description</div>
                            <Editable value={this.state.description || ""}
                                      formatValue={(v) => ((v !== null && v !== undefined && v.length !== 0) ? v : "[empty]")}
                                      onValueChanged={(v) => this.setState({description: v})}
                            />
                        </div>
                    </div>
                </div>
                <div className="footer-dialog">
                    <div className="btn-next" onClick={(e) => props.onOk(this.state)}>Ok</div>
                    <div className="btn-next" onClick={props.onCancel}>Close</div>
                </div>
            </Modal>
        )
    }
}

LicensePackageInfoModal.prototype = Object.create(React.Component.prototype);