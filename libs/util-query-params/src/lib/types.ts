import { SimpleObject } from '@app/util-types';

export type Parser<T> = (value: unknown) => T | null;

export type ParserMap<T extends SimpleObject> = {
  [P in keyof T]?: NonNullable<T[P]> extends SimpleObject
    ? ParserMap<T[P]>
    : Parser<T[P]>;
};
