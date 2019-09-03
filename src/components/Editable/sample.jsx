const Editable = require('../index.js').Editable;
const ReactDOM = require('react-dom');
const React = require('react');
const elem = document.querySelector('.react-holder');
function handleChange(val) {
    console.log("new value:" + val);
}
function setValue(val) {
    return isNaN(val)?"NaN":Math.round(Number(val));
}
ReactDOM.render( <Editable value={10} onValueChanged={handleChange} setValue={setValue} />, elem);
