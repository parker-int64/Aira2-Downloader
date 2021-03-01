// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


// fs 和 filePath已经在HTML文件中定义
// const fs = window.parent.fs
// const filePath = "./config/settings.json"
const remote = window.parent.remote
const os = window.parent.os

var return_button = document.getElementById("return-button")
var dark_enable = document.getElementById("theme")           // radio的ID，dark_enable.checked = true表示radio勾选
var starting_up = document.getElementById("starting-up")    // 开机启动的radio
var parent = window.parent  // 父页面


var app_theme_dark = false
var app_start_up   = false

// 页面加载完毕，执行加载函数
window.onload = windowOnLoad()

var settingsValue = {
    "dark-mode": false,
}

/*
    此处是iframe里面的元素，由于iframe是内嵌到主（父）页面里面
    所以可以使用windows.parent来读取主页面内容，而后使用DOM操作来查找主页面元素
    最后更改iframe的src属性
*/

if(return_button){
    return_button.addEventListener("click", ()=>{
        var iframe = parent.document.getElementById("inner-iframe")
        iframe.src = "welcome.html" /*此处切换src*/
    })
}


if(dark_enable){
    dark_enable.addEventListener("click",()=>{
        changeTheme()
        writeSettings()
    })
}


if(starting_up){
    starting_up.addEventListener("click",()=>{
        writeStaringUpStatus()
    })
}


/*
    根据radio的值(true/false)来调整加载不同色调主题的CSS
*/
function changeTheme(){
    if(dark_enable.checked) {
        settingsValue["dark-mode"] = true
        /* 转换为暗色模式TBD */
        changeDarkTheme()
    }  else {
        settingsValue["dark-mode"] = false
        changeLightTheme()
    }
    
}

/*
    写入settings.conf,此处注意，子页面必须调用父页面的Preload.js
    才能正常使用nodejs的API，正确的写法是parent.window.api
*/ 
function writeSettings() {
    var data = JSON.stringify(settingsValue)
    fs.writeFileSync(filePath,data)
}

/*
   加载亮色主题的CSS
*/
function changeLightTheme(){
    document.getElementById("settings-style").href = "../css/settingsLight.css"
    document.getElementById("settings-components-style").href = "../css/componentsLight.css"
    parent.document.getElementById("main-style").href = "../css/styleLight.css"
    parent.document.getElementById("components-style").href = "../css/componentsLight.css"      
}

/*
    加载暗色主题的CSS
*/
function changeDarkTheme(){
    document.getElementById("settings-style").href = "../css/settings.css"
    document.getElementById("settings-components-style").href = "../css/components.css"
    parent.document.getElementById("main-style").href = "../css/style.css"
    parent.document.getElementById("components-style").href = "../css/components.css"   
}



/*
    根据用户设置的主题加载对应的CSS
*/
function loadTheme(){
    var raw_data =  fs.readFileSync(filePath)
    var data = JSON.parse(raw_data)
    var dark_mode =  data["dark-mode"]
    if(dark_mode) dark_enable.checked = true
    else dark_enable.checked = false
}

/*
    检查开机启动
*/
function writeStaringUpStatus(){
    if(starting_up.checked){}

}


/*
    所有需要在窗口加载完毕后执行的函数都放在此函数中
 */
function windowOnLoad(){
    loadTheme()
    aria2CoreSettings()
}




/*
    下载器核心设置
*/
function aria2CoreSettings(){
    var max_threads = document.getElementById("max-threads")
    var max_download_tasks = document.getElementById("max-download-tasks")
    var cut_lowest_link = document.getElementById("cut-lowest-link")
    var global_max_download_rate = document.getElementById("max-download-rate")
    var global_max_upload_rate = document.getElementById("max-upload-rate")
    var max_retry_times = document.getElementById("max-retry-times")
    
    /* 高级设置部分 */
    var file_spilt_size = document.getElementById("file-split-size")
    var split = document.getElementById("split")
    var disk_cache = document.getElementById("disk-cache")
    var bt_auto_start = document.getElementById("bt-auto-start")
    var bt_no_check = document.getElementById("bt-no-check")
    var bt_max_links = document.getElementById("bt-max-links")  
    
    
    /* 默认值的设置 */
      /* 基础部分 */
    max_threads.value = "5"
    max_download_tasks.value= "5"
    global_max_download_rate.value = "0"
    global_max_upload_rate.value = "0"
    max_retry_times.value = "3"
    cut_lowest_link.checked = true

     /* 高级部分 */
     file_spilt_size.value = "20"
     split.value = "128"
     disk_cache.value = "128"
     bt_auto_start.checked = false
     bt_no_check.checked = false
     bt_max_links.value = "55"



}

var save_location = document.getElementById("select-save-dir")

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