import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from './../../../shared/shared.module';

import { DisciplineComponent } from './discipline.component';

import { DisciplineModalComponent } from './../discipline-modal/discipline-modal.component';




@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        DisciplineComponent,
        DisciplineModalComponent
    ],
    entryComponents: [
        DisciplineModalComponent
      ],
})
export class DisciplineModule { }