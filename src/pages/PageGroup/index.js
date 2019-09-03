module.exports = PageGroup;
require('./style.less');
const React = require('react');
const ListGroup = require('../../components/ListGroup');
const {GroupInfoModal,ConfirmationModal} = require('../../dialogs');
const api = require('../../services/apiClient');
function PageGroup(props) {
    React.Component.call(this, props);
    this.state = {
        items: [],
        isAddingGroup: false,
        isEditingGroup: false,
        isDeletingGroup: false
    }
    let _groups;
    listGroup.call(this);

    let transform = group => ({
        idGroup: group.idGroup, 
        name: group.name, 
        description: group.description, 
        company: group.company.name
    });

    this.listGroup = listGroup.bind(this);
    function listGroup() {
        api.getGroupsPromise().then(groups => {
            _groups = groups;
            this.setState({
                items: groups.map(g => transform(g))
            });
        }).catch(e => console.error(e));
    }

    this.deleteGroup = deleteGroup.bind(this);
    function deleteGroup(selectedGroup) {
        api.deleteGroupPromise(selectedGroup.idGroup).then(deletedGroup => {
            this.setState(state => {
                let idx = state.items.findIndex(g => g.idGroup === deletedGroup.idGroup);
                state.items.splice(idx, 1);
                return {
                    items: state.items,
                    isDeletingGroup: false
                }
            });
        }).catch(e => console.error(e));
    }

    this.addGroup = addGroup.bind(this);
    function addGroup(aGroup) {
        api.addGroupPromise(aGroup).then(addedGroup => {
            _groups.push(addedGroup);
            this.setState(state => {
                state.items.push(transform(addedGroup));
                return {
                    items: state.items
                }
            });
        }).catch(e => console.log(e))
    }

    this.editGroup = editGroup.bind(this);
    function editGroup(aGroup) {
        api.editGroupPromise(aGroup).then(updatedGroup => {
            let idx = _groups.findIndex(g => g.idGroup === updatedGroup.idGroup);
            this.setState(state => {
                let idx = state.items.findIndex(g => g.idGroup === updatedGroup.idGroup);
                state.items[idx] = transform(updatedGroup);
                return {
                    items: state.items
                }
            });
        }).catch(e => console.error(e));
    }
    this.render = function() {
        return (<div className="PageGroup">
            <ListGroup itemPerPage={50} actions={[{
                name: "Add",
                handler: (selectedGroup) => {
                    this.setState({
                        isAddingGroup: true
                    });
                }
            }, {
                name: "Delete",
                handler: (selectedGroup) => {
                    this.setState({
                        isDeletingGroup: true,
                        selectedGroup
                    })
                }
            }, {
                name: "Edit",
                handler: (selectedGroup) => {
                    this.setState({
                        isEditingGroup: true,
                        selectedGroup
                    })
                }
            }, {
                name: "Refresh",
                handler: this.listGroup
            }]} items={this.state.items} />
            <GroupInfoModal isOpen={this.state.isAddingGroup}
                onOk={this.addGroup}
                onCancel={() => this.setState({isAddingGroup:false})} />
            <GroupInfoModal isOpen={this.state.isEditingGroup} group={this.state.selectedGroup}
                onOk={this.editGroup}
                onCancel={() => this.setState({isEditingGroup:false})} />
            <ConfirmationModal isOpen={this.state.isDeletingGroup} 
                title="Confirmation" message="Are you sure to delete this group?"
                onOk={() => this.deleteGroup(this.state.selectedGroup)}
                onCancel={() => this.setState({isDeletingGroup:false})} />
        </div>)
    }
}

PageGroup.prototype = Object.create(React.Component.prototype);
