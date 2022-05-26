import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleProps } from '@app/state-example';
import { merge, print } from '@app/util-fns';
import { numberParser } from '@app/util-parsers';
import { parseQueryParams } from '@app/util-query-params';

@Component({
  selector: 'app-example',
  template: ` <p>example works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  constructor(private readonly route: ActivatedRoute) {
    const parsedParams = parseQueryParams<ExampleProps>(
      this.route.snapshot.queryParams,
      {
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
      },
    );
    const parsedParamsWithDefaults = merge(parsedParams, {
      test: 'value',
      filters: { date: { to: '2' } },
    });

    console.log('parsedParams:', print(parsedParams));
    console.log('parsedParamsWithDefaults:', print(parsedParamsWithDefaults));
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ExampleComponent],
  exports: [ExampleComponent],
})
export class ExampleComponentModule {}
