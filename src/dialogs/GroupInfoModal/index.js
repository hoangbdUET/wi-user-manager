module.exports = GroupInfoModal;
require('./style.less');
const React = require('react');
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const PropTypes = require('prop-types');

const Editable = require('../../components/Editable');

GroupInfoModal.propTypes = {
    isOpen: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
}
function GroupInfoModal(props) {
    let group = props.group || {};

    return (<Modal isOpen={props.isOpen} className="ModalStyle CompanyInfoModal">
        <h4>New Group</h4>
        <div className="fieldset">
            <label>Name:</label>
            <Editable value={group.name || ""}
                formatValue={(v) => (((v!==null||v!=undefined) && v.length)?v:'[empty]')} 
                onValueChanged={(name) => group.name = name} />
        </div>
        <div className="fieldset">
            <label>Description:</label>
            <Editable value={group.description || ""}
                formatValue={(v) => (((v!==null||v!=undefined) && v.length)?v:'[empty]')} 
                onValueChanged={(description) => group.description = description} />
        </div>
        <div className="fieldset">
            <label>Company:</label>
            <Editable value={group.company || ""}
                formatValue={(v) => (((v!==null||v!=undefined) && v.length)?v:'[empty]')} 
                onValueChanged={(company) => {}} />
        </div>
        <button onClick={(e) => props.onOk(group)}>Ok</button>
        <button onClick={props.onCancel}>Close</button>
    </Modal>);
}
