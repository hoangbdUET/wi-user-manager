module.exports = MainContent;
require('./style.less');
const React = require('react');
const ReactRouter = require('react-router-dom');
const Switch = ReactRouter.Switch;
const Route = ReactRouter.Route;
const Redirect = ReactRouter.Redirect;
const CustomRoute = require('./../../components/CustomRoute');

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
            <div className="MainContent" style={{display:'flex',flexDirection:'column', width:'100%'}}>
            <div className={"top-bar"}>
                <div className={"search-box"}>
                    <div style={{marginRight: '10px', color: '#000'}} className={"ti ti-search"}/>
                    <input placeholder="Filter" value = {this.state.filter} onChange = {(e) => {
                            this.setState({filter: e.target.value});
                        }} />
                </div>
                <div className={"name"}>{localStorage.getItem('username') || "Guest" }/{localStorage.getItem('company') || "I2G"}</div>
                <div className={"logout-btn"}>Logout</div>
                <div className={"user-picture"}/>
            </div>
            <div className={"main-content"}>
                <Switch>
                    {routes.map((aRoute, idx) => <CustomRoute key={idx} path={aRoute.path} name={aRoute.path} exact
                                                        component={aRoute.component} filter = {this.state.filter} resetFilter = {()=>{
                                                            this.resetFilter();
                                                        }}/>)}
                    <Redirect exact from="/" to={props.default}/>
                </Switch>
            </div>
        </div>);
    }
}

MainContent.prototype = Object.create(React.Component.prototype);