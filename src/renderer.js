// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const ipcRenderer = window.ipcRenderer;
const fs = window.fs
const filePath = "./config/settings.json"

// 查找最大化、最小化、关闭按钮的ID
var window_minimize = document.getElementById("min")
var window_maxmize = document.getElementById("max")
var window_close = document.getElementById("close")


// 查找设置的ID
var app_settings = document.getElementById("app-settings")
var iframe = document.getElementById("inner-iframe")


// 页面加载完成，根据选择的主题进行加载CSS
window.onload = loadTheme()

// 成功找到则增加监听事件，click为按下，若监听到按下则渲染进程发送最小化信号
if (window_minimize) {
    window_minimize.addEventListener("click", () => {
        ipcRenderer.send("window-minimize")
    })
} else {
    console.log("Failed to find element...")
}

// 同理渲染进程发送最大化信号
if (window_maxmize) {
    window_maxmize.addEventListener("click", () => {
        ipcRenderer.send("window-maxmize")
    })
} else {
    console.log("Failed to find element...")
}

ipcRenderer.on("change-icon", function (){
    // 由最大化的图标更改为向下还原的图标
    window_maxmize.className = "windowControlContainer windowMaximumRestore"
})
ipcRenderer.on("restore-icon", function(){
    // 由向下还原图标变为最大化图标
    window_maxmize.className = "windowControlContainer windowMaximumControl"
})

// 发送关闭信号
if (window_close) {
    window_close.addEventListener("click", () => {
        ipcRenderer.send("window-close")
    })
} else {
    console.log("Failed to find element...")
}


/* 使用iframe加载设置页面 */
if (app_settings){
    var toggled = false
    app_settings.addEventListener("click", () =>{
        toggled = !toggled
        if(toggled){iframe.src = "settings-index.html"}
        else {iframe.src = "welcome.html" }                
    })
} else {
    console.log("Failed to find element...")
}


/*
    根据用户设置的主题加载对应的CSS
*/
function loadTheme(){
    var raw_data =  fs.readFileSync(filePath)
    var data = JSON.parse(raw_data)
    var dark_mode =  data["dark-mode"]
    if(dark_mode == true){
        document.getElementById("main-style").href = "../css/style.css"
        document.getElementById("components-style").href = "../css/components.css"   
    } else {
        document.getElementById("main-style").href = "../css/styleLight.css"
        document.getElementById("components-style").href = "../css/componentsLight.css" 
    }
}








