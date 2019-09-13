require("babel-polyfill");
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const LeftNavigation = require('./pages/LeftNavigation');
const MainContent = require('./pages/MainContent');
const {ToastContainer, toast} = require('react-toastify');
const Fragment = React.Fragment;

require('react-toastify/dist/ReactToastify.min.css');
require("./reset.css");
require("./main.less");
const containerElem = document.getElementById('react-app');
// ReactDOM.render(<Fragment><HelloWorld name="Hoang"/><GoodbyeWorld name="HoangBD"/></Fragment>, containerElem);

toast.configure({
    autoClose: 5000,
    draggable: false,
    position: toast.POSITION.BOTTOM_RIGHT
});

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
           
            <MainContent default="/company" routes={
                [
                    // {path:"/", component: "PageCompany"},
                    {path: "/user", component: "PageUser"},
                    {path: "/group", component: "PageGroup"},
                    {path: "/company", component: "PageCompany"},
                    {path: "/project", component: "PageProject"}
                ]
            }/>

        </Router>
        <ToastContainer />
    </Fragment>
), containerElem);
