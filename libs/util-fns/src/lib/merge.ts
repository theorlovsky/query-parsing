import {
  DeepPartial,
  DeepRequired,
  SimpleObject,
  Subset,
} from '@app/util-types';
import { merge as _merge } from 'lodash-es';

export const merge = <T extends SimpleObject, D extends DeepPartial<T>>(
  source1: DeepPartial<T>,
  source2: Subset<T, D>,
): DeepPartial<T> & DeepRequired<D> =>
  _merge({}, source2 as DeepRequired<D>, source1);
