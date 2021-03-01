// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.ipcRenderer = require('electron').ipcRenderer;   // ipcRenderer渲染进程通信模块
window.shell = require('electron').shell                // shell模块允许您访问某些本地元素, 如文件管理器和默认 Web 浏览器.
window.remote = require('electron').remote              // remote模块允许渲染进程调用主进程方法对象等
window.os = require("os")                               // os模块
window.fs = require('fs')                               // fs模块


