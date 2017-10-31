import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'

import { SharedModule } from './../../../shared/shared.module';

import { DisciplineComponent } from './discipline.component';

import { DisciplineModalComponent } from './discipline-modal/discipline-modal.component';

import { TasksService } from './../../../_services/tasks.service';



@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        DisciplineComponent,
        DisciplineModalComponent
    ],
    entryComponents: [
        DisciplineModalComponent
      ],
    providers: [
        TasksService
    ]
})
export class DisciplineModule { }