module.exports = SearchableList;

require('./style.less');

const React = require('react');
const VList = require('../VList');

function SearchableList(props) {
    React.Component.call(this, props);
    this.state = {
        searchStr:"",
        startAt: props.startAt,
        totalItems: props.totalItems,
        items: props.items
    }
    this.render = function() {
        return (<div className="SearchableList">
            <div>
                <input value={this.state.searchStr} onChange={(e) => {this.setState({
                    searchStr: e.target.value,
                    items: this.props.items.filter(item => JSON.stringify(item).toLowerCase().includes(e.target.value))
                })}} placeholder="Search ..."/>
            </div>
            <div style={{flex:1, overflow:'hidden'}}>
                <VList startAt={this.state.startAt} totalItems={() => (this.state.items || []).length} 
                    itemHeight={this.props.itemHeight}
                    onItemClicked={this.props.onItemClicked}
                    getItem={this.props.getItem}
                    getRawItem={(idx) => this.state.items[idx]} />
            </div>
        </div>)
    }
}

SearchableList.prototype = Object.create(React.Component.prototype);