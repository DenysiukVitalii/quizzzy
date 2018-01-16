import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from './../../../shared/shared.module';

import { TaskComponent } from './task.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskEditModalComponent } from './task-edit-modal/task-edit-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        TaskComponent,
        TaskModalComponent,
        TaskEditModalComponent,
    ],
    entryComponents: [
        TaskModalComponent
    ],
})
export class TaskModule { }