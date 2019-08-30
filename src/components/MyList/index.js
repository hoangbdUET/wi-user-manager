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
		items: props.items || []
	};

    updateItems.call(this);

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

	this.updateItems = updateItems.bind(this);
	function updateItems() {
		apiClient.getCompaniesPromise().then((content) => {
			console.log(content);
			this.setState({
				items: content
			});
		}).catch(e => {
			console.error(e);
		});
	}

	this.render = function () {
		let items = this.state.items;
		return <div className={"MyList"}>
			<select onChange={this.handleItemPerPageChanged}>
				<option value={5}>5</option>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={30}>30</option>
			</select>
			<input type={"text"} value={this.state.searchStr} onChange={this.handleSearchStrChanged} />
			<button onClick={this.handlePrevClick}>Previous</button>
			<button onClick={this.handleNextClick}>Next</button>
			<button onClick={this.updateItems}>Refresh</button>
			<div>
                <RowCompany onClick={(e) => {}} idx={undefined} selected={false} 
                    item={{name:"Name", location: "Location", licenses:"Licenses", description:"Description"}}
                    isHeader={true} />
                <div>
                {
                    items.filter((item) => {
                        let str = JSON.stringify(item).toLowerCase();
                        console.log(str);
                        return str.includes(this.state.searchStr.toLowerCase());
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
		</div>
	}
}
/*
<MyRow onClick={(e) => this.handleRowClick(item)} key={idx + this.state.startAt}
					       cells={[idx + this.state.startAt + 1, item.name, item.age]}
					       selected={this.state.selectedItem === item}/>
 */
MyList.prototype = Object.create(React.Component.prototype);
