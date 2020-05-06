module.exports = MyRow;
require('./style.less');
const React = require('react');
const PropTypes = require('prop-types');
const {DraggableCore} = require('react-draggable');

MyRow.propTypes = {
    selected: PropTypes.bool,
    isHeader: PropTypes.bool,
    cells: PropTypes.array,
    onClick: PropTypes.func,
    onCellClicked: PropTypes.func,
    colWidths: PropTypes.array,
    onColWidthChanged: PropTypes.func
}

function MyRow(props) {
    const selectStyle = {
        color: props.selected ? "blue" : "black"
    };
    const selectedClass = props.selected ? "row-selected" : "";
    const headerClass = props.isHeader ? "row-header" : "";

    let colWidths = props.colWidths || [];
    let starts = [];
    let ends = [];

    function dragStart(e, data, idx) {
        console.log('Start', idx, data);
        starts[idx] = data.lastX;
    }

    function dragEnd(e, data, idx) {
        console.log('end', idx, data);
        ends[idx] = data.lastX;
        let offset = ends[idx] - starts[idx];
        let width = data.node.parentNode.clientWidth;
        width += offset;
        props.onColWidthChanged && props.onColWidthChanged(idx, width);
    }

    let headerCell = (cell, idx, len) => (
        idx < len - 1 ? (
            <div key={idx} style={colWidths[idx] ? {width: colWidths[idx]} : {flex: 1}}>
                <div className="cell-content" onClick={(e) => props.onCellClicked(idx, cell)}>{cell || '#'}</div>
                <DraggableCore handle=".resizer" axis="x"
                               onStart={(e, data) => (dragStart(e, data, idx))}
                               onStop={(e, data) => (dragEnd(e, data, idx))}>
                    <div className="resizer"/>
                </DraggableCore>
            </div>
        ) : (
            <div key={idx} style={{flex: 1}}>
                <div className="cell-content" onClick={(e) => props.onCellClicked(idx, cell)}>{cell}</div>
            </div>
        )
    )
    let typicalCell = (cell, idx, len) => (
        <div key={idx} style={colWidths[idx] && idx < len - 1 ? {width: colWidths[idx]} : {flex: 1}}>
            {cell}
            
        </div>
    )
    let len = props.cells.length;
    //console.log(props.cells)
    return (
        <div className={`MyRow ${props.className} ${selectedClass} ${headerClass}`}
             onClick={props.onClick}>
            {
                props.cells.map((cell, idx) => props.isHeader ? headerCell(cell, idx, len) : typicalCell(cell, idx, len))
            }
        </div>
    )
}
