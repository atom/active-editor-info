'use babel';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = class VoteControls extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: props.post
        };
    }

    _refresh() {
        this.state.post.fetch().then(p => {
            this.setState({'post': p});
        });
    }

    upvote() {
        this.state.post.upvote().then(() => {
            console.log("Upvote", this.state.post);
            this._refresh();
        });
    }

    downvote() {
        this.state.post.downvote().then(() => {
            console.log("Upvote", this.state.post);
            this._refresh();
        });
    }

    render() {
        return (
            <div>
                <button className={`upvote ${this.state.post.likes === true ? 'enabled' : 'clean'}`} onClick={this.upvote}>
                    🡅
                </button>
                <div className="votes">
                    <p>{this.state.post.score}</p>
                </div>
                <button className={`downvote ${this.state.post.likes === false ? 'enabled' : 'clean'}`} onClick={this.downvote}>
                    🡇
                </button>
            </div>
        )
    }
}
