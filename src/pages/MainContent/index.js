module.exports = MainContent;
require('./style.less');
const React = require('react');
const ReactRouter = require('react-router-dom');
const Switch = ReactRouter.Switch;
const Route = ReactRouter.Route;
const Redirect = ReactRouter.Redirect;
const CustomRoute = require('./../../components/CustomRoute');
const LeftNavigation = require('./../LeftNavigation');

function MainContent(props) {
    React.Component.call(this, props);
    this.state = {
        filter: ""
    }
    this.resetFilter = function() {
        this.setState({
            filter: ""
        });
    }
    let routes = props.routes;
    this.render = function() { 
        return (
            <div>
                <div className="MainContent" style={{display:'flex',flexDirection:'column', width:'100vw', height:'100vh'}}>
                    <div className={"main-content"}>
                        <Switch>
                            {routes.map((aRoute, idx) => <CustomRoute key={idx} path={aRoute.path} name={aRoute.path} exact
                                                                component={aRoute.component} filter = {this.state.filter} resetFilter = {()=>{
                                                                    this.resetFilter();
                                                                }} auth = {aRoute.auth}/>)}
                            <Redirect to={props.default} />
                        </Switch>
                    </div>
                </div> 
            </div>);
    }
}

MainContent.prototype = Object.create(React.Component.prototype);