'use babel';

var Reddit = require('./jsx/reddit.jsx');
var React = require('react');
var ReactDOM = require('react-dom');
var randomstring = require("randomstring");

export default class ActiveEditorInfoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('active-editor-info');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The ActiveEditorInfo package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);

    try{
        console.log(Reddit);
        ReactDOM.render(<Reddit clientId='g08v0eWWrg_-ng' scope={['identity', 'edit', 'flair', 'history', 'modconfig', 'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'read', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread']} redirectUri='http://localhost:65010/authorize_callback' permanent={true} state={randomstring.generate()}/>, this.element);
    }
    catch (e){
        console.error(e);
    }

    // this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
    //   if (!atom.workspace.isTextEditor(item)) return;
    //   message.innerHTML = `
    //     <h2>${item.getFileName() || 'untitled'}</h2>
    //     <ul>
    //       <li><b>Soft Wrap:</b> ${item.softWrapped}</li>
    //       <li><b>Tab Length:</b> ${item.getTabLength()}</li>
    //       <li><b>Encoding:</b> ${item.getEncoding()}</li>
    //       <li><b>Line Count:</b> ${item.getLineCount()}</li>
    //     </ul>
    //   `;
    // });
  }

  getTitle() {
    // Used by Atom for tab text
    return 'Active Editor Info';
  }

  getDefaultLocation() {
    // This location will be used if the user hasn't overridden it by dragging the item elsewhere.
    // Valid values are "left", "right", "bottom", and "center" (the default).
    return 'center';
  }

  getAllowedLocations() {
    // The locations into which the item can be moved.
    return ['left', 'right', 'center'];
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://active-editor-info'
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      deserializer: 'active-editor-info/ActiveEditorInfoView'
    };
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }

}
