import {Fragment} from "react";

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const LeftNavigation = require('./pages/LeftNavigation');
const MainContent = require('./pages/MainContent');
console.log('main');
require("./reset.css");
const containerElem = document.getElementById('react-app');
// ReactDOM.render(<Fragment><HelloWorld name="Hoang"/><GoodbyeWorld name="HoangBD"/></Fragment>, containerElem);
ReactDOM.render((
	<Router>
		<LeftNavigation routes={
			[

				{path:"/user", label: "User"},
				{path:"/group", label: "Group"},
				{path:"/company", label: "Company"},
				{path:"/project", label: "Project"}
			]
		}/>
		<MainContent default="/company" routes={
			[
				// {path:"/", component: "PageCompany"},
				{path:"/user", component: "PageUser"},
				{path:"/group", component: "PageGroup"},
				{path:"/company", component: "PageCompany"},
				{path:"/project", component: "PageProject"}
			]
		} />

	</Router>
), containerElem);