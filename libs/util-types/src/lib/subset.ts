import { DeepPartial } from './deep-partial';

export type Subset<Original, Extender extends DeepPartial<Original>> = {
  [P in keyof Extender]: P extends keyof Original ? Extender[P] : never;
};
