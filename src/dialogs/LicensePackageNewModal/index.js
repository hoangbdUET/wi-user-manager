module.exports = LicensePackageNewModal;
require('./style.less');
const React = require('react');
const Fragment = React.Fragment;
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const api = require('../../services/apiClient');
const Editable = require('../../components/Editable');

function LicensePackageNewModal(props) {
    React.Component.call(this, props);
    this.state = {
        name: '',
        description: ''
    };
    this.render = function () {
        return (
            <Modal isOpen={this.props.isOpen} portalClassName="ModalStyle" className="LicensePackageNewModal"
                   overlayClassName="modal-backdrop">
                <h4>New license package</h4>
                <div className="content-dialog">
                    <div style={{flex: 1, overflow: 'auto'}}>
                        <div className="fieldset">
                            <div>Name</div>
                            <Editable value={this.state.name}
                                      formatValue={(v) => ((v === null || v === undefined || v.length === 0) ? "[empty]" : v)}
                                      onValueChanged={(name) => this.setState({name: name})}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Description</div>
                            <Editable value={this.state.description}
                                      formatValue={(v) => ((v === null || v === undefined || v.length === 0) ? "[empty]" : v)}
                                      onValueChanged={(des) => this.setState({description: des})}
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

LicensePackageNewModal.prototype = Object.create(React.Component.prototype);