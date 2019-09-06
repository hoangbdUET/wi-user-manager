module.exports = MainContent;
require('./style.less');
const React = require('react');
const ReactRouter = require('react-router-dom');
const Switch = ReactRouter.Switch;
const Route = ReactRouter.Route;
const Redirect = ReactRouter.Redirect;

function MainContent(props) {
    let routes = props.routes;
    return (<div className="MainContent" style={{display:'flex',flexDirection:'column', width:'100%'}}>
        <div className={"top-bar"}>
            <div className={"search-box"}>
                <div style={{marginRight:'10px',color:'#000'}} className={"ti ti-search"}></div>
                <div>Filter</div>
            </div>
            <div className={"name"}>{localStorage.getItem('username') || "Guest" }/{localStorage.getItem('company') || "I2G"}</div>
            {/* <div className={"logout-btn"}>Logout</div> */}
            <div className={"user-picture"}></div>
        </div>
        <div className={"main-content"}>

            <Switch>
                {routes.map((aRoute, idx) => <Route key={idx} path={aRoute.path} name={aRoute.path}
                                                    component={require("../" + aRoute.component)}/>)}
                <Redirect exact from="/" to={props.default}/>
            </Switch>
        </div>
    </div>)
}