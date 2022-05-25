import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { deepFreeze, elfHooks, enableElfProdMode } from '@ngneat/elf';
import { devTools } from '@ngneat/elf-devtools';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  enableElfProdMode();
} else {
  devTools();
  elfHooks.registerPreStoreUpdate((_currentState, nextState) => {
    return deepFreeze(nextState);
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
