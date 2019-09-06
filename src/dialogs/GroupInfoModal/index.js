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
        users: props.users || [],
        group: props.group || []
    }

    let disabled = !!Object.keys(this.state.group).length;

    this.getUser = getUser.bind(this);

    function getUser(user) {
        return (<div style={{height: '18px'}}>{user ? user.username : "[select user]"}</div>);
    }

    this.getRawUser = getRawUser.bind(this);

    function getRawUser(idx) {
        return this.props.users[idx];
    }

    this.render = function () {
        return (<Modal isOpen={this.props.isOpen} portalClassName="ModalStyle" className="GroupInfoModal" overlayClassName="modal-backdrop">
            <h4>New Group</h4>
            <div className="content-dialog">
                <div style={{flex:2}}>
                    <div className="fieldset">
                        <div>Name:</div>
                        <Editable value={this.state.group.name || ""} disabled={disabled}
                                formatValue={(v) => (((v !== null ) && v.length) ? v : '[empty]')}
                                onValueChanged={(name) => this.state.group.name = name}/>
                    </div>
                    <div className="fieldset">
                        <div>Description:</div>
                        <Editable value={this.state.group.description || ""} disabled={disabled}
                                formatValue={(v) => (((v !== null || true) && v.length) ? v : '[empty]')}
                                onValueChanged={(description) => this.state.group.description = description}/>
                    </div>
                    <div className="fieldset">
                        <div>Company:</div>
                        <DropDown disabled={disabled} getItem={(company) => (
                            <div style={{height: '18px'}}>{company ? company.name : "[select company]"}</div>)}
                                items={this.props.companies}
                                itemHeight={18}
                                selectedItem={this.props.selectedCompany} onItemClicked={(clickedCompany) => {
                            this.state.group.idCompany = clickedCompany.idCompany;
                            this.state.group.company = clickedCompany;
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
                <div className="btn-next" onClick={(e) => this.props.onOk(this.state.group)}>OK</div>
                <div className="btn-next" onClick={this.props.onCancel}>Cancel</div>
            </div>
        </Modal>);
    }

}

GroupInfoModal.prototype = Object.create(React.Component.prototype);
