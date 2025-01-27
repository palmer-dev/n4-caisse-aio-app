import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  store: {
    get(key: string): void {
      return ipcRenderer.sendSync('electron-store-get', key)
    },
    set(property: string, val: string): void {
      ipcRenderer.send('electron-store-set', property, val)
    },
    delete(key: string): void {
      ipcRenderer.send('electron-store-delete', key)
    }
    // Other method you want to add like has(), reset(), etc.
  },
  display: {
    updateTitle(title: string): void {
      ipcRenderer.send('update-window-title', title)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
