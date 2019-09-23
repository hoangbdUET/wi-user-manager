module.exports = RowUser;
require('./style.less');
const React = require('react');
const MyRow = require('../MyRow');

function RowUser(props) {
    let idx = props.idx + 1;
    let myRole = {
        "0": "System Manager",
        "1": "Company Admin",
        "2": "Normal User",
        "3": "Admin Storage"
    };
    return (
        <MyRow className="RowUser" onClick={props.onClick || null}
               cells={
                   [
                       isNaN(idx) ? "" : idx,
                       props.item.username,
                       props.item.email,
                       props.isHeader ? props.item.status : props.item.status === "Active" ?
                           <b style={{color: "green"}}>{props.item.status}</b> :
                           <b style={{color: "red"}}>{props.item.status}</b>,
                       props.isHeader ? props.item.role : myRole['' + props.item.role],
                       props.item.fullname,
                       props.isHeader ? props.item.company : props.item.company ? props.item.company.name : "",
                       props.isHeader ? props.item.license_package : props.item.license_package ?
                           props.item.license_package.name : ""
                   ]
               }
               colWidths={props.colWidths}
               onColWidthChanged={props.onColWidthChanged}
               selected={props.selected}
               isHeader={props.isHeader}
               onCellClicked={props.onCellClicked}
        />
    )
}