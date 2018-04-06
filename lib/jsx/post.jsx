'use babel';

var React = require('react');
var ReactDOM = require('react-dom');

class Content extends React.Component {
    
}

module.exports = class Post extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            'post': props.post,
            'snoowrap': props.snoowrap || props.post._r
        };
    }

    render() {
        const post = this.state.post;
        return (
            <h1>{post.title}</h1>
            <Content post={post} />
        );
    }
}
