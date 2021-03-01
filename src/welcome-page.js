/*
    首页的js
*/
const ipcRenderer = window.parent.ipcRenderer;

var add_new_download = document.getElementById("add-new-download")

if(add_new_download){
    add_new_download.addEventListener("click", ()=>{
        ipcRenderer.send("open-download-tab")
    })
}





