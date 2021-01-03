// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const ipcRenderer = window.ipcRenderer;

// 查找最大化、最小化、关闭按钮的ID
var windowMinimize = document.getElementById("min")
var windowMaxmize = document.getElementById("max")
var windowClose = document.getElementById("close")


// 查找设置的ID
var appSettings = document.getElementById("app-settings")
var iframeSrc = document.getElementById("inner-iframe")


// 成功找到则增加监听事件，click为按下，若监听到按下则渲染进程发送最小化信号
if (windowMinimize) {
    windowMinimize.addEventListener("click", () => {
        ipcRenderer.send("window-minimize")
    })
} else {
    console.log("Failed to find element...")
}

// 同理渲染进程发送最大化信号
if (windowMaxmize) {
    windowMaxmize.addEventListener("click", () => {
        ipcRenderer.send("window-maxmize")
    })
} else {
    console.log("Failed to find element...")
}

ipcRenderer.on("change-icon", function (){
    // 由最大化的图标更改为向下还原的图标
    windowMaxmize.className = "windowControlContainer windowMaximumRestore"
})
ipcRenderer.on("restore-icon", function(){
    // 由向下还原图标变为最大化图标
    windowMaxmize.className = "windowControlContainer windowMaximumControl"
})

// 发送关闭信号
if (windowClose) {
    windowClose.addEventListener("click", () => {
        ipcRenderer.send("window-close")
    })
} else {
    console.log("Failed to find element...")
}


/* 使用iframe加载设置页面 */
if (appSettings){
    var toggled = false
    appSettings.addEventListener("click", () =>{
        toggled = !toggled
        if(toggled){iframeSrc.src = "settings-index.html"}
        else {iframeSrc.src = "welcome.html" }                
    })
    
} else {
    console.log("Failed to find element...")
}


/*
    根据用户设置的主题加载对应的CSS
*/

function loadTheme(){

}






