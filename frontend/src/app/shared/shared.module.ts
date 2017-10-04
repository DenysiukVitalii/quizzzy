import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MdToolbarModule,
         MdCardModule,
         MatListModule,
         MatRadioModule,
         MatCheckboxModule,
         MatButtonModule
        } from '@angular/material';

@NgModule({
  imports: [
    MdToolbarModule,
    MdCardModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  declarations: [],
  exports: [
    MdToolbarModule,
    MdCardModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class SharedModule { }
