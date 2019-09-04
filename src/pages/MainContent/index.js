module.exports = MainContent;
require('./style.less');
const React = require('react');
const ReactRouter = require('react-router-dom');
const Switch = ReactRouter.Switch;
const Route = ReactRouter.Route;
const Redirect = ReactRouter.Redirect;

function MainContent(props) {
    let routes = props.routes;
    return (<div className={"MainContent"}>
        <Switch>
            {routes.map((aRoute, idx) => <Route key={idx} path={aRoute.path} name={aRoute.path}
                                                component={require("../" + aRoute.component)}/>)}
            <Redirect exact from="/" to={props.default}/>
        </Switch>
    </div>)
}