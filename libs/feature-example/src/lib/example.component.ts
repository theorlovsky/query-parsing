import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleRepository } from '@app/state-example';
import { toQueryParams } from '@app/util-query-params';

@Component({
  selector: 'app-example',
  template: `
    <div>
      <h3>Props:</h3>
      <pre>{{ props$ | async | json }}</pre>
    </div>
    <div>
      <button type="button" (click)="writeQueryParams()">
        Write query params
      </button>
      <button type="button" (click)="clearQueryParams()">
        Clear query params
      </button>
      <button type="button" (click)="reloadPage()">Reload page</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  readonly props$ = this.exampleRepository.props$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly exampleRepository: ExampleRepository,
    private readonly router: Router,
  ) {
    this.exampleRepository.setFromQueryParams(this.route.snapshot.queryParams);
  }

  async writeQueryParams(): Promise<void> {
    await this.router.navigate(['./'], {
      relativeTo: this.route,
      /** play with it */
      queryParams: toQueryParams(this.exampleRepository.testQueryParams, {
        filters: (filters) => JSON.stringify(filters),
      }),
    });
  }

  async clearQueryParams(): Promise<void> {
    await this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: {},
    });
  }

  reloadPage(): void {
    location.reload();
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ExampleComponent],
  exports: [ExampleComponent],
})
export class ExampleComponentModule {}
