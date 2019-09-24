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
                       props.isHeader ? props.item.status : props.item.status === "Active" ?
                           <div className="activeUser">
                                 {/* <div></div> */}
                                {props.item.status}
                            </div> :
                           <div className="inActiveUser">
                                 {/* <div></div> */}
                                {props.item.status}
                           </div>,
                        <div className="cell-ellipsis">
                            {props.item.username}
                        </div>,
                       <div className="cell-ellipsis">
                           {props.item.email}
                       </div>,
                       <div className="cell-ellipsis">
                            {props.isHeader ? props.item.role : myRole['' + props.item.role]}
                        </div>,
                       <div className="cell-ellipsis">
                            {props.item.fullname}
                        </div>,
                        <div className="cell-ellipsis">
                            {props.isHeader ? props.item.company : props.item.company ? props.item.company.name : ""}
                        </div>,
                        <div className="cell-ellipsis">
                            {props.isHeader ? props.item.license_package : props.item.license_package ? props.item.license_package.name : ""}
                        </div>
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