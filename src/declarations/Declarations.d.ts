export type IpcChannel = 'media-received';

export interface IpcApi {
  send(channel: IpcChannel, ...data: any[]): void;
  on(
    channel: IpcChannel,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ): () => void;
  off(
    channel: IpcChannel,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ): () => void;
}

declare global {
  interface Window {
    ipcApi: IpcApi;
  }
}

// Augments the WebContents and IpcMain modules to ensure so that we get IntelliSense on the channel names
declare global {
  namespace Electron {
    interface WebContents extends NodeJS.EventEmitter {
      send(channel: IpcChannel, ...args: any[]): void;
    }
    interface IpcMain extends NodeJS.EventEmitter {
      on(
        channel: IpcChannel,
        listener: (event: Electron.IpcMainEvent, ...args: any[]) => void
      ): () => void;
    }
  }
}
