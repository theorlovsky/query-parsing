import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { merge, print } from '@app/util-fns';
import { numberParser } from '@app/util-parsers';
import { fromQueryParams, ParserMap } from '@app/util-query-params';
import { DeepPartial } from '@app/util-types';
import { createStore, withProps } from '@ngneat/elf';
import { Observable } from 'rxjs';

/** play with it */
export interface ExampleProps {
  test: string;
  count: number;
  enabled?: boolean;
  filters?: {
    date?: {
      from: string;
      to: string;
    };
  };
}

@Injectable({ providedIn: 'root' })
export class ExampleRepository {
  readonly props$: Observable<ExampleProps>;
  readonly testQueryParams: any;

  private readonly store;

  private readonly parsers: ParserMap<ExampleProps>;
  private readonly defaultProps: DeepPartial<ExampleProps>;

  constructor() {
    this.store = this.createStore();
    this.props$ = this.store.asObservable();

    /** play with it */
    this.testQueryParams = {
      // missing 'test'
      count: 'test', // wrong type
      enabled: false, // differs from the default value
      filters: {
        date: {
          from: '1',
          // missing 'to'
        },
      },
    };
    /** play with it */
    this.parsers = {
      test: (value) => (typeof value === 'string' ? value : null),
      count: numberParser,
      enabled: (value) =>
        typeof value === 'boolean'
          ? value
          : typeof value === 'string'
          ? JSON.parse(value)
          : null,
      filters: {
        date: {
          from: (value) => (typeof value === 'string' ? value : null),
        },
      },
    };
    /** play with it */
    this.defaultProps = {
      test: 'value',
      filters: {
        date: {
          to: '2',
        },
      },
    };
  }

  setFromQueryParams(params: Params): void {
    const parsedParams = fromQueryParams<ExampleProps>(params, this.parsers);
    const parsedParamsWithDefaults = merge(parsedParams, this.defaultProps);

    console.log('parsedParams:', print(parsedParams));
    console.log('parsedParamsWithDefaults:', print(parsedParamsWithDefaults));

    this.store.update(() => parsedParamsWithDefaults);
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'example' },
      /** play with it */
      withProps<ExampleProps>({ test: 'initial', count: 0, enabled: true }),
    );

    return store;
  }
}
