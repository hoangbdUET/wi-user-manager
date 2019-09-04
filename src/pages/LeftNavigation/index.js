module.exports = LeftNavigation;
require('./style.less');
const Link = require('react-router-dom').Link;
const React = require('react');

function LeftNavigation(props) {
	let routes = props.routes;
	let classMap = {
		'Group': 'tab-icon ti ti-basketball',
		'Company': 'tab-icon ti ti-basketball active-tab',
		'User': 'tab-icon ti ti-basketball',
		'Project': 'tab-icon ti ti-basketball'
	}
	return (<div className={"LeftNavigation"}>
		<div className="logo">

		</div>
		{routes.map((aRoute, idx) => 
			<div key={idx}>
				<Link to={aRoute.path}>{<div className={classMap[aRoute.label]}></div>}</Link>
			</div>
			)}
	</div>)
}