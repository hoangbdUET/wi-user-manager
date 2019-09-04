module.exports = LeftNavigation;
require('./style.less');
const Link = require('react-router-dom').Link;
const React = require('react');

function LeftNavigation(props) {
    let routes = props.routes;
    return (<ul className={"LeftNavigation"}>
        {routes.map((aRoute, idx) => <li key={idx}><Link to={aRoute.path}>{aRoute.label}</Link></li>)}
    </ul>)
}