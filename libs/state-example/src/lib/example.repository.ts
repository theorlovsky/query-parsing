import { Injectable } from '@angular/core';
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
  private readonly store;

  constructor() {
    this.store = this.createStore();
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'example' },
      withProps<ExampleProps>({ test: '', count: 1 }),
    );

    return store;
  }
}
