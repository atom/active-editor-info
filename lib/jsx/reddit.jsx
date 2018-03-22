'use babel';

var React = require('react');
var ReactDOM = require('react-dom');
var redditAuth = require('../utils/redditAuth');

class PostListItem extends React.Component {
    // constructor(props) {
    //     super(props);
    //     console.log("Constructed post item", post);
    // }

    render() {
        console.log("Rendered post item", this.props);
        return (<div id={this.props.id}>
            <img src={this.props.thumbnail}></img>
            <p>
                <h3>{this.props.title}</h3>
                <p>by /u/{this.props.author}</p>
            </p>
        </div>);
    }
}

class PostList extends React.Component {
    // constructor(props) {
    //     super(props);
    //     console.log("Constructing Post List", props);
    // }

    render() {
        console.log("Rendered post list", this.props);
        var list = this.props.list.map(post => {
            return (<li>
                <PostListItem id={post.id} thumbnail={post.thumbnail} title={post.title} author={post.author}></PostListItem>
            </li>)
        });

        return (<ul>
            {list}
        </ul>);
    }
}

module.exports = class Reddit extends React.Component {
    constructor(props) {
        super(props);
        console.log("Constructed reddit", props);

        this.state = {
            list: []
        };

        redditAuth(props).then(snoowrap => {
            snoowrap.getHot().then(posts => {
                console.log("Downloaded hot", posts.map(x => x.title));
                this.setState({'list': posts}, () => {
                    console.log("Reddit state altered");
                    this.forceUpdate();
                });
            });
        });
    }

    render() {
        console.log("Rendered reddit", this.state);
        return (<div>
            <h1>Reddit</h1>
            <PostList list={this.state.list}/>
        </div>);
    }
};
