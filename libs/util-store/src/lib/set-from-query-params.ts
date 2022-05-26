import { Params } from '@angular/router';
import { mergeWithDefault, print } from '@app/util-fns';
import { fromQueryParams, ParserMap } from '@app/util-query-params';
import { DeepPartial, Subset } from '@app/util-types';
import { Reducer } from '@ngneat/elf';
import { merge } from 'lodash-es';

export const setFromQueryParams = <T, D extends DeepPartial<T>>(
  params: Params,
  parsers: ParserMap<T>,
  defaultProps?: Subset<T, D>,
): Reducer<T> => {
  return (state) => {
    const parsedParams = fromQueryParams<T>(params, parsers);
    const parsedParamsWithDefaults = defaultProps
      ? mergeWithDefault(defaultProps, parsedParams)
      : parsedParams;
    const newState = merge({}, state, parsedParamsWithDefaults);

    console.log('state:', print(state));
    console.log('parsedParams:', print(parsedParams));
    console.log('parsedParamsWithDefaults:', print(parsedParamsWithDefaults));
    console.log('newState:', print(newState));

    return newState;
  };
};
