import { Parser } from '@app/util-parsers';
import { SimpleObject } from '@app/util-types';

export type ParserMap<T> = {
  [P in keyof T]?: NonNullable<T[P]> extends SimpleObject
    ? ParserMap<T[P]>
    : Parser<T[P]>;
};
