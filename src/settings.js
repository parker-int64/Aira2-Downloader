// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const ipcRenderer = window.ipcRenderer
var returnButton = document.getElementById("return-button")
var darkEnable = document.getElementById("theme")
var parent = window.parent  // 父页面
var darkTheme = false


/*
    此处是iframe里面的元素，由于iframe是内嵌到主（父）页面里面
    所以可以使用windows.parent来读取主页面内容，而后使用DOM操作来查找主页面元素
    最后更改iframe的src属性
*/

if(returnButton){
    returnButton.addEventListener("click", ()=>{
        var iframe = parent.document.getElementById("inner-iframe")
        iframe.src = "welcome.html" /*此处切换src*/
    })
}


if(darkEnable){
    darkEnable.addEventListener("click",()=>{
        changeTheme()
        writeSettings()
    })
}


/*
    根据radio的值(true/false)来调整加载不同色调主题的CSS
*/
function changeTheme(){
    if(darkEnable.checked) {
        darkTheme = true
        /* 转换为暗色模式TBD */
        changeDarkTheme()
    }  else {
        darkTheme = false
         changeLightTheme()
    }
}

/*
    写入settings.conf,此处注意，子页面必须调用父页面的Preload.js
    才能正常使用nodejs的API，正确的写法是parent.window.api
*/ 
function writeSettings() {
    parent.window.writeFileSync("[basic settings]\n")
    parent.window.appendFileSync("dark-mode:"+darkTheme)
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

