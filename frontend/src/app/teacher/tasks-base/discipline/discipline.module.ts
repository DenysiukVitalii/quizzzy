import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'

import { SharedModule } from './../../../shared/shared.module';

import { DisciplineComponent } from './discipline.component';

import { DisciplineModalComponent } from './discipline-modal/discipline-modal.component';

import { TasksService } from './../../../_services/tasks.service';
import { DisciplineEditModalComponent } from './discipline-edit-modal/discipline-edit-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        DisciplineComponent,
        DisciplineModalComponent,
        DisciplineEditModalComponent
    ],
    entryComponents: [
        DisciplineModalComponent,
        DisciplineEditModalComponent
      ],
    providers: [
        TasksService
    ]
})
export class DisciplineModule { }