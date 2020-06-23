module.exports = VList;
const React = require('react');
const PropTypes = require('prop-types');
VList.propTypes = {
    startAt: PropTypes.number,
    totalItems: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    itemHeight: PropTypes.number,
    onItemClicked: PropTypes.func,
    getItem: PropTypes.func,
    getRawItem: PropTypes.func
}
require('./style.less');
function evaluate(expr) {
    if (typeof expr === 'function') {
        return expr();
    }
    return expr;
}

function VListItem(props) {
    React.Component.call(this, props);
    this.handleClick = handleClick.bind(this);
    function handleClick(e) {
        this.props.item.selected = !this.props.item.selected;
        this.props.onItemClicked && this.props.onItemClicked(this.props.item);
    }

    this.render = function() {
        return <div onClick={this.handleClick} style={{
            cursor: 'pointer',
            transform: `translateY(${this.props.offset}px)`,
            // padding: '5px 0'
        }} className={(this.props.item || {}).selected?"selectedRow":""}>{this.props.children}</div>;
    }
}

VListItem.prototype = Object.create(React.Component.prototype);

function VList(props) {
    React.Component.call(this, props);
    this.state = {
        startAt: props.startAt || 0,
        viewLength: props.viewLength || 10,
        totalItems: props.totalItems || 1000,
        itemHeight: props.itemHeight || 18
    }
    this.scrollContainer = React.createRef();

    function defaultGetItem(item) {
        return item.index;
    }

    function defaultGetRawItem(idx) {
        return {index: idx};
    }
    this.getItem = getItem.bind(this);
    function getItem(idx) {
        const getter = this.props.getItem || defaultGetItem;
        const rawGetter = this.props.getRawItem || defaultGetRawItem;
        const item = rawGetter(idx);
        return (<VListItem key={idx} item={item} 
            onItemClicked={(item) => {
                for (let i = 0; i < evaluate(this.state.totalItems); i++) {
                    let cItem = rawGetter(i);
                    if (cItem !== item) {
                        cItem.selected = false;
                    }
                }
                this.forceUpdate();
                this.props.onItemClicked && this.props.onItemClicked(item);
            }}
            offset={this.state.startAt * this.state.itemHeight}>
            {getter(item)}
        </VListItem>)
    }

    this.getItems = getItems.bind(this);
    function getItems(startIdx, viewLength) {
        let items = [];
        for (let i = startIdx; i < viewLength + startIdx; i++) {
            items.push(this.getItem(i));
        }
        return items;
    }

    this.handleScroll = handleScroll.bind(this);

    function handleScroll(e) {
        let scrollTop = e.target.scrollTop;
        e.preventDefault();
        // console.log('scrollTop:', scrollTop);
        let newStartAt = Math.floor(scrollTop/this.state.itemHeight);
        this.setState({
            startAt: newStartAt
        });

    }
    this.componentDidMount = function() {
        let height = this.scrollContainer.current.clientHeight;
        this.setState(state => {
            return {
                viewLength: Math.ceil(height/state.itemHeight)
            }
        });
    }

    this.componentDidUpdate = function(prevProps) {
        if (this.props.reset) {
            if (this.props.reset.value) {
                this.props.reset.value = false;
                this.scrollContainer.current.scrollTop = 0;
            }
        }
        
    }

    this.render = function() {
        //console.log('num:', this.state.startAt, this.state.viewLength, evaluate(this.state.totalItems))
        return (
            <div className="VList" ref={this.scrollContainer} style={{ 
                height: '100%',
                overflow:'auto'
            }} onScroll={(e) => this.handleScroll(e)}>
                <div 
                    style={{
                    height: this.state.itemHeight * evaluate(this.state.totalItems)}}
                    >
                    {this.getItems(this.state.startAt, Math.min(this.state.viewLength, evaluate(this.state.totalItems)))}
                </div>
            </div>
        )
    }
}

VList.prototype = Object.create(React.Component.prototype);
