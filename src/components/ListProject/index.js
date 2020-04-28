module.exports = ListProject;
const React = require('react');
const RowProject = require('../RowProject');
const MyList = require('../MyList');

function ListProject(props) {
    MyList.call(this, props);
    this.listName = "Project";
    this.state = Object.assign(this.state, {
        orderByText: "",
        colWidths: [50, 200, 200, 150, 200, 100, 250, 0]
    });
    let superRender = this.render;
    this.render = () => {
        let controlBar = superRender.call(this);
        let headerObj = {
            alias: "Alias",
            company: "Company",
            location: "Location",
            department: "Department",
            createdBy: "Created By",
            description: "Description",
            shareKey: "Sharing Key"
        };
        return (
            <div className={"MyList ListProject"}>
                {controlBar}
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
                    <RowProject onClick={() => {
                    }} item={headerObj} selected={false}
                                colWidths={this.state.colWidths}
                                isHeader={true}
                                onCellClicked={this.onHeaderClicked}
                                onColWidthChanged={this.changeColWidth}/>
                    <div style={{flex: 1, overflow: 'auto'}}>{
                        this.filterAndSort(this.props.items).map((item, idx) => (
                            <RowProject key={this.state.startAt + idx}
                                        idx={this.state.startAt + idx}
                                        colWidths={this.state.colWidths}
                                        onClick={(e) => this.handleRowClick(item)}
                                        selected={this.state.selectedItem === item}
                                        item={item}/>
                        ))
                    }</div>
                </div>
            </div>
        )
    }
}

ListProject.prototype = Object.create(React.Component.prototype);