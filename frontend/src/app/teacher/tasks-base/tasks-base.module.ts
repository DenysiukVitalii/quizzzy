import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from './../../shared/shared.module';
import { TasksBaseRoutingModule } from "./tasks-base-routing.module";

import { TasksBaseComponent } from "./tasks-base.component";
import { TaskComponent } from './task/task.component';
import { ThemesComponent } from './themes/themes.component';

import { DisciplineModule } from './discipline/discipline.module';


@NgModule({
    imports: [
        CommonModule,
        TasksBaseRoutingModule,
        SharedModule,
        DisciplineModule
    ],
    declarations: [
        TasksBaseComponent,
        TaskComponent,
        ThemesComponent,
    ]
})
export class TasksBaseModule { }