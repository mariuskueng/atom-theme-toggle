'use babel';

import AtomThemeToggleView from './atom-theme-toggle-view';
import { CompositeDisposable } from 'atom';

let isDarkThemeActive = true;
const loadedThemeNames = atom.themes.getLoadedThemeNames();
const darkUiThemes = loadedThemeNames.filter(theme => theme.includes('ui'));
const lightUiThemes = loadedThemeNames.filter(theme => theme.includes('ui'));
const darkSyntaxThemes = loadedThemeNames.filter(theme => theme.includes('syntax'));
const lightSyntaxThemes = loadedThemeNames.filter(theme => theme.includes('syntax'));

export default {

  atomThemeToggleView: null,
  modalPanel: null,
  subscriptions: null,
  config: {
    darkUiTheme: {
      type: 'string',
      default: atom.config.get('atom-theme-toggle.darkUiTheme') || darkUiThemes[0],
      enum: darkUiThemes
    },
    lightUiTheme: {
      type: 'string',
      default: atom.config.get('atom-theme-toggle.lightUiTheme') || lightUiThemes[0],
      enum: lightUiThemes
    },
    darkSyntaxTheme: {
      type: 'string',
      default: atom.config.get('atom-theme-toggle.darkSyntaxTheme') || darkSyntaxThemes[0],
      enum: darkSyntaxThemes
    },
    lightSyntaxTheme: {
      type: 'string',
      default: atom.config.get('atom-theme-toggle.lightSyntaxTheme') || lightSyntaxThemes[0],
      enum: lightSyntaxThemes
    }
  },

  activate(state) {
    this.atomThemeToggleView = new AtomThemeToggleView(state.atomThemeToggleViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomThemeToggleView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-theme-toggle:toggle': () => this.toggle()
    }));

    const currentThemes = atom.config.get('core.themes');
    const darkUiTheme = atom.config.get('atom-theme-toggle.darkUiTheme');

    if (currentThemes.indexOf(darkUiTheme) > -1) {
      isDarkThemeActive = true;
    } else {
      isDarkThemeActive = false;
    }
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomThemeToggleView.destroy();
  },

  serialize() {
    return {
      atomThemeToggleViewState: this.atomThemeToggleView.serialize()
    };
  },

  setDark() {
    return [
      atom.config.get('atom-theme-toggle.darkUiTheme'),
      atom.config.get('atom-theme-toggle.darkSyntaxTheme')
    ];
  },

  setLight() {
    return [
      atom.config.get('atom-theme-toggle.lightUiTheme'),
      atom.config.get('atom-theme-toggle.lightSyntaxTheme')
    ];
  },

  toggle() {
    let theme;
    if (isDarkThemeActive) {
      theme = this.setLight();
    } else {
      theme = this.setDark();
    }

    atom.config.set('core.themes', theme);
    isDarkThemeActive = !isDarkThemeActive;
  }

};
