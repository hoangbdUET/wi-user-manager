module.exports = ListCompany;
require('./style.less');
const React = require('react');
const MyList = require('../MyList');
const RowCompany = require("../RowCompany");

function ListCompany(props) {
    MyList.call(this, props);
    this.listName = "Company";
    this.state = Object.assign(this.state, {
        orderByText: "",
        colWidths: [100, 200, 200, 200]
    });
    let supperRender = this.render;
    this.render = function () {
        let items = this.props.items;
        let headerObj = {name: "Name", location: "Location", licenses: "Licenses", description: "Description", createdAt: "Date Created"};
        let controlBar = supperRender.call(this);
        return (<div className={"MyList"}>
            {controlBar}
            <div style={{
                flex: 1
            }}>
                <RowCompany onClick={(e) => {
                }} idx={undefined} selected={false}
                            item={headerObj}
                            colWidths={this.state.colWidths}
                            onColWidthChanged={this.changeColWidth}
                            isHeader={true} onCellClicked={this.onHeaderClicked}/>
                <div> {
                    this.filterAndSort(items).map((item, idx) => (
                        <RowCompany onClick={(e) => this.handleRowClick(item)}
                                    key={idx + this.state.startAt}
                                    idx={idx + this.state.startAt} item={item}
                                    colWidths={this.state.colWidths}
                                    selected={this.state.selectedItem === item}/>
                    ))
                }</div>
            </div>
        </div>)
    }
}

ListCompany.prototype = Object.create(MyList.prototype);
