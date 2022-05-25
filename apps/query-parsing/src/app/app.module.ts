import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ExampleComponent } from '@app/feature-example';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: ExampleComponent,
        },
      ],
      { initialNavigation: 'enabledBlocking' },
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
