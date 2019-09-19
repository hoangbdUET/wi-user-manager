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
    
    this.handleBlur = function() {
        setTimeout(()=>{
            this.setState({
                showList: false
            });
        }, 150);
        // this.setState({
        //     showList: false
        // });
    }

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
        //console.log(clickedItem);
        this.setState({
            selectedItem: clickedItem,
            showList: false
        });
        this.props.onItemClicked && this.props.onItemClicked(clickedItem);
    }

    this.render = function() {
        // console.log(this.props.items);
        return (<div tabIndex={0} className="DropDown" 
            onKeyDown={(e) => {if (e.keyCode == 27) {
                this.setState({showList: false});
            }}}>
            <div onClick={() => {
                	if (this.state.disabled) return;
                	this.setState({showList:true});
                	setTimeout(() => {searchStrInput.current.focus()}, 500);

                } }>{formatter(this.props.selectedItem)}</div>
            {/* {/* <input disabled={this.props.disableSearch} className={this.state.showList?"":"hidden-block"} ref={searchStrInput}
                type="text" value={this.state.searchStr} onChange={this.handleSearchStrChanged} onBlur={()=>this.handleBlur()}/>
            <div style={{
                display:'block',
                width: '100%',
                height: '150px', 
                position:'absolute', 
                backgroundColor:'white',
                border: '1px solid #ccc',
                boxShadow: '0px 0px 10px 5px #ddd',
                zIndex: 10
            }} className={this.state.showList?"":"hidden-block"}
                onBlur={()=>this.handleBlur()}
                // contentEditable
                // spellCheck = {false}
            >
                <VList getItem={this.props.getItem}
                       getRawItem={this.getRawItem}
                       onItemClicked={this.onItemClicked}
                       totalItems={() => this.state.items.length} itemHeight={this.props.itemHeight}
                />
                } }>{formatter(this.state.selectedItem)}
            </div> */}
            <div className="dropdow-content">
                <div className={this.state.showList?"dropdown-carret":"dropdown-carret hidden-block"}></div>
                <input className={this.state.showList?"dropdown-search":"dropdown-search hidden-block"} disabled={this.props.disableSearch} ref={searchStrInput} placeholder="Search..."
                    type="text" value={this.state.searchStr} onChange={this.handleSearchStrChanged} onBlur={()=>this.handleBlur()}/>
                <div className={this.state.showList?"dropdown-list-item":"dropdown-list-item hidden-block"}  onBlur={()=>this.handleBlur()}>
                    <VList getItem={this.props.getItem}
                        getRawItem={this.getRawItem}
                        onItemClicked={this.onItemClicked}
                        totalItems={() => this.state.items.length} itemHeight={this.props.itemHeight}
                    />
                </div>
            </div>
        </div>)
    }

    onInit.call(this);
}

DropDown.prototype = Object.create(React.Component.prototype);
