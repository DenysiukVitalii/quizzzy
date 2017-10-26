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
         MatInputModule,
         MatDialogModule
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
    BrowserAnimationsModule,
    MatDialogModule,
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
    BrowserAnimationsModule,
    MatDialogModule,
  ]
})
export class SharedModule { }
