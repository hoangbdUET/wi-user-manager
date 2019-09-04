module.exports = ListUser;
const React = require('react');
const MyList = require('../MyList');

function ListUser(props) {
    MyList.call(this, props);
    this.state = {};
    this.render = function () {
        return (
            <div className="MyList ListUser">

            </div>
        )
    }
}

ListUser.prototype = Object.create(React.Component.prototype);