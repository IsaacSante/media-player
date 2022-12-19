const { contextBridge, ipcRenderer } = require('electron');

const ipcApi = {
  send: (channel, ...args) => ipcRenderer.send(channel, args),
  on: (channel, listener) => {
    ipcRenderer.on(channel, listener);
    return () => {
      ipcRenderer.off(channel, listener);
    };
  },
  off: (channel, listener) => {
    ipcRenderer.off(channel, listener);
  },
};

contextBridge.exposeInMainWorld('ipcApi', ipcApi);
