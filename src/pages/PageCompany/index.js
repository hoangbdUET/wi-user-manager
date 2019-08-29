module.exports = PageCompany;
require('./style.less');
const React = require('react');
const HeaderForm = require('../../components/HeaderForm');
const MyList = require('../../components/MyList');

function PageCompany() {
	React.Component.call(this);
	this.state = {
		itemPerPage: 5
	};
	this.handleIPPChanged = handleIPPChanged.bind(this);
	function handleIPPChanged(newItemPerPage) {
		this.setState({
			itemPerPage: newItemPerPage
		});
	}
	this.render = function() {

		return <div className={"PageCompany"}>
			<HeaderForm title={"Company"} onItemPerPageChanged={this.handleIPPChanged}/>
			<MyList itemPerPage={this.state.itemPerPage} />
		</div>
		/*
		items={
				[
					{
						name: "FPT",
						age: 24
					},{
					name: "CMC",
					age: 24
				},{
					name: "BKAV",
					age: 24
				},{
					name: "FPT",
					age: 24
				},{
					name: "CMC",
					age: 24
				},{
					name: "BKAV",
					age: 24
				},{
					name: "FPT",
					age: 24
				},{
					name: "CMC",
					age: 24
				},{
					name: "BKAV",
					age: 24
				},{
					name: "FPT",
					age: 24
				},{
					name: "CMC",
					age: 24
				},{
					name: "BKAV",
					age: 24
				},{
					name: "FPT",
					age: 24
				},{
					name: "CMC",
					age: 24
				},{
					name: "BKAV",
					age: 24
				},{
					name: "FPT",
					age: 24
				},{
					name: "CMC",
					age: 24
				},{
					name: "BKAV",
					age: 24
				},{
					name: "FPT",
					age: 24
				},{
					name: "CMC",
					age: 24
				},{
					name: "BKAV",
					age: 24
				}]}
		 */
	}
}
PageCompany.prototype = Object.create(React.Component.prototype);