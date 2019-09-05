module.exports = DropDown;
const React = require('react');
require('./style.less');
const VList = require('../VList');

function DropDown(props) {
    React.Component.call(this, props);
    this.state = {
        selectedItem: props.selectedItem || null,
        items: props.items || [],
        disabled: props.disabled,
        searchStr: "",
        showList: false
    }
    let searchStrInput = React.createRef();
    function onInit() {
        this.props.onInit && this.props.onInit(this);
    }

    function defaultFormatItem(item) {
        return item;
    }

    let formatter = this.props.formatItem || this.props.getItem || defaultFormatItem;

    this.handleSearchStrChanged = handleSearchStrChanged.bind(this);

    function handleSearchStrChanged(e) {
        let searchStr = e.target.value.toLowerCase();
        this.setState(state => {
            let items = this.props.items.filter(
                item => JSON.stringify(item).toLowerCase().includes(searchStr)
            );
            return {
                items: items,
                searchStr
            }
        });
    }

    this.getRawItem = getRawItem.bind(this);

    function getRawItem(idx) {
        return this.state.items[idx];
    }

    this.onItemClicked = onItemClicked.bind(this);

    function onItemClicked(clickedItem) {
        this.setState({
            selectedItem: clickedItem,
            showList: false
        });
        this.props.onItemClicked && this.props.onItemClicked(clickedItem);
    }

    this.render = function() {
        return (<div tabIndex={0} className="DropDown" 
            onKeyDown={(e) => {
                if (e.keyCode == 27) e.target.blur();
            }} 
            onBlur={() => {if (document.activeElement !== searchStrInput.current) this.setState({showList:false})}}>
            <div className={this.state.showList?"hidden-block":""}
                onClick={() => {
                	if (this.state.disabled) return;
                	this.setState({showList:true});
                } }>{formatter(this.state.selectedItem)}</div>
            <input className={this.state.showList?"":"hidden-block"} ref={searchStrInput}
                type="text" value={this.state.searchStr} onChange={this.handleSearchStrChanged} />
            <div style={{
                display:'block',
                width: '100%',
                height: '200px', 
                position:'absolute', 
                backgroundColor:'white',
                border: '1px solid #ccc',
                boxShadow: '0px 0px 10px 5px #ddd',
                zIndex: 10
            }} className={this.state.showList?"":"hidden-block"}>
                <VList getItem={this.props.getItem}
                       getRawItem={this.getRawItem}
                       onItemClicked={this.onItemClicked}
                       totalItems={() => this.state.items.length} itemHeight={this.props.itemHeight}/>
            </div>
        </div>)
    }

    onInit.call(this);
}

DropDown.prototype = Object.create(React.Component.prototype);
