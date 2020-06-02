import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule } from '@covalent/core/steps';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTreeModule } from '@angular/material/tree';
import { CovalentSearchModule } from '@covalent/core/search';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TimeagoModule, TimeagoIntl, TimeagoPipe } from 'ngx-timeago';
// MDB Angular Free
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {  MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TranslocoRootModule } from '../transloco-root.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    BrowserAnimationsModule,
    MatCarouselModule.forRoot(),
    MatIconModule,
    MatListModule,
    MatMenuModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    CovalentSearchModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    CovalentNotificationsModule,
    OverlayModule,
    MatTreeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    TimeagoModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    MatSelectModule,
    NgxMatSelectSearchModule,
    TranslocoRootModule
  ],
  exports: [
    BrowserModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    MatCarouselModule,
    CovalentHttpModule,
    TimeagoModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    CovalentSearchModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    CovalentNotificationsModule,
    OverlayModule,
    MatTreeModule,
    MatDialogModule,
    MatSnackBarModule,
    MDBBootstrapModule,
    MatSelectModule,
    MatSlideToggleModule,
    NgxMatSelectSearchModule,
    TranslocoRootModule
  ],
  providers: [DatePipe, TimeagoIntl, TimeagoPipe],
  bootstrap: [],
})
export class CoreModule {}
