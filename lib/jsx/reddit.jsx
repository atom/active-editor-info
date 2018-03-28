'use babel';

var React = require('react');
var ReactDOM = require('react-dom');
var redditAuth = require('../utils/redditAuth');

class PostFunction extends React.Component {
    render() {
        return (<li>
            <button className="function" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        </li>);
    }
}

class PostListItem extends React.Component {
    upvote(id) {}

    downvote(id) {}

    comments(id) {}

    share(id) {}

    save(id) {}

    hide(id) {}

    report(id) {}

    crosspost(id) {}

    render() {
        console.log("Rendered post item", this.props);
        return (<div id={this.props.id} className="PostItem grid-container">
            <div className="grid-item thumbnail">
                <img src={this.props.thumbnail}/>
            </div>
            <div className="grid-item title">
                <h2>{this.props.title}</h2>
                <p>by /u/{this.props.author}</p>
            </div>
            <div className="grid-item functions">
                <ul>
                    <PostFunction text="comments" onClick={this.comments(this.props.id)}/>
                    <PostFunction text="share" onClick={this.share(this.props.id)}/>
                    <PostFunction text="save" onClick={this.save(this.props.id)}/>
                    <PostFunction text="hide" onClick={this.hide(this.props.id)}/>
                    <PostFunction text="report" onClick={this.report(this.props.id)}/>
                    <PostFunction text="crosspost" onClick={this.crosspost(this.props.id)}/>
                </ul>
            </div>
            <div className="grid-item vote">
                <button className="upvote clean" onClick={this.upvote(this.props.id)}>
                    🡅
                </button>
                <div className="votes">
                    <p>{this.props.votes}</p>
                </div>
                <button className="downvote clean" onClick={this.downvote(this.props.id)}>
                    🡇
                </button>
            </div>
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
