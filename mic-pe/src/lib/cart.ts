import { Channel } from '@/data/channels';

export type CartState = {
  items: Set<string>;
  channels: Channel[];
  count: number;
};

export type CartActions = {
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
};
