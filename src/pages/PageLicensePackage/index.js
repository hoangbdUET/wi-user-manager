module.exports = LicensePackage;
const React = require('react');
require('./style.less');
let ListLicensePackage = require('../../components/ListLicensePackage');
const api = require('../../services/apiClient');
const {ConfirmationModal, LicensePackageInfoModal, LicensePackageNewModal} = require('../../dialogs');

function LicensePackage(props) {
	this.state = {
		items: [],
		isAddingLicensePackage: false,
		isEditingLicensePackage: false,
		isDeletingLicensePackage: false,
		selectedLicensePackage: null
	};
	this.componentDidMount = function () {
		listPackage.call(this);
	};

	this.listPackage = listPackage.bind(this);

	function listPackage() {
		api.getLicensePackages().then(packages => {
			this.setState({items: packages||[]});
		});
	}

	this.deleteLicensePackage = deleteLicensePackage.bind(this);

	function deleteLicensePackage(selectedLicensePackage) {
		console.log("Call delete ", selectedLicensePackage);
	}

	this.render = function () {
		return (<div className={"LicensePackage"}>
			<ListLicensePackage itemPerPage={10} items={this.state.items} actions={[
				{
					name: "Add", handler: () => {
						this.setState({
							isAddingLicensePackage: true
                        });
					}, show: true
				},
				{
					name: "Edit", handler: (selectedLicensePackage) => {
						this.setState({
							selectedLicensePackage: selectedLicensePackage,
							isEditingLicensePackage: true
						});
					}, show: ([selectedLicensePackage]) => (!!selectedLicensePackage)
				},
				{
					name: "Delete", handler: (selectedLicensePackage) => {
						this.setState({
							selectedLicensePackage: selectedLicensePackage,
							isDeletingLicensePackage: true
						});
					}, show: ([selectedLicensePackage]) => (!!selectedLicensePackage)
				},
				{name: "Refresh", handler: listPackage.bind(this), show: true}
			]}
			/>
			<ConfirmationModal isOpen={this.state.isDeletingLicensePackage}
			                   title="Confirmation" message="Are you sure to delete this package?"
			                   onOk={() => {
				                   this.listPackage();
				                   this.deleteLicensePackage(this.state.selectedLicensePackage);
			                   }}
			                   onCancel={() => this.setState({isDeletingLicensePackage: false})}
			/>
			{/*<LicensePackageInfoModal isOpen={this.state.isEditingLicensePackage}*/}
			{/*                         onCancel={() => {*/}
			{/*	                         this.setState({isEditingLicensePackage: false})*/}
			{/*                         }}*/}
			{/*                         onOk={() => {*/}

			{/*                         }}*/}
			{/*                         item={this.state.selectedLicensePackage}*/}
			{/*/>*/}
			<LicensePackageNewModal isOpen={this.state.isAddingLicensePackage}
			                        onCancel={() => {
				                        this.setState({isAddingLicensePackage: false});
				                        this.listPackage();
			                        }}
			/>
		</div>)
	}
}

LicensePackage.prototype = Object.create(React.Component.prototype);