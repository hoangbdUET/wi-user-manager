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
        name: this.props.selectedPackage.name || "",
        description: this.props.selectedPackage.description || "",
        selectedPackage: this.props.selectedPackage || {},
        featuresInPackage: this.props.featuresInPackage || [],
        featuresNotInPackage: this.props.featuresNotInPackage || [],
        tabIdx: 0,
        deleteFeatures: [],
        addFeatures: []
    };

    // this.listFeatureInPackage = listFeatureInPackage.bind(this);

    this.updateProps = function () {
        this.setState({
            name: this.props.selectedPackage.name || "",
            description: this.props.selectedPackage.description || "",
            selectedPackage: this.props.selectedPackage || {},
            featuresInPackage: this.props.featuresInPackage || [],
            featuresNotInPackage: this.props.featuresNotInPackage || []
        });
    }

    this.clearModalSession = function() {
        this.setState({
            tabIdx: 0,
            deleteFeatures: [],
            addFeatures: []
        });
    }

    this.listFeatureInPackage = listFeatureInPackage.bind(this);
    function listFeatureInPackage(feature) {
        // console.log(feature);
        return (
            <div style={{display: 'flex',padding:'10px 0', justifyContent: 'space-between', alignItems: 'center'}}>
                {feature ? (<Fragment>
                    <div className="item-content">{feature.name}</div>
                    <i className="action-icon ti ti-close" onClick={() => {
                        this.setState(state => {
                            //delete it from add features if it already in
                            let idx = state.addFeatures.findIndex(f => f.idFeature === feature.idFeature);
                            if (idx >= 0) {
                                state.addFeatures.splice(idx,1);
                            }

                            //add to delete features
                            idx = state.deleteFeatures.findIndex(f => f.idFeature === feature.idFeature);
                            if (idx < 0) {
                                state.deleteFeatures.push(feature);
                            }

                            //remove it from in list
                            idx = state.featuresInPackage.findIndex(f => f.idFeature === feature.idFeature);
                            state.featuresInPackage.splice(idx, 1);

                            //add it to other list
                            idx = state.featuresNotInPackage.findIndex(f => f.idFeature === feature.idFeature);
                            if (idx < 0) {
                                state.featuresNotInPackage.push(feature);
                            }
                            return {featuresNotInPackage: state.featuresNotInPackage, featuresInPackage: state.featuresInPackage,
                                    deleteFeatures: state.deleteFeatures, addFeatures: state.addFeatures}                          
                        })
                    }}></i>
                </Fragment>) : "[select feature]"}
            </div>
        );
    }

    this.listFeatureNotInPackage = listFeatureNotInPackage.bind(this);
    function listFeatureNotInPackage(feature) {
        return (
            <div style={{display: 'flex',padding:'10px 0', justifyContent: 'space-between', alignItems: 'center'}}>
                {feature ? (<Fragment>
                    <div className="item-content">{feature.name}</div>
                    <i className="action-icon ti ti-arrow-right" onClick={() => {
                        this.setState(state => {
                            //delete from delete list
                            let idx = state.deleteFeatures.findIndex(f => f.idFeature === feature.idFeature);
                            if (idx >= 0) {
                                state.deleteFeatures.splice(idx,1);
                            }

                            //add it to add list
                            idx = state.addFeatures.findIndex(f => f.idFeature === feature.idFeature);
                            if (idx < 0) {
                                state.addFeatures.push(feature);
                            }

                            //remove it from in list
                            idx = state.featuresNotInPackage.findIndex(f => f.idFeature === feature.idFeature);
                            if (idx >= 0) {
                                state.featuresNotInPackage.splice(idx, 1);
                            }
                            
                            //add it to other list
                            idx = state.featuresInPackage.findIndex(f => f.idFeature === feature.idFeature);
                            if (idx < 0) {
                                state.featuresInPackage.push(feature);
                            }
                            
                            return {featuresNotInPackage: state.featuresNotInPackage, featuresInPackage: state.featuresInPackage,
                                    deleteFeatures: state.deleteFeatures, addFeatures: state.addFeatures}   
                        })
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
        return (
            <Modal isOpen={this.props.isOpen}
                onAfterOpen={() => this.updateProps()}
                portalClassName="ModalStyle" 
                className="LicensePackageInfoModal" 
                overlayClassName="modal-backdrop">
                <div className="header-dialog-tab">
                    <div className="title-dialog">Edit license package </div>
                    <div className="tab-controls">
                        <div className={this.state.tabIdx == 0 ? "active-tab":""} onClick={() => this.setState({
                            tabIdx:0
                        })}>General</div>
                        <div className={this.state.tabIdx == 1 ? "active-tab":""} onClick={() => this.setState({
                            tabIdx: 1
                        })}>Features</div>
                </div>
            </div>
                <div className="content-dialog">       
                    <div style={{ flex: 2, position: 'relative' }}>
                        <div style={{ height: '400px' }}></div>
                        <div className={"tab-content"} style={{ visibility: this.state.tabIdx === 0 ? 'visible' : 'hidden' }}>
                            <div className="fieldset">
                                <div>Name</div>
                                <Editable value={this.state.name}
                                    formatValue={(v) => ((v !== null && v !== undefined && v.length !== 0) ? v : "[empty]")}
                                    onValueChanged={(v) => this.setState({ name: v })}
                                    disabled={true}
                                />
                            </div>
                            <div className="fieldset">
                                <div>Description</div>
                                <Editable value={this.state.description}
                                    formatValue={(v) => ((v !== null && v !== undefined && v.length !== 0) ? v : "[empty]")}
                                    onValueChanged={(v) => this.setState({ description: v })}
                                />
                            </div>
                            <div className="members tab-content" style={{ visibility: this.state.tabIdx === 1 ? 'visible' : 'hidden' }}>
                                <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                                    <div className="column" style={{marginRight: "20px"}}>
                                        <SearchableList  getItem={this.listFeatureNotInPackage}
                                            items={this.state.featuresNotInPackage}
                                            itemHeight={32} />
                                    </div>
                                    <div className="column">
                                        <SearchableList getItem={this.listFeatureInPackage}
                                            items={this.state.featuresInPackage}
                                            itemHeight={32} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-dialog">
                        <div className="btn-next" onClick={(e) => {
                                this.clearModalSession();
                                this.props.onOk(this.state);
                            }} style={{background: '#4B7DEF', color: '#fff'}}>Ok</div>
                        <div className="btn-next" onClick={()=>{
                                    this.clearModalSession();
                                    this.props.onCancel();
                                }
                            }>Close</div>
                    </div>
                </div>
            </Modal>
        );
    }
}

LicensePackageInfoModal.prototype = Object.create(React.Component.prototype);