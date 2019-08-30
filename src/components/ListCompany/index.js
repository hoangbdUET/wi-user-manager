module.exports = ListCompany;
require('./style.less');
const React = require('react');
const MyList = require('../MyList');
const RowCompany = require("../RowCompany");
const apiClient = require("../../services/apiClient");
function ListCompany(props) {
	MyList.call(this, props);
	// this.updateItems = updateItems.bind(this);
	// function updateItems() {
	// 	apiClient.getCompaniesPromise().then((content) => {
	// 		console.log(content);
	// 		this.setState({
	// 			items: content
	// 		});
	// 	}).catch(e => {
	// 		console.error(e);
	// 	});
	// }
	this.state = Object.assign(this.state, {
		orderByText: ""
	})
	this.onHeaderClicked = onHeaderClicked.bind(this);
	function onHeaderClicked(headerIdx, headerText) {
		this.setState({
			orderByText: headerText
		});
	}
	let supperRender = this.render;
	this.render = function() {
		let items = this.props.items;
		let headerObj = {name:"Name", location: "Location", licenses:"Licenses", description:"Description"};
		let controlBar = supperRender.call(this);
		return (<div className={"MyList"}>
			{controlBar}
			<div style={{
				flex: 1
			}}>
				<RowCompany onClick={(e) => {}} idx={undefined} selected={false}
				            item={headerObj}
				            isHeader={true} onCellClicked={this.onHeaderClicked}/>
				<div>
					{
						items.filter((item) => {
							let str = JSON.stringify(item).toLowerCase();
							console.log(str);
							return str.includes(this.state.searchStr.toLowerCase());
						})
							.sort((a, b) => {
								let key = this.state.orderByText.toLowerCase();
								return ("" + a[key]).localeCompare("" + b[key]);
							})
							.filter((item, idx) => (idx >= this.state.startAt && idx < this.state.startAt + this.state.itemPerPage))
							.map((item, idx) => (

								<RowCompany onClick={(e) => this.handleRowClick(item)}
								            key={idx + this.state.startAt}
								            idx={idx + this.state.startAt} item={item}
								            selected={this.state.selectedItem === item}/>
							))
					}
				</div>
			</div>
		</div>)
	}
}
ListCompany.prototype = Object.create(MyList.prototype);
