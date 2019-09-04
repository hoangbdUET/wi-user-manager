const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const LeftNavigation = require('./pages/LeftNavigation');
const MainContent = require('./pages/MainContent');
const {ToastContainer} = require('react-toastify');
const Fragment = React.Fragment;

require('react-toastify/dist/ReactToastify.min.css');
require("./reset.css");
require("./main.less");
const containerElem = document.getElementById('react-app');
// ReactDOM.render(<Fragment><HelloWorld name="Hoang"/><GoodbyeWorld name="HoangBD"/></Fragment>, containerElem);
ReactDOM.render((
    <Fragment>
        <Router>
            <LeftNavigation routes={
                [

                    {path: "/user", label: "User"},
                    {path: "/group", label: "Group"},
                    {path: "/company", label: "Company"},
                    {path: "/project", label: "Project"}
                ]
            }/>
            <div style={{display:'flex',flexDirection:'column', width:'100%'}}>
                <div className={"top-bar"}>
                    <div className={"search-box"}>
                        <div style={{marginRight:'10px',color:'#000'}} className={"ti ti-search"}></div>
                        <div>Filter</div>
                    </div>
                    <div className={"name"}>hungnk/I2G</div>
                    {/* <div className={"logout-btn"}>Logout</div> */}
                    <div className={"user-picture"}></div>
                </div>
                <MainContent default="/company" routes={
                    [
                        // {path:"/", component: "PageCompany"},
                        {path: "/user", component: "PageUser"},
                        {path: "/group", component: "PageGroup"},
                        {path: "/company", component: "PageCompany"},
                        {path: "/project", component: "PageProject"}
                    ]
                }/>
            </div>

        </Router>
        <ToastContainer/>
    </Fragment>
), containerElem);
