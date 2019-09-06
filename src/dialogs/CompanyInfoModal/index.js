module.exports = CompanyInfoModal;
require('./style.less');
const React = require('react');
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const PropTypes = require('prop-types');

const Editable = require('../../components/Editable');

CompanyInfoModal.propTypes = {
    isOpen: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
}

function CompanyInfoModal(props) {
    let company = props.company || {};

    return (<Modal isOpen={props.isOpen} portalClassName="ModalStyle" className="CompanyInfoModal" overlayClassName="modal-backdrop" >
        <h4>New Company</h4>
        <div className="content-dialog">
            <div style={{flex:2}}>
                <div className="fieldset">
                    <div>Name:</div>
                    <Editable value={company.name || ""}
                            formatValue={(v) => (((v !== null || v != undefined) && v.length) ? v : '[empty]')}
                            onValueChanged={(name) => company.name = name}/>
                </div>
                <div className="fieldset">
                    <div>Location:</div>
                    <Editable value={company.location || ""}
                            formatValue={(v) => (((v !== null || v != undefined) && v.length) ? v : '[empty]')}
                            onValueChanged={(location) => company.location = location}/>
                </div>
                <div className="fieldset">
                    <div>Description:</div>
                    <Editable value={company.description || ""}
                            formatValue={(v) => (((v !== null || v != undefined) && v.length) ? v : '[empty]')}
                            onValueChanged={(description) => company.description = description}/>
                </div>
                <div className="fieldset">
                    <div>Licenses:</div>
                    <Editable value={company.licenses || 10}
                            formatValue={(v) => (((v !== null || v != undefined) && !isNaN(v)) ? v : '[empty]')}
                            setValue={input => isNaN(parseInt(input)) ? 0 : parseInt(input)}
                            onValueChanged={(licenses) => company.licenses = licenses}/>
                </div>
            </div>
        </div>
        <div className="footer-dialog">
            <div className="btn-next" onClick={(e) => props.onOk(company)}>OK</div>
            <div className="btn-next" onClick={props.onCancel}>Cancel</div>
        </div>
    </Modal>);
}
