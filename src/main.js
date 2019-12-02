require("babel-polyfill");
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const LeftNavigation = require('./pages/LeftNavigation');
const MainContent = require('./pages/MainContent');
const {ToastContainer, toast} = require('react-toastify');
require('../node_modules/@icon/themify-icons/themify-icons.css');
const Fragment = React.Fragment;

require('react-toastify/dist/ReactToastify.min.css');
require("./reset.css");
require("./main.less");
const containerElem = document.getElementById('react-app');
// ReactDOM.render(<Fragment><HelloWorld name="Hoang"/><GoodbyeWorld name="HoangBD"/></Fragment>, containerElem);

toast.configure({
    autoClose: 5000,
    draggable: false,
    position: toast.POSITION.TOP_RIGHT
});

ReactDOM.render((
    <div style={{width: '100%'}}>
        <Router>

            <MainContent default="/user" routes={
                [
                    {path: "/user", component: "PageUser", auth: "true"},
                    {path: "/group", component: "PageGroup", auth: "true"},
                    {path: "/company", component: "PageCompany", auth: "true"},
                    {path: "/project", component: "PageProject", auth: "true"},
                    {path: '/license-package', component: "PageLicensePackage", auth: "true"},
                    {path: "/login", component: "Login", auth: "false"},
                    {path: "/feature", component: "PageFeature", auth: "true"}
                ]
            }/>

        </Router>
        <ToastContainer closeButton={false}/>
    </div>
), containerElem);
