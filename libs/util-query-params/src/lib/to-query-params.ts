import { Stringifiable, StringifierMap } from './types';

export const toQueryParams = <T extends Stringifiable<T>>(
  value: T,
  stringifiers?: StringifierMap<T>,
): Record<string, string> => {
  return Object.entries(value).reduce<Record<string, string>>(
    (params, entry) => {
      const key = entry[0] as string & keyof T;
      const value = entry[1] as T[typeof key];

      if (typeof value !== 'undefined') {
        params[key] = stringifiers?.[key]
          ? stringifiers[key](value)
          : value.toString();
      }

      return params;
    },
    {},
  );
};
