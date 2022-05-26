import { Parser } from './types';

export const numberParser: Parser<number> = (value) => {
  let parsedValue = NaN;

  if (typeof value === 'string') {
    parsedValue = parseFloat(value);
  } else if (typeof value === 'number') {
    parsedValue = value;
  }

  return !isNaN(parsedValue) ? parsedValue : null;
};
