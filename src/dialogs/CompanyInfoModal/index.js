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

    return (<Modal isOpen={props.isOpen} className="ModalStyle CompanyInfoModal">
        <h4>New Company</h4>
        <div className="fieldset">
            <label>Name:</label>
            <Editable value={company.name || ""}
                formatValue={(v) => (((v!==null||v!=undefined) && v.length)?v:'[empty]')} 
                onValueChanged={(name) => company.name = name} />
        </div>
        <div className="fieldset">
            <label>Location:</label>
            <Editable value={company.location || ""}
                formatValue={(v) => (((v!==null||v!=undefined) && v.length)?v:'[empty]')} 
                onValueChanged={(location) => company.location = location} />
        </div>
        <div className="fieldset">
            <label>Description:</label>
            <Editable value={company.description || ""}
                formatValue={(v) => (((v!==null||v!=undefined) && v.length)?v:'[empty]')} 
                onValueChanged={(description) => company.description = description} />
        </div>
        <div className="fieldset">
            <label>Licenses:</label>
            <Editable value={company.licenses || 10}
                formatValue={(v) => (((v!==null||v!=undefined) && v.length)?v:'[empty]')} 
                setValue={input => isNaN(parseInt(input))?0:parseInt(input)}
                onValueChanged={(licenses) => company.licenses = licenses} />
        </div>
        <button onClick={(e) => props.onOk(company)}>Ok</button>
        <button onClick={props.onCancel}>Close</button>
    </Modal>);
}
