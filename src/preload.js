// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.ipcRenderer = require('electron').ipcRenderer;
window.remote = require('electron').remote