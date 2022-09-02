// Modules to control application life and create native browser window
import MenuBuilder from './menu'
import  {resolveHtmlPath}   from './util'
import startServer from '../server'
// import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import registerTasks from './tasks'
import robot from '@jitsi/robotjs'
const {app, BrowserWindow} = require('electron')
const path = require('path')
// const isDevelopment = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
// const isDevelopment = true;
// if (isDevelopment) {
//   require('electron-debug')()
// }
const createWindow =  async () => {
  // if (isDevelopment) {
  //   await installExtension(REACT_DEVELOPER_TOOLS)
  // }
  const mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL(resolveHtmlPath('index.html'))
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
    }
  })
  // mainWindow.on('closed', () => {
  //   mainWindow = null
  // })
  // const menuBuilder = new MenuBuilder(mainWindow)
  // menuBuilder.buildMenu()

  // Open urls in the user's browser
  // mainWindow.webContents.on('new-window', (event, url) => {
  //   event.preventDefault()
  //   shell.openExternal(url)
  // })
}

// 服务端端口号
const port = 3010

function init() {
  createWindow()
  // 启动服务端服务
  startServer(port)
  // 创建游戏实例
  // createGameInstances()
  // 启动ipc通信，注册各种任务
  registerTasks()
  // 注册全局快捷键
  // registerGlobalShortcut()
}

app.whenReady().then(() => {
  // createWindow()
  init()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

