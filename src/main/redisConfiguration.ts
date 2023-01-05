/**
 * Configuration for the redis communications.
 * Add channels and handlers to this section.
 */

import { EventListenerMap } from 'rr-comm-bus-js/src/declarations';
import { Communicator } from 'rr-comm-bus-js';
import { BrowserWindow } from 'electron';

export default function configureRedisConnection(window: BrowserWindow) {
  const onConnect = () => {
    console.log('App is connected to Redis');
  };

  const onReconnecting = () => {
    console.log('App is reconnecting...');
  };

  const onError = () => {
    console.log('error');
  };

  const eventHandlerMap: EventListenerMap = {
    connect: onConnect,
    reconnecting: onReconnecting,
    error: onError,
  };

  const communicator = new Communicator(eventHandlerMap);

  return communicator;
}
