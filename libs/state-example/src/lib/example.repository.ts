import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { booleanParser, numberParser } from '@app/util-parsers';
import { ParserMap } from '@app/util-query-params';
import { setFromQueryParams } from '@app/util-store';
import { DeepPartial } from '@app/util-types';
import { createStore, withProps } from '@ngneat/elf';

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
  readonly testQueryParams: any;

  private readonly store;

  private readonly parsers: ParserMap<ExampleProps>;
  private readonly defaultProps: DeepPartial<ExampleProps>;

  constructor() {
    this.store = this.createStore();

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
    this.parsers = {
      test: (value) => (typeof value === 'string' ? value : null),
      count: numberParser,
      enabled: booleanParser,
      filters: {
        date: {
          from: (value) => (typeof value === 'string' ? value : null),
        },
      },
    };
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
    this.store.update(
      setFromQueryParams(params, this.parsers, this.defaultProps),
      // setFiltersFromQueryParams(params, {date: {to: () => 2}}),
    );
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'example' },
      withProps<ExampleProps>({ test: 'initial', count: 0, enabled: true }),
    );

    return store;
  }
}
