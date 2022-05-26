import {
  DeepPartial,
  DeepRequired,
  SimpleObject,
  Subset,
} from '@app/util-types';
import { merge as _merge } from 'lodash-es';

export const mergeWithDefault = <
  T extends SimpleObject,
  D extends DeepPartial<T>,
>(
  defaultValue: Subset<T, D>,
  source: T,
): T & DeepRequired<D> => _merge({}, defaultValue as DeepRequired<D>, source);
