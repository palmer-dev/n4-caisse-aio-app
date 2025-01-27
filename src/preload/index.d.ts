import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      store: {
        get: (key: string) => string
        set: (key: string, val: any) => void
        delete: (key: string) => void
      },
      display: {
        updateTitle: (title: string) => void
      }
    }
  }
}
