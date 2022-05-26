import { Parser } from '@app/util-parsers';
import { SimpleObject } from '@app/util-types';

export type ParserMap<T> = {
  [P in keyof T]?: NonNullable<T[P]> extends SimpleObject
    ? ParserMap<T[P]>
    : Parser<T[P]>;
};

export type Stringifiable<T> = {
  [K in keyof T]: { toString(): string } | undefined;
};

export type Stringifier<T> = (value: T) => string;

export type StringifierMap<T> = {
  [K in keyof Partial<T>]: Stringifier<T[K]>;
};
