module.exports = LeftNavigation;
require('./style.less');
const NavLink = require('react-router-dom').NavLink;
const React = require('react');

function LeftNavigation(props) {
    let routes = props.routes;
    let classMap = {
        'Group': 'tab-icon ti ti-basketball',
        'Company': 'tab-icon ti ti-basketball',
        'User': 'tab-icon ti ti-basketball',
        'Project': 'tab-icon ti ti-basketball'
    };
    return (<div className={"LeftNavigation"}>
        <span className="logo">

        </span>
        {routes.map((aRoute, idx) =>
            <div key={idx}>
                <NavLink className={classMap[aRoute.label]} to={aRoute.path}
                         activeStyle={{background: '#4B7DEF', color: '#fff'}}></NavLink>
            </div>
        )}
    </div>)
}