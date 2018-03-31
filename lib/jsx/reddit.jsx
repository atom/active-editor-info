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
        this.state.post.downvote().then(() => console.log(`Upvoted ${post.id}`));
    }

    comments() {}

    share() {}

    save() {}

    hide() {}

    report() {}

    crosspost() {}

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
                <ul>
                    <PostFunction text={`${post.num_comments} comments`} onClick={this.comments}/>
                    <PostFunction text="share" onClick={this.share}/>
                    <PostFunction text="save" onClick={this.save}/>
                    <PostFunction text="hide" onClick={this.hide}/>
                    <PostFunction text="report" onClick={this.report}/>
                    <PostFunction text="crosspost" onClick={this.crosspost}/>
                </ul>
            </div>
            <div className="grid-item vote">
                <button className="upvote clean" onClick={this.upvote}>
                    🡅
                </button>
                <div className="votes">
                    <p>{post.score}</p>
                </div>
                <button className="downvote clean" onClick={this.downvote}>
                    🡇
                </button>
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
