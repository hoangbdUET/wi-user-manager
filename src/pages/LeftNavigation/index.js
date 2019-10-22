module.exports = LeftNavigation;
require('./style.less');
const NavLink = require('react-router-dom').NavLink;
const React = require('react');

function LeftNavigation(props) {
    let routes = props.routes;
    let classMap = {
        'Group': 'tab-icon group-user-manager',
        'Company': 'tab-icon company-user-manager',
        'User': 'tab-icon user-user-manager',
        'Project': 'tab-icon project-user-manager',
        'License Package': 'tab-icon license-package-manager',
        'Feature': 'tab-icon feature-package-manager'
    };
    return (<div className={"LeftNavigation"}>
        <span className="logo">

        </span>
        {routes.map((aRoute, idx) =>
            <div key={idx}>
                <NavLink className={classMap[aRoute.label]} to={aRoute.path} title={aRoute.label}
                         activeStyle={{backgroundColor: '#4B7DEF',  filter: 'grayscale(0) opacity(1)', backgroundBlendMode:'color-dodge'}}/>
            </div>
        )}
    </div>);
}