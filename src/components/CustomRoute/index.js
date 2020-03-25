const React = require('react');
const ReactRouter = require('react-router-dom');
const Route = ReactRouter.Route;

function CustomRoute(props) {
    return <Route  render = 
        {(anotherProps) => {
            return React.createElement(require('./../../pages/' + props.component), Object.assign(anotherProps, props));
        }
    } />;
}

module.exports = CustomRoute;