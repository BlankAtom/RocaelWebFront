"use strict"

import { app, BrowserWindow, ipcMain, protocol } from "electron"
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== "production"

const isWin = process.platform === 'win32'

const isMac = process.platform === 'darwin'

protocol.registerSchemesAsPrivileged([
    {
        scheme: 'app',
        privileges: {
            secure: true,
            standard: true
        }
    }
])


async function createWindow() {
    // Create browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !!process.env.ELECTRON_NODE_INTEGRATION,
            enableRemoteModule: true,
            webSecurity: false,
        }

    })

    

    if(process.env.WEBPACK_DEV_SERVER_URL){
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if(!process.env.IS_TEST)
            win.webContents.openDevTools()
    } else {
        createProtocol('app')
        win.loadURL('app://./index.html')
    }
}

app.on('window-all-closed', () => {
    if(!isMac)
        app.quit()
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0)
        createWindow()
})

app.on('ready', async() => {
    createWindow()
})

if(isDevelopment) {
    if(isWin) {
        process.on('message', data => {
            if(data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', ()=>{
            app.quit()
        })
    }
}