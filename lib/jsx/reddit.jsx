'use babel';

var React = require('react');
var ReactDOM = require('react-dom');
const snoowrap = require('snoowrap');

class PostList extends React.Component {
    constructor(props){
        super(props);
        this.state = props;
    }

    render() {
        const items = this.state.map(x => {
            
        })
    }
}

module.exports = class Reddit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reddit: new snoowrap(props)
        }
    }

    render() {
        return (
            <div>
                <h1>Reddit</h1>

            </div>
        );
    }
};
