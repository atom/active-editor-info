'use babel';

var React = require('react');
var ReactDOM = require('react-dom');
var clip = require('node-clipboard');

class PostFunction extends React.Component {
    render() {
        return (<li>
            <button className="function" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        </li>);
    }
}

module.exports = class ControlArray extends React.Component {

    _clear() {
        setTimeout(() => {
            atom.notifications.clear();
        }, 1000);
    }

    _funcThen(m) {
        atom.notifications.addSuccess(m, {dismissable: true});
        this._clear();
    }

    _funcCatch(e, m, r) {
        atom.notifications.addError(m, {
            dismissable: true,
            buttons: [
                {
                    text: 'Retry',
                    onDidClick: r
                }
            ]
        });
        this._clear();
    }

    comments() {}

    share() {
        clip("https://reddit.com" + this.props.post.permalink, function(err) {
            if (err) {
                atom.notifications.addError("Failed to copy permalink to clipboard", {
                    buttons: [
                        {
                            text: 'Retry',
                            onDidClick: this.share
                        }
                    ],
                    stack: err,
                    dismissable: true
                });
                return;
            }
            console.log('copied!');

            atom.notifications.addSuccess("Permalink copied to clipboard", {dismissable: true});
            this._clear();
        });
    }

    save() {
        const post = this.state.post;

        if (post.saved) {
            post.unsave().then(() => this._funcThen("Unsaved")).catch((e) => this._funcCatch(e, "Failed to unsave", this.save));
        }
        else {
            post.save().then(() => this._funcThen("Saved")).catch((e) => this._funcCatch(e, "Failed to save", this.save));
        }
    }

    hide() {
        const post = this.state.post;

        if (post.hidden) {
            post.unhide().then(() => this._funcThen("Post unhidden")).catch((e) => this._funcCatch(e, "Failed to unhide", this.hide));
        }
        else {
            post.hide().then(() => this._funcThen("Post hidden")).catch((e) => this._funcCatch(e, "Failed to hide", this.hide));
        }
    }

    report() {}

    crosspost() {}

    render() {
        const post = this.props.post;
        return (<ul>
            <PostFunction text={`${post.num_comments} comments`} onClick={this.comments}/>
            <PostFunction text="share" onClick={this.share}/>
            <PostFunction text={post.saved
                    ? 'unsave'
                    : 'save'} onClick={this.save}/>
            <PostFunction text={post.hidden
                    ? 'unhide'
                    : 'hide'} onClick={this.hide}/>
            <PostFunction text="report" onClick={this.report}/>
            <PostFunction text="crosspost" onClick={this.crosspost}/>
        </ul>);
    }
}
