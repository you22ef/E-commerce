import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './shared/interceptors/header.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


function httpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch() , withInterceptors([headerInterceptor,errorInterceptor,loaderInterceptor])),provideRouter(routes,withViewTransitions(),withInMemoryScrolling({scrollPositionRestoration:"enabled"})) , provideClientHydration(),
   importProvidersFrom(RouterModule,BrowserAnimationsModule,NgxSpinnerModule,
    TranslateModule.forRoot({
      loader:
      {
        provide: TranslateLoader,
        useFactory:httpLoaderFactory,
        deps:[HttpClient]
      }
    })

    
    ),provideToastr({positionClass: 'toast-top-center'})]
};