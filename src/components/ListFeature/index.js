module.exports = ListFeature;
const React = require('react');
const MyList = require('../MyList');
const RowFeature = require('../RowFeature');

function ListFeature(props) {
    MyList.call(this, props);
    this.listName = "Feature";
    this.state = Object.assign(this.state, {
        orderByText: "",
        colWidths: [50, 250, 250],
    });
    let superRender = this.render;
    this.render = function () {
        let items = this.props.items;
        let headerObj = {name: "Name", description: "Description", api: "Api List"}
        let controlBar = superRender.call(this);
        return (<div className={"MyList"}>
            {controlBar}
            <div style={{flex: 1}}>
                <RowFeature onClick={e => {
                }} idx={undefined} selected={false}
                            item={headerObj} colWidths={this.state.colWidths}
                            onColWidthChanged={this.changeColWidth} isHeader={true}
                            onCellClicked={this.onHeaderClicked}/>
                <div>{this.filterAndSort(items).map((item, idx) => (
                    <RowFeature
                        onClick={e => this.handleRowClick(item)}
                        key={idx + this.state.startAt}
                        idx={idx + this.state.startAt}
                        item={item}
                        colWidths={this.state.colWidths}
                        selected={this.state.selectedItem === item}
                    />
                ))}</div>
            </div>
        </div>)
    }
}

ListFeature.prototype = Object.create(React.Component.prototype);