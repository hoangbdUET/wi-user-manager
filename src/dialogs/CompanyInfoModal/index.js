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
    React.Component.call(this, props);

    this.state = {
        name: "",
        location: "",
        description: "",
        licenses: 10,
        idCompany: null,
        shortname: null
    }

    this.updateProps = function() {
        this.setState({
            name: (this.props.company || {}).name || "",
            location: (this.props.company || {}).location || "",
            description: (this.props.company || {}).description || "",
            licenses: (this.props.company || {}).licenses || 10,
            idCompany: (this.props.company || {}).idCompany || null,
            shortname: (this.props.company || {}).shortname
        });
    }

    this.render = function () {
        return (<Modal isOpen={this.props.isOpen} portalClassName="ModalStyle"
                className="CompanyInfoModal" overlayClassName="modal-backdrop"
                onAfterOpen = {()=>{this.updateProps();}} >
            <h4>New Company</h4>
            <div className="content-dialog">
                <div style={{ flex: 2 }}>
                    <div className="fieldset">
                        <div>Name:</div>
                        <Editable value={this.state.name || ""}
                            formatValue={(v) => (((v !== null || v != undefined) && v.length) ? v : '[empty]')}
                            onValueChanged={(name) => this.setState({name: name})} />
                    </div>
                    <div className="fieldset">
                        <div>ShortName:</div>
                        <Editable value={this.state.shortname || ""}
                            formatValue={(v) => (((v !== null || v != undefined) && v.length) ? v : '[empty]')}
                            onValueChanged={(shortname) => this.setState({shortname: shortname})} />
                    </div>
                    <div className="fieldset">
                        <div>Location:</div>
                        <Editable value={this.state.location || ""}
                            formatValue={(v) => (((v !== null || v != undefined) && v.length) ? v : '[empty]')}
                            onValueChanged={(location) => this.setState({location: location})} />
                    </div>
                    <div className="fieldset">
                        <div>Description:</div>
                        <Editable value={this.state.description || ""}
                            formatValue={(v) => (((v !== null || v != undefined) && v.length) ? v : '[empty]')}
                            onValueChanged={(description) => this.setState({description: description})} />
                    </div>
                    <div className="fieldset">
                        <div>Licenses:</div>
                        <Editable value={this.state.licenses}
                            formatValue={(v) => (((v !== null || v != undefined) && !isNaN(v)) ? v : '[empty]')}
                            setValue={input => isNaN(parseInt(input)) ? 0 : parseInt(input)}
                            onValueChanged={(licenses) => this.setState({licenses: licenses})} />
                    </div>
                </div>
            </div>
            <div className="footer-dialog">
                <div className="btn-next" onClick={(e) => props.onOk(this.state)} style={{background: '#4B7DEF', color: '#fff'}}>OK</div>
                <div className="btn-next" onClick={props.onCancel}>Cancel</div>
            </div>
        </Modal>);
    }
}

CompanyInfoModal.prototype = Object.create(React.Component.prototype);