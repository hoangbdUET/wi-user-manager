module.exports = ListLicensePackage;
const React = require('react');
require("./style.less");
const RowLicensePackage = require('../RowLicensePackage');
const MyList = require('../MyList');

function ListLicensePackage(props) {
    MyList.call(this, props);
    this.listName = "License Package";
    this.state = Object.assign(this.state, {
        orderByText: "",
        colWidths: [50,250,250]
    });
    let superRender = this.render;
    this.render = function () {
        let items = this.props.items;
        let headerObj = {name: "Name", description: "Description"};
        let controlBar = superRender.call(this);
        return <div className={"MyList"}>
            {controlBar}
            <div className="overflow-auto">
                <RowLicensePackage onClick={e => {
                }}
                                   idx={undefined} selected={false}
                                   item={headerObj}
                                   colWidths={this.state.colWidths}
                                   onColWidthChanged={this.changeColWidth}
                                   isHeader={true} onCellClicked={this.onHeaderClicked}
                />
                <div>
                    {
                        this.filterAndSort(items).map((item, idx) => (
                            <RowLicensePackage onClick={e => this.handleRowClick(item)}
                                               key={idx + this.state.startAt}
                                               idx={idx + this.state.startAt}
                                               item={item}
                                               colWidths={this.state.colWidths}
                                               selected={this.state.selectedItem === item}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    }
}

ListLicensePackage.prototype = Object.create(React.Component.prototype);