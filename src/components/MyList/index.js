module.exports = MyList;
const React = require('react');
require('./style.less');
const RowCompany = require('../RowCompany');
const apiClient = require('../../services/apiClient');

function MyList(props) {
	React.Component.call(this, props);
	let searchStr = props.searchStr || "";
	this.state = {
		startAt: props.startAt || 0,
		selectedItem: null,
		itemPerPage: props.itemPerPage || 5,
		searchStr: searchStr,
		// items: props.items || [],
		refresh: props.refresh || 0
	};

    //

	this.handleNextClick = handleNextClick.bind(this);

	function handleNextClick(e) {
		this.setState((state) => {
			let newStartAt = state.startAt + this.state.itemPerPage;
			return {
				startAt: newStartAt > this.state.items.length ? this.state.startAt : newStartAt
			}
		});
	}

	this.handleRowClick = handleRowClick.bind(this);

	function handleRowClick(item) {
		this.setState({
			selectedItem: item
		});
	}

	this.handlePrevClick = handlePrevClick.bind(this);

	function handlePrevClick(e) {
		this.setState((state) => {
			let newStartAt = state.startAt - this.state.itemPerPage;
			return {
				startAt: newStartAt < 0 ? 0 : newStartAt
			}
		});
	}

	this.handleItemPerPageChanged = handleItemPerPageChanged.bind(this);

	function handleItemPerPageChanged(event) {
		let selectedIdx = event.currentTarget.selectedIndex;
		let itemPerPage = parseInt(event.currentTarget.options[selectedIdx].value);
		this.setState({
			itemPerPage: itemPerPage
		});
	}

	this.handleSearchStrChanged = handleSearchStrChanged.bind(this);
	function handleSearchStrChanged(e) {
		this.setState({
			searchStr: e.target.value
		});
	}

	// this.updateItems = updateItems.bind(this);
	// function updateItems() {
	// 	console.error("This is abstract");
	// }

	this.render = function () {
		return (<div>
			<select onChange={this.handleItemPerPageChanged}>
				<option value={5}>5</option>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={30}>30</option>
			</select>
			<input type={"text"} value={this.state.searchStr} onChange={this.handleSearchStrChanged} />
			<button onClick={this.handlePrevClick}>Previous</button>
			<button onClick={this.handleNextClick}>Next</button>
			<div className={"custom-actions"}>
				{
					this.props.actions && this.props.actions.map(
						(action, idx) => (<button key={idx} onClick={(e) => action.handler(this.state.selectedItem)}>{action.label || action.title || action.name}</button>)
					)
				}
			</div>
		</div>)
	}
}
/*
<MyRow onClick={(e) => this.handleRowClick(item)} key={idx + this.state.startAt}
					       cells={[idx + this.state.startAt + 1, item.name, item.age]}
					       selected={this.state.selectedItem === item}/>
 */
MyList.prototype = Object.create(React.Component.prototype);
