import { Parser } from './types';

export const booleanParser: Parser<boolean> = (value) => {
  if (typeof value === 'string') {
    return booleanParser(JSON.parse(value));
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return null;
};
