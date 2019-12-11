module.exports = LeftNavigation;
require('./style.less');
const NavLink = require('react-router-dom').NavLink;
const React = require('react');
const userService = require('./../../services/apiUser');

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
        {routes.filter((e)=>{
            let role = userService.getRole();
            if (role > 0) {
                if (e.path == '/license-package' || e.path == '/company') return false;
                else return true;
            }  
            return true;
        }).map((aRoute, idx) =>
            <div key={idx}>
                <NavLink className={classMap[aRoute.label]} to={aRoute.path} title={aRoute.label}
                         activeStyle={{backgroundColor: '#4B7DEF',  filter: 'grayscale(0) opacity(1)', backgroundBlendMode:'color-dodge'}}/>
            </div>
        )}
    </div>);
}