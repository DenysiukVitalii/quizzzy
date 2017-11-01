import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from './../../../shared/shared.module';

import { TaskComponent } from './task.component';
import { TaskModalComponent } from './task-modal/task-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        TaskComponent,
        TaskModalComponent,
    ],
    entryComponents: [
        TaskModalComponent
    ],
})
export class TaskModule { }