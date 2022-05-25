import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleProps } from '@app/state-example';
import { parseQueryParams, ParserMap } from '@app/util-query-params';

@Component({
  selector: 'app-example',
  template: ` <p>example works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  constructor(private readonly route: ActivatedRoute) {
    const parsers: ParserMap<ExampleProps> = {
      test: (value) => (typeof value === 'string' ? value : null),
      count: (value) =>
        typeof value === 'number'
          ? value
          : typeof value === 'string'
          ? isNaN(parseFloat(value))
            ? null
            : parseFloat(value)
          : null,
      enabled: (value) =>
        typeof value === 'boolean'
          ? value
          : typeof value === 'string'
          ? JSON.parse(value)
          : null,
      filters: {
        from: (value) => (typeof value === 'string' ? value : null),
      },
    };
    const parsedParams = parseQueryParams(
      this.route.snapshot.queryParams,
      parsers,
    );

    console.log('parsedParams:', JSON.stringify(parsedParams, null, 2));
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ExampleComponent],
  exports: [ExampleComponent],
})
export class ExampleComponentModule {}
