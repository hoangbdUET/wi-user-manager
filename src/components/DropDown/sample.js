const DropDown = require('../index.js').DropDown;
const ReactDOM = require('react-dom');
const React = require('react');
const Fragment = React.Fragment;
const elem = document.querySelector('.react-holder');

function App() {
    React.Component.call(this);
    this.state = {
        students: []
    }
    for (let i = 0; i < 10000; i++)
        this.state.students.push({name: 'Student ' + i, age: 22});

    function getStudent(student) {
        return (
            <div style={{
                height: 20,
                display: 'flex'
            }}>
                {
                    student ? (<Fragment>
                        <div style={{flex: 1}}>{student.name}</div>
                        <div style={{flex: 1}}>{student.age}</div>
                    </Fragment>) : "[Select item]"
                }
            </div>
        )
    }

    function formatStudent(student) {
        return (
            <div style={{
                height: 20,
                display: 'flex'
            }}>
                {
                    student ? (<Fragment>
                        <div style={{flex: 1}}>{student.name}</div>
                    </Fragment>) : "[Select item]"
                }
            </div>
        )
    }

    this.render = function () {
        return (<DropDown formatItem={formatStudent} getItem={getStudent.bind(this)} items={this.state.students}
                          itemHeight={20}/>)
    }
}

App.prototype = Object.create(React.Component.prototype);
ReactDOM.render(<App/>, elem);

