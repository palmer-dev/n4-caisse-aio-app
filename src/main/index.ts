import { app, BrowserWindow, ipcMain, nativeImage, safeStorage, shell } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Store from 'electron-store'

const appIcon = nativeImage.createFromPath('../../resources/icon.png')

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    fullscreen: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    icon: appIcon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    void mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    void mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on('update-window-title', (_, title) => {
    mainWindow.title = title
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
const store = new Store()

// Vérification si `safeStorage` est disponible
const isSafeStorageAvailable = safeStorage.isEncryptionAvailable()

ipcMain.on('electron-store-get', (event, key) => {
  try {
    const encryptedValue = store.get(key)

    if (encryptedValue && isSafeStorageAvailable) {
      // Déchiffrement de la valeur si elle existe
      event.returnValue = safeStorage.decryptString(Buffer.from(encryptedValue as string))
    } else {
      event.returnValue = encryptedValue || undefined
    }
  } catch (error) {
    console.error('Error decrypting value:', error)
    event.returnValue = undefined
  }
})

ipcMain.on('electron-store-set', (_event, key, val) => {
  try {
    if (isSafeStorageAvailable) {
      // Chiffrement de la valeur avant de la stocker
      const encryptedValue = safeStorage.encryptString(val)
      store.set(key, encryptedValue)
    } else {
      store.set(key, val)
    }
  } catch (error) {
    console.error('Error encrypting and setting value:', error)
  }
})

ipcMain.on('electron-store-delete', (_event, key) => {
  try {
    store.delete(key)
  } catch (error) {
    console.error('Error deleting key:', error)
  }
})
