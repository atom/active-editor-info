'use babel';

import ActiveEditorInfoView from './active-editor-info-view';
import { CompositeDisposable } from 'atom';

export default {

  activeEditorInfoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.activeEditorInfoView = new ActiveEditorInfoView(state.activeEditorInfoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.activeEditorInfoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'active-editor-info:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.activeEditorInfoView.destroy();
  },

  serialize() {
    return {
      activeEditorInfoViewState: this.activeEditorInfoView.serialize()
    };
  },

  toggle() {
    console.log('ActiveEditorInfo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
