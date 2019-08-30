module.exports = PageCompany;
require('./style.less');
const api = require("../../services/apiClient");
const React = require('react');
const Modal = require('react-modal');
Modal.setAppElement('#react-app');
const ListCompany = require('../../components/ListCompany');

function PageCompany() {
	React.Component.call(this);
	this.state = {
		items: [],
		addCompanyModalOpen: false
	};
	listCompany.call(this);
	this.addCompany = addCompany.bind(this);
	function addCompany(selectedCompany) {
		this.setState({
			addCompanyModalOpen: true
		});
		console.log("add company");
	}
	this.closeModal = closeModal.bind(this);
	function closeModal() {
		this.setState({
			addCompanyModalOpen: false
		})
	}

	function deleteCompany(selectedCompany) {
		console.log("delete company", selectedCompany);
		api.deleteCompanyPromise(selectedCompany.idCompany).then((deletedCompany) => {
			this.setState(state => {
				let companies = state.items;
				let idx = companies.findIndex(c => c.idCompany === deletedCompany.idCompany);
				companies.splice(idx, 1);
				return {
					items: companies
				}
			});
		}).catch();
	}
	function listCompany(selectedCompany) {
		api.getCompaniesPromise().then((companies) => {
			this.setState({items: companies})
		}).catch();
	}

	function doAdd(e) {
		e.preventDefault();
		console.log("Add company");
	}
	this.render = function() {
		return <div className={"PageCompany"}>
			<ListCompany itemPerPage={5} actions={[{
				name: 'Add', handler: addCompany.bind(this)
			},{
				name: "Delete", handler: deleteCompany.bind(this)
			}, {
				name: "Refresh", handler: listCompany.bind(this)
			}]} items={this.state.items}/>
			<Modal isOpen={this.state.addCompanyModalOpen}
			       contentLabel={"Add Company"}>
				<form onSubmit={doAdd.bind(this)}>
					<div className="fieldset">
						<label>Name:</label>
						<input type={"text"} />
					</div>
					<div className="fieldset">
						<label>Name:</label>
						<input type={"text"} />
					</div>
					<div className="fieldset">
						<label>Name:</label>
						<input type={"text"} />
					</div>
					<input type={"submit"} value={"Add"} text={"add"} />
				</form>
				<button onClick={this.closeModal}>Close</button>
			</Modal>
		</div>
	}
}
PageCompany.prototype = Object.create(React.Component.prototype);