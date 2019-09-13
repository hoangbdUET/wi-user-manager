module.exports = LicensePackage;
const React = require('react');
require('./style.less');
let ListLicensePackage = require('../../components/ListLicensePackage');
const api = require('../../services/apiClient');

function LicensePackage(props) {
    this.state = {
        items: [],
        isAddingLicensePackage: false,
        isEditingLicensePackage: false
    };
    this.componentDidMount = function () {
        listPackage.call(this);
    };

    this.listPackage = listPackage.bind(this);

    function listPackage() {
        api.getLicensePackages().then(packages => {
            this.setState({items: packages})
        });
    }

    this.render = function () {
        return (<div className={"LicensePackage"}>
            <ListLicensePackage itemPerPage={10} items={this.state.items} actions={[
                {name: "Refresh", handler: listPackage.bind(this), show: true}
            ]}
            />
        </div>)
    }
}

LicensePackage.prototype = Object.create(React.Component.prototype);