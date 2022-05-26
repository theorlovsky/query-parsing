import { Parser } from './types';

export const numberParser: Parser<number> = (value) => {
  let parsedValue = NaN;

  if (typeof value === 'number') {
    parsedValue = value;
  } else if (typeof value === 'string') {
    parsedValue = parseFloat(value);
  }

  return !isNaN(parsedValue) ? parsedValue : null;
};
