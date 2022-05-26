import { Params } from '@angular/router';
import { Parser } from '@app/util-parsers';
import { DeepPartial, SimpleObject } from '@app/util-types';
import { ParserMap } from './types';

export function parseQueryParams<T extends SimpleObject>(
  params: Params,
  parsers: ParserMap<T>,
): DeepPartial<T> {
  try {
    return Object.entries(parsers).reduce<DeepPartial<T>>((parsed, entry) => {
      const key = entry[0] as keyof ParserMap<T>;
      const parser = entry[1] as
        | Parser<T[typeof key]>
        | ParserMap<T[typeof key]>;
      const param = params[key as string];
      const parsedValue =
        typeof parser === 'function'
          ? parser(param)
          : param
          ? parseQueryParams<T[typeof key]>(
              typeof param === 'string' ? JSON.parse(param) : param,
              parser,
            )
          : null;

      if (parsedValue !== null) {
        parsed[key] = parsedValue;
      }

      return parsed;
    }, {});
  } catch {
    return {};
  }
}
