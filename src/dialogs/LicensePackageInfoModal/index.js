module.exports = LicensePackageInfoModal;
require('./style.less');
const React = require('react');
const Fragment = React.Fragment;
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const api = require('../../services/apiClient');
const Editable = require('../../components/Editable');
const SearchableList = require('../../components/SearchableList');


function LicensePackageInfoModal(props) {
    React.Component.call(this, props);

    this.state = {
        name: (this.props.selectedPackage || {}).name,
        description: (this.props.selectedPackage || {}).description,
        selectedPackage: this.props.selectedPackage,
        featuresInPackage: this.props.featuresInPackage || []
    };

    // this.listFeatureInPackage = listFeatureInPackage.bind(this);

    this.updateProps = function() {
        this.setState({
            name: (this.props.selectedPackage || {}).name,
            description: (this.props.selectedPackage || {}).description,
            selectedPackage: this.props.selectedPackage,
            featuresInPackage: this.props.featuresInPackage || []
        });
    }

    this.listFeatureInPackage = listFeatureInPackage.bind(this);
    function listFeatureInPackage(feature) {
        // console.log(feature);
        return (
            <div style={{height: '18px'}}>
                {feature ? (<Fragment>
                    <div className="item-content">{'Hello'}</div>
                    <i className="action-icon ti-close" onClick={() => {
                        // this.setState(state => {
                        //     let idx = state.addUsers.findIndex(u => u.idUser === user.idUser);
                        //     if (idx >= 0) {
                        //         state.addUsers.splice(idx,1);
                        //     }
                        //     idx = state.removeUsers.findIndex(u => u.idUser === user.idUser);
                        //     if (idx < 0) {
                        //         state.removeUsers.push(user);
                        //     }
                        //     //remove out
                        //     idx = state.groupUsers.findIndex(u => u.idUser === user.idUser);
                        //     state.groupUsers.splice(idx, 1);
                        //     let index = state.users.findIndex(u => u.idUser === user.idUser);
                        //     if (index < 0) {
                        //         state.users.push(user);
                        //     }
                        //     return {groupUsers: state.groupUsers, users: state.users, removeUsers: state.removeUsers, addUsers: state.addUsers}                          
                        // })
                    }}></i>
                </Fragment>) : "[select feature]"}
            </div>
        );
    }

    // this.listFeatureNotInPackage = listFeatureNotInPackage.bind(this);
    this.listFeatureNotInPackage = function(feature) {
        return (
            <div style={{height: '18px'}}>
                {feature ? (<Fragment>
                    <div className="item-content">{feature.name}</div>
                    <i className="action-icon ti-close" onClick={() => {
                        // this.setState(state => {
                        //     let idx = state.addUsers.findIndex(u => u.idUser === user.idUser);
                        //     if (idx >= 0) {
                        //         state.addUsers.splice(idx,1);
                        //     }
                        //     idx = state.removeUsers.findIndex(u => u.idUser === user.idUser);
                        //     if (idx < 0) {
                        //         state.removeUsers.push(user);
                        //     }
                        //     //remove out
                        //     idx = state.groupUsers.findIndex(u => u.idUser === user.idUser);
                        //     state.groupUsers.splice(idx, 1);
                        //     let index = state.users.findIndex(u => u.idUser === user.idUser);
                        //     if (index < 0) {
                        //         state.users.push(user);
                        //     }
                        //     return {groupUsers: state.groupUsers, users: state.users, removeUsers: state.removeUsers, addUsers: state.addUsers}                          
                        // })
                    }}></i>
                </Fragment>) : "[select feature]"}
            </div>
        );
    }



    // this.listAllFeature = listAllFeature.bind(this);

    // function listAllFeature() {
    //     api.get
    // }

    this.render = function () {
        console.log(this.state);
        return (
            <Modal isOpen={this.props.isOpen} portalClassName="ModalStyle" className="LicensePackageInfoModal"
                    onAfterOpen={()=>this.updateProps()}
                    overlayClassName="modal-backdrop">
                <h4>Edit license package <b>{this.state.name}</b></h4>
                <div className="content-dialog">
                    <div style={{flex: 1, overflow: 'auto'}}>
                        <div className="fieldset">
                            <div>Name</div>
                            <Editable value={this.state.name || ""}
                                      formatValue={(v) => ((v !== null && v !== undefined && v.length !== 0) ? v : "[empty]")}
                                      onValueChanged={(v) => this.setState({name: v})}
                                      disabled={true}
                            />
                        </div>
                        <div className="fieldset">
                            <div>Description</div>
                            <Editable value={this.state.description || ""}
                                      formatValue={(v) => ((v !== null && v !== undefined && v.length !== 0) ? v : "[empty]")}
                                      onValueChanged={(v) => this.setState({description: v})}
                            />
                        </div>
                        <div>Features:</div>
                        <div className={"column"}>
                            <SearchableList
                                items = {this.state.featuresInPackage}
                                itemHeight={18}
                                getItem={this.listFeatureInPackage}
                            />
                        </div>
                        {/* <div className={"column"}>
                            <SearchableList
                                items = {((this.props.item || {}).i2g_features) || []}
                                itemHeight={18}
                                // getItem={this.listFeatureNotInPackage}
                            />
                        </div> */}
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

LicensePackageInfoModal.prototype = Object.create(React.Component.prototype);