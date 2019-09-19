const VList = require('../index.js').VList;
const ReactDOM = require('react-dom');
const React = require('react');
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
                // height: 18,
                display: 'flex'
            }}>
                <div style={{flex: 1}}>{student.name}</div>
                <div style={{flex: 1}}>{student.age}</div>
            </div>
        )
    }

    function getRawStudent(idx) {
        return this.state.students[idx];
    }

    this.render = function () {
        return (<VList getItem={getStudent.bind(this)} getRawItem={getRawStudent.bind(this)}
                       onItemClicked={student => {
                           console.log(student);
                       }}/>)
    }
}

App.prototype = Object.create(React.Component.prototype);
ReactDOM.render(<App/>, elem);

