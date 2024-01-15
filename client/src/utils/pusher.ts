import { pusher } from "../constants";

export const subscribeChannel = (channel: string) => {
  return pusher.subscribe(channel);
};
