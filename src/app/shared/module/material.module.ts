import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSliderModule} from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatSliderModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule
  ],
  exports: [
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatSliderModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule
  ],
  providers: [
    {provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: {color: 'warn'}}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MaterialModule {
}
