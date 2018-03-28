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
    constructor(props){
        super(props);

        this.state = {
            'snoowrap': props.snoowrap
        };
    }


    upvote(post) {
        post.upvote().then(() => console.log(`Upvoted ${post.id}`));
    }

    downvote(post) {
        post.downvote().then(() => console.log(`Upvoted ${post.id}`));
    }

    comments(post) {}

    share(post) {}

    save(post) {}

    hide(post) {}

    report(post) {}

    crosspost(post) {}

    render() {
        console.log("Rendered post item", this.props);
        const post = this.props.post;
        return (<div id={post.id} className="PostItem grid-container">
            <div className="grid-item thumbnail">
                <img src={post.thumbnail} alt={post.thumbnail}/>
            </div>
            <div className="grid-item title">
                <h2>{post.title}</h2>
                <p>by /u/{post.author}</p>
            </div>
            <div className="grid-item functions">
                <ul>
                    <PostFunction text="comments" onClick={this.comments(post)}/>
                    <PostFunction text="share" onClick={this.share(post)}/>
                    <PostFunction text="save" onClick={this.save(post)}/>
                    <PostFunction text="hide" onClick={this.hide(post)}/>
                    <PostFunction text="report" onClick={this.report(post)}/>
                    <PostFunction text="crosspost" onClick={this.crosspost(post)}/>
                </ul>
            </div>
            <div className="grid-item vote">
                <button className="upvote clean" onClick={this.upvote(post)}>
                    🡅
                </button>
                <div className="votes">
                    <p>{post.votes}</p>
                </div>
                <button className="downvote clean" onClick={this.downvote(post)}>
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
            list: []
        };

        redditAuth(props).then(snoowrap => {
            this.setState({
                'snoowrap': snoowrap
            });
            snoowrap.getHot().then(posts => {
                console.log("Downloaded hot", posts.map(x => x.title));
                this.setState({
                    'list': posts
                }, () => {
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
            <PostList list={this.state.list} snoowrap={this.state.snoowrap}/>
        </div>);
    }
};
