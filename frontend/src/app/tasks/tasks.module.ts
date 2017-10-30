import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from '../shared/shared.module';
import { TaskRoutingModule } from "./task-routing.module";

import { BaseTasksComponent } from "./base-tasks/base-tasks.component";
import { TaskComponent } from './task/task.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { ThemesComponent } from './themes/themes.component';


@NgModule({
    imports: [
        CommonModule,
        TaskRoutingModule,
        SharedModule
    ],
    declarations: [
        BaseTasksComponent,
        TaskComponent,
        DisciplineComponent,
        ThemesComponent
    ]
})
export class TasksModule { }