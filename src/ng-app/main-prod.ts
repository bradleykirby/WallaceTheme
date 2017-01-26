import './vendor.ts';
import '../styles/app.scss';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { AppModule } from './app.module';



enableProdMode();

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule)
  .then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));