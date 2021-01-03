/*
    控制应用生命周期和创建原生平台窗口的模组从此引入
*/ 
const {app, BrowserWindow, ipcMain, remote,BrowserView} = require('electron')
const path = require('path')
require('events').EventEmitter.defaultMaxListeners = 0 

/*
    最大监听数目改为0，不会出现
    "MaxListenersExceededWarning: 
    Possible EventEmitter memory leak detected."的错误
*/ 



/*
    当APP准备就绪后，创建窗口
*/
app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        width:880,
        height:650,
        minHeight:600,
        minWidth: 800,
        frame: false,    // 用于创建无边窗口
        backgroundColor: '#26282C',
        icon: path.join(__dirname, "../assets/windows-icon32.ico"),
        webPreferences: {  
            preload: path.join(__dirname, 'preload.js'),
            
    }
  })

    // 加载HTML文件
    mainWindow.loadFile("./html/index.html")
  
    // 打开开发人员工具
    mainWindow.webContents.openDevTools()

    // 监听到从renderer线程传来的最小化信号，执行窗口最小化
    ipcMain.on("window-minimize",  ()=>{
        mainWindow.minimize();
    });

    // 窗口触发最大化这个事件，图标变为交叠样式
    mainWindow.on('maximize', ()=>{
        mainWindow.webContents.send("change-icon")
    });

    // 窗口触发向下还原原来大小这个事件，图案变为框
    mainWindow.on('unmaximize', ()=>{
        mainWindow.webContents.send("restore-icon")
    });
    
    // 最大化窗口
    ipcMain.on("window-maxmize", ()=>{
        if (mainWindow.isMaximized()) {
            // 若已经是最大化了，则还原
            mainWindow.unmaximize()
        } else {
            // 最大化窗口
            mainWindow.maximize()
        }
    });

    // 关闭窗口
    ipcMain.on("window-close", ()=>{
        mainWindow.close();
    });


})


// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
