module.exports = CompanyEditLicenseModal;
require('./style.less');
const React = require('react');
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const PropTypes = require('prop-types');

const Editable = require('../../components/Editable');
const apiService = require('./../../services/apiClient');
const { toast } = require('react-toastify');

CompanyEditLicenseModal.propTypes = {
    isOpen: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
}

function CompanyEditLicenseModal(props) {
    React.Component.call(this, props);

    this.state = {
        licenses: []
    }

    this.updateProps = function () {
        this.setState({
            licenses: []
        });
        apiService.getListLicenseInCompany(this.props.company.idCompany)
            .then((rs) => {
                this.setState({
                    licenses: rs
                });
            })
            .catch((e) => {
                toast.error(e);
            });
    }

    this.render = function () {
        return (<Modal isOpen={this.props.isOpen} portalClassName="ModalStyle"
            className="CompanyEditLicenseModal" overlayClassName="modal-backdrop"
            onAfterOpen={() => { this.updateProps(); }} >
            <h4>Company Edit License Package</h4>
            <div className="content-dialog">
                <div style={{ flex: 1, overflow: 'visible' }}>
                    {
                        this.state.licenses.map(
                            (e,idx) =>
                                <div key={idx} className="fieldset">
                                    <div>{e.name}</div>
                                    <Editable value={e.value} disabled={false}
                                        formatValue={(v) => (((v !== null || v != undefined)) ? e.used + '/'+ v : '???')}
                                        onValueChanged={(value) => this.setState((state)=>{
                                            state.licenses[idx].value = value;
                                            return {
                                                licenses: state.licenses
                                            }
                                        })}/>
                                </div>
                        )
                    }
                </div>
            </div>
            <div className="footer-dialog">
                <div className="btn-next" onClick={(e) => props.onOk(this.state, this.props.company.idCompany)} style={{ background: '#4B7DEF', color: '#fff' }}>OK</div>
                <div className="btn-next" onClick={props.onCancel}>Cancel</div>
            </div>
        </Modal>);
    }
}

CompanyEditLicenseModal.prototype = Object.create(React.Component.prototype);