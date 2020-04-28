module.exports = NewGroupModal;
require('./style.less');
const React = require('react');
const Modal = require('react-modal');
const api = require('../../services/apiClient');
const Editable = require('../../components/Editable');
const DropDown = require('../../components/DropDown');
const {toast} = require('react-toastify');
const userService = require('./../../services/apiUser');

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
        if (userService.getRole() <= 0) {
            if (!this.state.idCompany) {
                toast.error("Name/Company cannot be empty");
                return;
            }
        }
        if (this.state.name.toString().trim() !== "") {
            this.createNewGroup().then((rs)=>{
                this.clearModelSession();
                toast.success("Create new group successfully");
                this.props.onOk();
            }).catch((e)=>{
                this.clearModelSession();
                toast.error((typeof(e) == "string" ? e : e.errors || [{message: "Your input is not valid"}])[0].message);
                this.props.onCancel();
            });
        } else {
            toast.error("Name/Company cannot be empty");
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
                    {   
                        userService.getRole() > 0 ?
                        null
                        :
                        <div className="fieldset">
                        <div>Company:</div>
                        <DropDown disabled={disabled} getItem={(company) => (
                            <div style={{ height: '18px', display: 'flex', alignItems: 'center' }}>{company ? company.name : "[select company]"}</div>)}
                            items={this.props.companies}
                            itemHeight={18}
                            selectedItem={this.props.companies.find((e) => e.idCompany === this.state.idCompany)}
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
                    }
                </div>
                <div className="footer-dialog">
                    <div className="btn-next" onClick={(e) => {
                        // e.preventDefault();
                        this.submitAndClose(e);
                        // this.props.onOk();
                    }} style={{background: '#4B7DEF', color: '#fff'}}>OK</div>
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