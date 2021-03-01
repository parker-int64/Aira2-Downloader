/*
    下载选项卡页面的JS
*/
'use strict'

const ipcRenderer = window.ipcRenderer
const shell = window.shell
const os = window.os
const remote = window.remote

var window_close = document.getElementById("window-close")
var new_bt_task = document.getElementById("new-bt")
var save_location = document.getElementById("select-save-dir")



if(window_close){
    window_close.addEventListener("click", ()=>{
        ipcRenderer.send("close-download-tab")
    })
} else {
    console.log("Error: Unable to find the element")
}


if(new_bt_task){
    new_bt_task.addEventListener("click", ()=>{
        var bt_file = openBtFile()
        /* TODO 使用 Aira2开始BT任务  */
    })
} else {
    console.log("Error: Unable to find the element")
}


if(save_location){
    save_location.addEventListener("click", ()=>{
        var save_path = selectSaveLocation()
        var on_screen = document.getElementById("save-location-path")
        on_screen.innerHTML = save_path
        on_screen.onmouseover = function (){
            on_screen.setAttribute("title",save_path)
        }
        /* TODO 写入settings.conf */
    })
} else {
    console.log("Error: Unable to find the element")
}


function openBtFile(){ 
    const bt_file_path = remote.dialog.showOpenDialogSync({
        title:"选择BT种子",
        filters:[
            { name: 'BT种子文件', extensions: ['torrent'] },
            { name: '所有文件', extensions: ['*'] },
        ],
        defaultPath: os.homedir(),
        properties:['openFile'],
        buttonLabel: '选择'
    })
    return bt_file_path[0]
}



function selectSaveLocation(){
    const save_path = remote.dialog.showOpenDialogSync({
        title:"选择储存位置",
        filters:[
            {name:'所有文件',extensions:['*']},
        ],
        defaultPath:os.homedir(),
        properties:['openDirectory'],
        buttonLabel:'选择',
    })
    return save_path[0]
}