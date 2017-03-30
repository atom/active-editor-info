'use babel';

import ActiveEditorInfoView from './active-editor-info-view';
import {CompositeDisposable, Disposable} from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable(
      // Add an opener for our view.
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://active-editor-info') {
          return new ActiveEditorInfoView();
        }
      }),

      // Register command that toggles this view
      atom.commands.add('atom-workspace', {
        'active-editor-info:toggle': () => this.toggle()
      }),

      // Destroy any ActiveEditorInfoViews when the package is deactivated.
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof ActiveEditorInfoView) {
            item.destroy();
          }
        });
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    atom.workspace.toggle('atom://active-editor-info');
  },

  deserializeActiveEditorInfoView(serialized) {
    return new ActiveEditorInfoView();
  }

};
