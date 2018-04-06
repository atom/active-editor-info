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

    render() {
        return (
            <div>
                <button className="upvote clean" onClick={this.upvote}>
                    🡅
                </button>
                <div className="votes">
                    <p>{this.state.post.score}</p>
                </div>
                <button className="downvote clean" onClick={this.downvote}>
                    🡇
                </button>
            </div>
        )
    }
}
