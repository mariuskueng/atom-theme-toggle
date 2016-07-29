'use babel';

export default class AtomThemeToggleView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-theme-toggle');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'Add 2 themes to your `config.cson`. See package README for more information.';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
