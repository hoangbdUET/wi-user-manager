module.exports = ListGroup;
const React = require('react');
const MyList = require('../MyList');
const RowGroup = require('../RowGroup');

function ListGroup(props) {
    MyList.call(this, props);
    this.listName = "Group";
    this.state = Object.assign(this.state, {
        orderByText: "",
        colWidths: [100, 200, 200, 200]
    });
    let superRender = this.render;
    this.render = function () {
        let controlBar = superRender.call(this);
        let headerObj = {
            name: "Name",
            description: 'Description',
            company: 'Company',
            createdAt: "Date Created"
        };
        return (<div className="MyList ListGroup">
            {controlBar}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
                <RowGroup onClick={() => {
                }} item={headerObj} selected={false}
                          colWidths={this.state.colWidths} onColWidthChanged={this.changeColWidth}
                          isHeader={true} onCellClicked={this.onHeaderClicked}/>
                <div style={{flex: 1, overflow: 'auto'}}>{
                    this.filterAndSort(this.props.items).map((g, idx) => (
                        <RowGroup key={this.state.startAt + idx} idx={this.state.startAt + idx}
                                  colWidths={this.state.colWidths}
                                  onClick={(e) => this.handleRowClick(g)}
                                  selected={this.state.selectedItem === g}
                                  item={g}/>
                    ))
                }</div>
            </div>
        </div>)
    }
}

ListGroup.prototype = Object.create(React.Component.prototype);
