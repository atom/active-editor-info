'use babel';

var React = require('react');
var ReactDOM = require('react-dom');

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

    comments() {}

    share() {}

    save() {}

    hide() {}

    report() {}

    crosspost() {}

    render() {
        const post = this.props.post;
        return (<ul>
            <PostFunction text={`${post.num_comments} comments`} onClick={this.comments}/>
            <PostFunction text="share" onClick={this.share}/>
            <PostFunction text="save" onClick={this.save}/>
            <PostFunction text="hide" onClick={this.hide}/>
            <PostFunction text="report" onClick={this.report}/>
            <PostFunction text="crosspost" onClick={this.crosspost}/>
        </ul>);
    }
}
