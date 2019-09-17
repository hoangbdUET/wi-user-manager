module.exports = NewGroupModal;
require('./style.less');
const React = require('react');
const Modal = require('react-modal');
const api = require('../../services/apiClient');
const Editable = require('../../components/Editable');
const DropDown = require('../../components/DropDown');
const {toast} = require('react-toastify');

function NewGroupModal(props) {
    React.Component.call(this, props);

    let disabled = !!Object.keys(this.props.group || {}).length;
    
    this.state = {
        name: "",
        description: "",
        idCompany: null
    }

    this.clearModelSession = function() {
        this.setState({
            name: "",
            description: "",
            idCompany: null
        });
    }

    this.createNewGroup = function() {
        return api.newGroup(this.state);
    }

    this.submitAndClose = function(e) {
        if (this.state.name !== "" && this.state.idCompany) {
            this.createNewGroup().then((rs)=>{
                this.clearModelSession();
                toast.success("Create new group successfully");
                this.props.onOk();
            }).catch((e)=>{
                this.clearModelSession();
                toast.error(e.message);
                this.props.onCancel();
            });
        } else {
            if (this.state.name == "") {
                toast.error("Name can not empty");
            } else {
                toast.error("Company can not empty");
            }
        }
    }

    this.render = function () {
        return (
            <Modal isOpen={this.props.isOpen}
                portalClassName="ModalStyle"
                className="NewGroupModal"
                overlayClassName="modal-backdrop"
            >
                <h4>Add new group</h4>
                {/* <div className="content-dialog">
                    <div className="fieldset"><label>XIn CHao</label></div>
                </div> */}
                <div>
                    <div className="fieldset">
                        <div>Name:</div>
                        <Editable value={this.state.name || ""} disabled={disabled}
                                formatValue={(v) => (((v !== null ) && v.length) ? v : '[empty]')}
                                onValueChanged={(name) => this.setState((state)=>{
                                    return {
                                        name: name
                                    };
                                })}/>
                    </div>
                    <div className="fieldset">
                        <div>Description:</div>
                        <Editable value={this.state.description || ""} disabled={disabled}
                                formatValue={(v) => (((v !== null ) && v.length) ? v : '[empty]')}
                                onValueChanged={(description) => this.setState((state)=>{
                                    return {
                                        description: description
                                    };
                                })}/>
                    </div>
                    <div className="fieldset">
                        <div>Company:</div>
                        <DropDown disabled={disabled} getItem={(company) => (
                            <div style={{ height: '18px' }}>{company ? company.name : "[select company]"}</div>)}
                            items={this.props.companies}
                            itemHeight={18}
                            onItemClicked = {(clickedCompany)=>{
                                this.setState((state)=>{
                                    return {
                                        idCompany: clickedCompany.idCompany
                                    }
                                });
                            }}
                        />
                        {/* selectedItem={this.props.selectedCompany} onItemClicked={(clickedCompany) => {
                            group.idCompany = clickedCompany.idCompany;
                            group.company = clickedCompany;
                        }} */}
                    </div>
                </div>
                <div className="footer-dialog">
                    <div className="btn-next" onClick={(e) => {
                        // e.preventDefault();
                        this.submitAndClose(e);
                        // this.props.onOk();
                    }}>OK</div>
                    <div className="btn-next" onClick={(e) => {
                        this.clearModelSession();
                        this.props.onCancel();
                    }}>Cancel</div>
                </div>
            </Modal>
        );
    };
}



NewGroupModal.prototype = Object.create(React.Component.prototype);