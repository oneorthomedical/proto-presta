import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler, Injectable} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as Sentry from '@sentry/browser';
import {ToIdCasePipe} from './shared/pipe/to-id-case.pipe';
import {ComputeIdCasePipe} from './shared/pipe/compute-id-case.pipe';
import {ToSideFromCompartPipe} from './shared/pipe/to-side-from-compart.pipe';
import {ToCenterDistancePipe} from './shared/pipe/to-center-distance.pipe';
import {DisplayScreenModule} from '@app/ui/display-screen/display-screen.module';
import { AppRoutingModule } from './app-routing.module';
import {ToolbarModule} from '@app/ui/toolbar/toolbar.module';

Sentry.init({
  dsn: 'https://207ac0ac53bd11eabf014201c0a8d02b@sentry.io/5184972'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
  }

  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({eventId});
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ToIdCasePipe,
    ComputeIdCasePipe,
    ToSideFromCompartPipe,
    ToCenterDistancePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DisplayScreenModule,
    AppRoutingModule,
    ToolbarModule
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
