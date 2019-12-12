const React = require('react');

function MyFilteredList(props) {
    let Component = props.Component;
    let searchStr = props.searchStr;
    let companyFilter = props.companyFilter;
    
    delete props.searchStr;
    delete props.companyFilter;
    delete props.Component;
    return <Component {...props}/>
}