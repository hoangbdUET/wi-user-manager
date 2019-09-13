module.exports = MainContent;
require('./style.less');
const React = require('react');
const ReactRouter = require('react-router-dom');
const Switch = ReactRouter.Switch;
const Route = ReactRouter.Route;
const Redirect = ReactRouter.Redirect;
const CustomRoute = require('./../../components/CustomRoute');

function MainContent(props) {
    let routes = props.routes;
    return (<div className="MainContent" style={{display:'flex',flexDirection:'column', width:'100%'}}>
        <div className={"top-bar"}>
            <div className={"search-box"}>
                <div style={{marginRight:'10px',color:'#000'}} className={"ti ti-search"}></div>
                <input placeholder="Filter" />
            </div>
            <div className={"name"}>{localStorage.getItem('username') || "Guest" }/{localStorage.getItem('company') || "I2G"}</div>
            <div className={"logout-btn"}>Logout</div>
            <div className={"user-picture"}></div>
        </div>
        <div className={"main-content"}>
            <Switch>
                {routes.map((aRoute, idx) => <CustomRoute key={idx} path={aRoute.path} name={aRoute.path} exact
                                                    component={aRoute.component}/>)}
                <Redirect exact from="/" to={props.default}/>
            </Switch>
        </div>
    </div>)
}