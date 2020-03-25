const React = require('react');
require('./style.less');

class CenteredModal extends React.Component {
    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
    }

    onBackGroundClick(e) {
        if(this.contentRef.current.contains(e.target)) {
            //donothing
        } else {
            this.props.onCancel();
        }
    }

    render() {
        return (
            <div className="CenteredModal modal-background" style={{display: this.props.active?"flex":"none"}} onClick = {(e)=>{this.onBackGroundClick(e);}}>
                    <div ref={this.contentRef} className="modal-center">
                        {this.props.children}
                    </div>
            </div>
        );
    }
}

module.exports = CenteredModal;