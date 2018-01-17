import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from './../../../shared/shared.module';

import { TaskComponent } from './task.component';
import { TaskModalComponent } from './task-modal/task-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule, 
        ReactiveFormsModule 
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