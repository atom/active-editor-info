'use babel';

var React = require('react');
var ReactDOM = require('react-dom');
var redditAuth = require('../utils/redditAuth');
var ControlArray = require('./ControlArray.jsx');
var VoteControls = require('./VoteControls.jsx');

class PostListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'snoowrap': props.snoowrap,
            'post': props.post
        };
    }

    upvote() {
        this.state.post.upvote().then(() => console.log(`Upvoted ${post.id}`));
    }

    downvote() {
        this.state.post.downvote().then(() => console.log(`Downvoted ${post.id}`));
    }

    render() {
        console.log("Rendered post item", this.props);
        const post = this.props.post;
        return (<div id={post.id} className="PostItem grid-container">
            <div className="grid-item thumbnail">
                <img src={post.thumbnail} alt={post.thumbnail}/>
            </div>
            <div className="grid-item title">
                <h2>{post.title}</h2>
                <p>by /u/{post.author.name}</p>
            </div>
            <div className="grid-item functions">
                <ControlArray post={post} />
            </div>
            <div className="grid-item vote">
                <VoteControls post={post} />
            </div>
        </div>);
    }
}

class PostList extends React.Component {

    render() {
        console.log("Rendered post list", this.props);
        var list = this.props.list.map(post => {
            return (<li>
                <PostListItem post={post} snoowrap={this.props.snoowrap}></PostListItem>
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
            list: [],
            'snoowrap': props.snoowrap
        };

        props.snoowrap.getHot().then(posts => {
            console.log("Example post", posts[0]);
            this.setState({
                'list': posts
            }, () => {
                console.log("Reddit hot state altered");
                this.forceUpdate();
            });
        });
    }

    render() {
        console.log("Rendered reddit", this.state);
        return (<div>
            <h1>Reddit - Hot</h1>
            <PostList list={this.state.list} snoowrap={this.state.snoowrap}/>
        </div>);
    }
};
