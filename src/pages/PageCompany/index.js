module.exports = PageCompany;
require('./style.less');
const api = require("../../services/apiClient");
const React = require('react');
const {CompanyInfoModal, ConfirmationModal} = require('../../dialogs');
const ListCompany = require('../../components/ListCompany');
const {toast} = require('react-toastify');

function PageCompany() {
    React.Component.call(this);
    this.state = {
        items: [],
        isAddingCompany: false,
        isEditingCompany: false,
    };
    this.componentDidMount = function() {
        listCompany.call(this);
        this.props.resetFilter();
    }
    this.startAddCompany = startAddCompany.bind(this);

    function startAddCompany(selectedCompany) {
        this.setState({
            isAddingCompany: true
        });
    }


    this.getItemList = function() {
        if (this.props.filter == "") return this.state.items;
        return this.state.items.filter((item)=>{
            return JSON.stringify(item).toLowerCase().includes(this.props.filter.toLowerCase());
        });
    }

    this.addCompany = addCompany.bind(this);

    function addCompany(company) {
        api.addCompanyPromise(company).then(company => {
            toast(`Company ${company.name} is created`, {type: 'info'});
            this.setState(state => {
                state.items.push(company);
                return {
                    items: state.items,
                    isAddingCompany: false
                }
            });
        }).catch(error => console.error(error));
    }

    this.startDeleteCompany = startDeleteCompany.bind(this);

    function startDeleteCompany(selectedCompany) {
        this.setState({
            isDeletingCompany: true,
            selectedCompany: selectedCompany
        });
    }

    this.deleteCompany = deleteCompany.bind(this);

    function deleteCompany(selectedCompany) {
        console.log("delete company", selectedCompany);
        api.deleteCompanyPromise(selectedCompany.idCompany).then((deletedCompany) => {
            toast(`Company ${deletedCompany.name} is deleted`, {type: 'info'});
            this.setState(state => {
                let companies = state.items;
                let idx = companies.findIndex(c => c.idCompany === deletedCompany.idCompany);
                companies.splice(idx, 1);
                return {
                    items: companies,
                    isDeletingCompany: false
                }
            });
        }).catch(e => console.error(e));
    }

    function listCompany(selectedCompany) {
        api.getCompaniesPromise().then((companies) => {
            this.setState({items: companies})
        }).catch();
    }

    this.startEditCompany = startEditCompany.bind(this);

    function startEditCompany(selectedCompany) {
        this.setState({
            isEditingCompany: true,
            selectedCompany: selectedCompany
        });
    }

    this.editCompany = editCompany.bind(this);

    function editCompany(company) {
        api.editCompanyPromise(company).then(company => {
            toast(<span>Company <strong
                style={{color: 'yellow'}}>{company.name}</strong> is updated</span>, {type: 'info'});
            this.setState(state => {
                let idx = state.items.findIndex(c => c.idCompany === company.idCompany);
                state.items.splice(idx, 1, company);
                return {
                    items: state.items,
                    isEditingCompany: false
                }
            });
        }).catch(e => console.error(e))
    }

    this.render = function () {
        return <div className={"PageCompany"}>
            <ListCompany itemPerPage={10} actions={[{
                name: "Add", handler: startAddCompany.bind(this), show: true
            }, {
                name: "Delete", handler: this.startDeleteCompany, show: true
            }, {
                name: "Edit", handler: this.startEditCompany, show: true
            }, {
                name: "Refresh", handler: listCompany.bind(this), show: true
            }]} items={this.getItemList()}/>
            <CompanyInfoModal isOpen={this.state.isAddingCompany}
                              onOk={this.addCompany} onCancel={(e) => this.setState({isAddingCompany: false})}/>
            <CompanyInfoModal isOpen={this.state.isEditingCompany} company={this.state.selectedCompany}
                              onOk={this.editCompany} onCancel={(e) => this.setState({isEditingCompany: false})}/>
            <ConfirmationModal isOpen={this.state.isDeletingCompany} title="Confirmation"
                               message="Are you sure to delete selected company?"
                               onCancel={() => this.setState({isDeletingCompany: false})}
                               onOk={() => this.deleteCompany(this.state.selectedCompany)}/>
        </div>
    }
}

PageCompany.prototype = Object.create(React.Component.prototype);
