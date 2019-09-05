module.exports = MyList;
const React = require('react');
require('./style.less');
const RowCompany = require('../RowCompany');
const PropTypes = require('prop-types');
const apiClient = require('../../services/apiClient');

MyList.propTypes = {
    itemPerPage: PropTypes.number,
    startAt: PropTypes.number,
    searchStr: PropTypes.string,
    actions: PropTypes.array
};

function MyList(props) {
    React.Component.call(this, props);
    const MIN_WIDTH = 60;
    let searchStr = props.searchStr || "";
    this.state = {
        startAt: props.startAt || 0,
        selectedItem: null,
        itemPerPage: props.itemPerPage || 5,
        searchStr: searchStr,
    };

    //

    this.handleNextClick = handleNextClick.bind(this);

    function handleNextClick(e) {
        this.setState((state) => {
            let newStartAt = state.startAt + this.state.itemPerPage;
            return {
                startAt: newStartAt > this.props.items.length ? this.state.startAt : newStartAt
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

    this.filterAndSort = filterAndSort.bind(this);

    function filterAndSort(items) {
        return items.filter((item) => {
            let str = JSON.stringify(item).toLowerCase();
            return str.includes(this.state.searchStr.toLowerCase());
        }).sort((a, b) => {
            let key = this.state.orderByText.toLowerCase();
            return ("" + a[key]).localeCompare("" + b[key]);
        }).filter((item, idx) => (
            idx >= this.state.startAt && idx < this.state.startAt + this.state.itemPerPage
        ));
    }

    // this.updateItems = updateItems.bind(this);
    // function updateItems() {
    // 	console.error("This is abstract");
    // }

    this.changeColWidth = changeColWidth.bind(this);

    function changeColWidth(idx, width) {
        this.setState(state => {
            let colWidths = state.colWidths;
            let offset = width - colWidths[idx];
            let nextColWidth = colWidths[idx + 1] - offset;
            if (width > MIN_WIDTH && nextColWidth > MIN_WIDTH) {
                colWidths[idx] = width;
                colWidths[idx + 1] = nextColWidth;
            }
            return {
                colWidths: colWidths
            }
        });
    }

    this.onHeaderClicked = onHeaderClicked.bind(this);

    function onHeaderClicked(headerIdx, headerText) {
        this.setState({
            orderByText: headerText
        });
    }

    let buttonStyle = {
        "Add": {
            style: {color: "rgb(22, 187, 29)", fontWeight: "bold", border: "1px solid rgb(22, 187, 29)"},
            icon: "ti ti-plus"
        },
        "Edit": {style: {color: "#4B7DEF", fontWeight: "bold"}, icon: "ti ti-pencil"},
        "Delete": {style: {color: "#F44336", fontWeight: "bold", border: "1px solid #F44336"}, icon: "ti ti-close"},
        "Refresh": {style: {color: "#4B7DEF", fontWeight: "bold"}, icon: "ti ti-reload"}
    };
    this.render = function () {
        return (
            <div className={"setting"}>
                <div className={"setting-title"}>
                    USER MANAGEMENT
                    <div className={"ti ti-angle-right"} style={{margin: '0 10px'}}/>
                    User
                </div>
                <div className={"setting-btn"}>
                    {
                        this.props.actions && this.props.actions.map(
                            (action, idx) => (
                                <div className={"btn-next"}
                                     style={buttonStyle[action.name] ? buttonStyle[action.name].style : {}}
                                     key={idx} onClick={(e) => action.handler(this.state.selectedItem)}>
                                    {action.label || action.title || action.name}
                                    <div className={buttonStyle[action.name] ? buttonStyle[action.name].icon : ""}
                                         style={{marginRight: '10px'}}/>
                                </div>
                            )
                        )
                    }

                    {/*<div className={"btn-next"}*/}
                    {/*     style={{color: "rgb(22, 187, 29)", fontWeight: "bold", border: "1px solid rgb(22, 187, 29)"}}>*/}
                    {/*    <div className={"ti ti-plus"} style={{marginRight: '10px'}}/>*/}
                    {/*    Add*/}
                    {/*</div>*/}
                    {/*<div className={"btn-next"}*/}
                    {/*     style={{color: "#F44336", fontWeight: "bold", border: "1px solid #F44336"}}>*/}
                    {/*    <div className={"ti ti-close"} style={{marginRight: '10px'}}/>*/}
                    {/*    Delete*/}
                    {/*</div>*/}
                    {/*<div className={"btn-next"} style={{color: "#4B7DEF", fontWeight: "bold"}}>*/}
                    {/*    <div className={"ti ti-pencil"} style={{marginRight: '10px'}}/>*/}
                    {/*    Edit*/}
                    {/*</div>*/}
                    {/*<div className={"btn-next"} style={{color: "#4B7DEF", fontWeight: "bold"}}>*/}
                    {/*    <div className={"ti ti-reload"} style={{marginRight: '10px'}}/>*/}
                    {/*    Refresh*/}
                    {/*</div>*/}
                    {/*<div className={"btn-next"} style={{color: "#4B7DEF", fontWeight: "bold"}}>*/}
                    {/*    <div className={"ti ti-settings"} style={{marginRight: '10px'}}/>*/}
                    {/*    Manager*/}
                    {/*</div>*/}
                    <div className={"btn-next"} style={{color: "#4B7DEF", fontWeight: "bold", padding: '5px 10px'}}>
                        Item of page:
                        <select onChange={this.handleItemPerPageChanged} style={{border: 'none', background: 'none'}}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </select>
                    </div>

                    <div className={"btn-next"} onClick={this.handlePrevClick}>
                        <div className={"ti ti-angle-left"} style={{marginRight: '10px'}}/>
                        Previous
                    </div>
                    <div className={"btn-next"} onClick={this.handleNextClick}>Next
                        <div className={"ti ti-angle-right"} style={{marginLeft: '10px'}}/>
                    </div>
                </div>
                {/* <select onChange={this.handleItemPerPageChanged}>
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
						(action, idx) => (
                            <button key={idx} onClick={(e) => action.handler(this.state.selectedItem)}>
                                {action.label || action.title || action.name}
                            </button>
                        )
                    )
                }
            </div> */}
            </div>)
    }
}

/*
<MyRow onClick={(e) => this.handleRowClick(item)} key={idx + this.state.startAt}
					       cells={[idx + this.state.startAt + 1, item.name, item.age]}
					       selected={this.state.selectedItem === item}/>
 */
MyList.prototype = Object.create(React.Component.prototype);
