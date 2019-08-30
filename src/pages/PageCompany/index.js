module.exports = PageCompany;
require('./style.less');
const api = require("../../services/apiClient");
const React = require('react');
const HeaderForm = require('../../components/HeaderForm');
const ListCompany = require('../../components/ListCompany');

function PageCompany() {
	React.Component.call(this);
	this.state = {
		items: []
	};
	listCompany.call(this);
	function addCompany(selectedCompany) {
		console.log("add company");
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
	this.render = function() {
		return <div className={"PageCompany"}>
			<ListCompany itemPerPage={5} actions={[{
				name: 'Add', handler: addCompany
			},{
				name: "Delete", handler: deleteCompany.bind(this)
			}, {
				name: "Refresh", handler: listCompany.bind(this)
			}]} items={this.state.items}/>
		</div>
	}
}
PageCompany.prototype = Object.create(React.Component.prototype);