module.exports = GroupInfoModal;
require('./style.less');
const React = require('react');
const Fragment = React.Fragment;
const SearchableList = require('../../components/SearchableList');
const DropDown = require('../../components/DropDown');
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const PropTypes = require('prop-types');
const api = require('../../services/apiClient');
const {toast} = require('react-toastify');

const Editable = require('../../components/Editable');

GroupInfoModal.propTypes = {
    isOpen: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    companies: PropTypes.array,
    groupUsers: PropTypes.array
}

function GroupInfoModal(props) {
    React.Component.call(this, props);

    this.state = {
        users: props.users || [],
        group: props.group || {},
        groupUsers: props.groupUsers || [],
        tabIdx: 0,
        removeUsers: [],
        addUsers: []
    }


    this.clearModelSession = function() {
        this.setState({
            tabIdx: 0,
            removeUsers: [],
            addUsers: [],
            group: {}
        });
    }

    this.runPropsUpdate = function() {
        this.setState({
            users: this.props.users || [],
            group: this.props.group || {},
            groupUsers: this.props.groupUsers || []
        });
    }

    this.updateToServer = function() {
        // return new Promise(async (resolve, reject)=>{
        //     for (let i = 0; i < this.state.removeUsers.length; i++)
        //         try {
        //             await api.removeUserFromGroup(this.props.selectedGroupId, this.state.removeUsers[i].idUser);
        //         } catch (e) {
        //             reject(e);
        //         }
        //     try {
        //         await api.addUsersToGroup(this.props.selectedGroupId, this.state.addUsers.map((u)=>u.idUser));
        //     } catch (e) {
        //         reject(e);
        //     }
        //     resolve(null);
        // });
        let listPromise = [];
        for (let i = 0; i < this.state.removeUsers.length; i++) {
            listPromise.push(api.removeUserFromGroup(this.props.selectedGroupId, this.state.removeUsers[i].idUser));
        }
        if (this.state.addUsers.length > 0) {
            listPromise.push(api.addUsersToGroup(this.props.selectedGroupId, this.state.addUsers.map((u)=>u.idUser)));
        }
        if (this.state.group.name) {
            listPromise.push(api.editGroupInfo(this.state.group.idGroup, this.state.group.name, this.state.group.description));
        }
        return Promise.all(listPromise);
    };

    this.submitAndClose = function(e) {
        this.updateToServer().then((rs)=>{
            toast.success("Update group successfully");
            this.clearModelSession();
            this.props.onOk();
        }).catch(e=>{
            toast.error(e.message);
        });
    }

    let disabled = !!Object.keys(this.props.group || {}).length;

    this.getUser = getUser.bind(this);

    function getUser(user) {
        return (
            <div style={{display: 'flex',padding:'10px 0', justifyContent: 'space-between', alignItems: 'center'}}>
                {user ? (<Fragment>
                    <div className="item-content">{user.username}</div>
                    <i className="action-icon ti-arrow-right" onClick={(e) => {
                        this.setState(state => {
                            let idx = state.removeUsers.findIndex(u => u.idUser === user.idUser);
                            if (idx >= 0) {
                                state.removeUsers.splice(idx,1);
                            }
                            idx = state.addUsers.findIndex(u => u.idUser === user.idUser);
                            if (idx < 0) {
                                state.addUsers.push(user);
                            }
                            let index = state.groupUsers.findIndex(u => u.idUser === user.idUser);
                            if (index >= 0) return {removeUsers: state.removeUsers, addUsers: state.addUsers};
                            //
                            idx = state.users.findIndex(u => u.idUser === user.idUser);
                            state.users.splice(idx, 1);
                            state.groupUsers.push(user);
                            return {users: state.users, groupUsers: state.groupUsers, removeUsers: state.removeUsers, addUsers: state.addUsers};                           
                        })
                    }}></i>
                </Fragment>) : "[select user]"}
            </div>
        );
    }

    this.getGroupUser = getGroupUser.bind(this);
    function getGroupUser(user) {
        return (
            <div style={{display: 'flex',padding:'10px 0', justifyContent: 'space-between', alignItems: 'center'}}>
                {user ? (<Fragment>
                    <div className="item-content">{user.username}</div>
                    <i className="action-icon ti-close" onClick={() => {
                        this.setState(state => {
                            let idx = state.addUsers.findIndex(u => u.idUser === user.idUser);
                            if (idx >= 0) {
                                state.addUsers.splice(idx,1);
                            }
                            idx = state.removeUsers.findIndex(u => u.idUser === user.idUser);
                            if (idx < 0) {
                                state.removeUsers.push(user);
                            }
                            //remove out
                            idx = state.groupUsers.findIndex(u => u.idUser === user.idUser);
                            state.groupUsers.splice(idx, 1);
                            let index = state.users.findIndex(u => u.idUser === user.idUser);
                            if (index < 0) {
                                state.users.push(user);
                            }
                            return {groupUsers: state.groupUsers, users: state.users, removeUsers: state.removeUsers, addUsers: state.addUsers}                          
                        })
                    }}></i>
                </Fragment>) : "[select user]"}
            </div>
        );
    }
    this.getRawUser = getRawUser.bind(this);

    function getRawUser(idx) {
        return this.state.users[idx];
    }

    this.render = function () {    
        return (
            <Modal isOpen={this.props.isOpen} 
                    portalClassName="ModalStyle" 
                    className="GroupInfoModal" 
                    overlayClassName="modal-backdrop"
                    onAfterOpen={()=>this.runPropsUpdate()}
            >
                <div className="header-dialog-tab">
                    <div className="title-dialog">Group Info</div>
                    <div className="tab-controls">
                        <div className={this.state.tabIdx == 0 ? "active-tab":""} onClick={() => this.setState({
                            tabIdx:0
                        })}>General</div>
                        <div className={this.state.tabIdx == 1 ? "active-tab":""} onClick={() => this.setState({
                            tabIdx: 1
                        })}>Members</div>
                    </div>
                </div>
                <div className="content-dialog">
                    
                    <div style={{flex:2, position: 'relative'}}>
                        <div style={{height: '400px'}}></div>
                        <div className={"tab-content"} style={{visibility:this.state.tabIdx===0?'visible':'hidden'}}>
                            <div className="fieldset">
                                <div>Name:</div>
                                <Editable value={this.state.group.name || ""} disabled={disabled}
                                        formatValue={(v) => (((v !== null ) && v.length) ? v : '[empty]')}
                                        onValueChanged={(name) => this.setState((state)=>{
                                            state.group.name = name;
                                            return {
                                                group: state.group
                                            };
                                        })}
                                />
                            </div>
                            <div className="fieldset">
                                <div>Description:</div>
                                <Editable value={this.state.group.description || ""} disabled={disabled}
                                        formatValue={(v) => (((v !== null || true) && v.length) ? v : '[empty]')}
                                        onValueChanged={(description) => this.setState((state)=>{
                                            state.group.description = description;
                                            return {
                                                group: state.group
                                            };
                                        })}/>
                            </div>
                        </div>
                        <div className="members tab-content" style={{visibility:this.state.tabIdx===1?'visible':'hidden'}}>
                            <div style={{flex:1, overflow:'hidden', display:'flex'}}>
                                <div className="column" style={{marginRight: "20px"}}>
                                    <SearchableList disabled={!disabled} getItem={this.getUser}
                                        items={this.state.users}
                                        itemHeight={32} />
                                </div>
                                <div className="column">
                                    <SearchableList disabled={!disabled} getItem={this.getGroupUser}
                                        items={this.state.groupUsers}
                                        itemHeight={32} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="footer-dialog">
                    <div className="btn-next" onClick={(e) => {
                        e.preventDefault();
                        this.submitAndClose(e);
                    }}>OK</div>
                    <div className="btn-next" onClick={(e) => {
                        this.clearModelSession();
                        this.props.onCancel();
                    }}>Cancel</div>
                </div>
            </Modal>
        );
    }

}

GroupInfoModal.prototype = Object.create(React.Component.prototype);
