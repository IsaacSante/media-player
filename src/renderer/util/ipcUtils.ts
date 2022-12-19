import { IpcRenderer } from 'electron';
import { IpcChannel } from '../../declarations/Declarations';
import { BrowserWindow } from 'electron';

export const sendToRenderer = (
  sender: Electron.WebContents,
  channel: IpcChannel,
  ...args: any[]
): void => {
  console.log(args);
  sender.send(channel, args);
  console.log('message sent to renderer');
};

export const sendToMain = (
  sender: IpcRenderer,
  channel: IpcChannel,
  ...args: any[]
): void => {
  sender.send(channel, args);
  console.log('message sent to main');
};

export const safeSubscribeToChannel = (
  ipcRenderer: IpcRenderer,
  channel: IpcChannel,
  listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
): void => {
  ipcRenderer.on(channel, listener);
};
