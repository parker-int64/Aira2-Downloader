// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var returnButton = document.getElementById("return-button")

/*
    此处是iframe里面的元素，由于iframe是内嵌到主（父）页面里面
    所以可以使用windows.parent来读取主页面内容，而后使用DOM操作来查找主页面元素
    最后清除iframe
*/

if(returnButton){
    returnButton.addEventListener("click", ()=>{
        var parent = window.parent
        var clearID = parent.document.getElementById("contentMain")
        clearID.innerHTML = "" //清除innerHTML内容，渲染画面消失
    })
}




