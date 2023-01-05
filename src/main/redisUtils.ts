// import { createClient } from 'redis';
// import { sendToRenderer } from '../renderer/util/ipcUtils';
// import { BrowserWindow } from 'electron';

// const redisClient = createClient();
// const redisChannel = 'media';

// export async function conntectPublisher() {
//   await redisClient.connect();
// }

// export async function publishToRedis(selectedMedia: any) {
//   await redisClient.publish(redisChannel, JSON.stringify(selectedMedia));
// }

// export async function subscribeToRedis(electronWindow: BrowserWindow) {
//   const subscriber = redisClient.duplicate();
//   await subscriber.connect();

//   await subscriber.subscribe(redisChannel, (message) => {
//     if (electronWindow) {
//       sendToRenderer(electronWindow.webContents, 'media-received', message);
//     }
//   });
// }
