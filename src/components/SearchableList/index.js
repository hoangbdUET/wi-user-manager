require('./style.less');

const React = require('react');
const VList = require('../VList');

class SearchableList extends React.Component {
    // React.Component.call(this, props);
    // this.state = {
    //     searchStr:"",
    //     startAt: props.startAt,
    //     totalItems: props.totalItems,
    //     items: props.items
    // }

    constructor(props) {
        super(props);
        this.state = {
            searchStr:"",
            startAt: props.startAt,
            totalItems: props.totalItems,
            items: props.items
        }
    }

    static getDerivedStateFromProps(nextProps, currentState) {
        return {
            items: currentState.searchStr == "" ? nextProps.items : nextProps.items.filter(item=>{
                return JSON.stringify(item).toLowerCase().includes(currentState.searchStr);
            })
        };
    }

    render() {
        console.log('state:', this.state);
        return (<div className="SearchableList">
            <div>
                <input value={this.state.searchStr} onChange={(e) => {
                    // console.log('runed');
                    // if (e.target.value == "") {
                    //     this.setState({
                    //         searchStr: e.target.value,
                    //         items: this.props.items
                    //     });
                    // }
                    // this.setState({
                    //     searchStr: e.target.value,
                    //     items: this.props.items.filter(item => {
                    //         return JSON.stringify(item).toLowerCase().includes(e.target.value);
                    //     })
                    // })
                    this.setState({
                        searchStr: e.target.value
                    });
                }} placeholder="Search ..."/>
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

module.exports = SearchableList;

// SearchableList.prototype = Object.create(React.Component.prototype);