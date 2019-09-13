const React = require('react');
const ReactRouter = require('react-router-dom');
const Route = ReactRouter.Route;

function CustomRoute(props) {
    return <Route  render={(anotherProps) => React.createElement(require('./../../pages/' + props.component), props)} />;
}


module.exports = CustomRoute;