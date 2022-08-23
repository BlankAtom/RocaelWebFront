"use strict"

import { BrowserWindow, protocol } from "electron"

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
        

    })
}