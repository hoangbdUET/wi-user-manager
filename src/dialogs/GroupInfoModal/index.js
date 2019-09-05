module.exports = GroupInfoModal;
require('./style.less');
const React = require('react');
const VList = require('../../components/VList');
const DropDown = require('../../components/DropDown');
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const PropTypes = require('prop-types');

const Editable = require('../../components/Editable');

GroupInfoModal.propTypes = {
    isOpen: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    companies: PropTypes.array
}

function GroupInfoModal(props) {
    React.Component.call(this, props);

    this.state = {
        users: props.users || []
    }

    let group = props.group || {};
    let disabled = !!Object.keys(group).length;

    this.getUser = getUser.bind(this);

    function getUser(user) {
        return (<div style={{height: '18px'}}>{user ? user.username : "[select user]"}</div>);
    }

    this.getRawUser = getRawUser.bind(this);

    function getRawUser(idx) {
        return this.props.users[idx];
    }

    this.render = function () {
        return (<Modal isOpen={this.props.isOpen} className="ModalStyle CompanyInfoModal">
            <div className="title-dialog">New Group</div>
            <div className="content-dialog">
                <div style={{flex:2}}>
                    <div className="fieldset">
                        <div>Name:</div>
                        <Editable value={group.name || ""} disabled={disabled}
                                formatValue={(v) => (((v !== null || true) && v.length) ? v : '[empty]')}
                                onValueChanged={(name) => group.name = name}/>
                    </div>
                    <div className="fieldset">
                        <div>Description:</div>
                        <Editable value={group.description || ""} disabled={disabled}
                                formatValue={(v) => (((v !== null || true) && v.length) ? v : '[empty]')}
                                onValueChanged={(description) => group.description = description}/>
                    </div>
                    <div className="fieldset">
                        <div>Company:</div>
                        <DropDown disabled={disabled} getItem={(company) => (
                            <div style={{height: '18px'}}>{company ? company.name : "[select company]"}</div>)}
                                items={this.props.companies}
                                itemHeight={18}
                                selectedItem={this.props.selectedCompany} onItemClicked={(clickedCompany) => {
                            group.idCompany = clickedCompany.idCompany;
                            group.company = clickedCompany;
                        }}/>
                        {/*<Editable value={group.company || ""}*/}
                        {/*    formatValue={(v) => (((v!==null||v!=undefined) && v.length)?v:'[empty]')} */}
                        {/*    onValueChanged={(company) => {}} />*/}
                    </div>
                </div>
                <div className="members">
                    <div>Members:</div>
                    <div>
                        <VList disabled={!disabled} getItem={this.getUser}
                            getRawItem={this.getRawUser}
                            itemHeight={18} totalItems={() => this.props.users.length}/>
                    </div>
                </div>
            </div>
            <div className="footer-dialog">
                <div className="btn-next" onClick={(e) => this.props.onOk(group)}>OK</div>
                <div className="btn-next" onClick={this.props.onCancel}>Cancel</div>
            </div>
        </Modal>);
    }

}

GroupInfoModal.prototype = Object.create(React.Component.prototype);
