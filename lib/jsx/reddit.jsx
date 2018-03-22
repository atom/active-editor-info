'use babel';

var React = require('react');
var ReactDOM = require('react-dom');
const snoowrap = require('snoowrap');

class PostList extends React.Component {
    constructor(props){
        super(props);

        if(!props.hasOwnProperty('list')){
            props = {'list': []};
        }

        this.state.list = props.list.map(post => {
            return (<li>
                <PostListItem post={post}></PostListItem>
            </li>)
        });
    }

    render() {
        <ul>
            {this.state.list}
        </ul>
    }
}

module.exports = class Reddit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            original: props
        };

        redditAuth(props).then(snoowrap => {
            snoowrap.getHot().then(posts => {
                this.setState({
                    'list': posts
                });
            });
        });
    }

    render() {
        return (
            <div>
                <h1>Reddit</h1>
                <PostList list={this.state.list}></PostList>
            </div>
        );
    }
};
