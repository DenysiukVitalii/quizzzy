import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatToolbarModule,
         MatCardModule,
         MatListModule,
         MatRadioModule,
         MatCheckboxModule,
         MatButtonModule,
         MatTableModule,
         MatInputModule
        } from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
