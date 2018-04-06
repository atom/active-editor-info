'use babel';

var React = require('react');
var ReactDOM = require('react-dom');
module.exports = class Post extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            'post': props.post,
            'snoowrap': props.snoowrap || props.post._r
        };
    }
}
