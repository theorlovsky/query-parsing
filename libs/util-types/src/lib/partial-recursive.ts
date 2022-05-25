import { SimpleObject } from './simple-object';

export type PartialRecursive<T> = {
  [P in keyof T]?: T[P] extends SimpleObject ? PartialRecursive<T[P]> : T[P];
};
