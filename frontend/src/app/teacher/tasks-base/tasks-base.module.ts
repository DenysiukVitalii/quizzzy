import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from './../../shared/shared.module';
import { TasksBaseRoutingModule } from "./tasks-base-routing.module";

import { TasksBaseComponent } from "./tasks-base.component";

import { DisciplineModule } from './discipline/discipline.module';
import { TaskModule } from './task/task.module';
import { ThemesModule } from './themes/themes.module';


@NgModule({
    imports: [
        CommonModule,
        TasksBaseRoutingModule,
        SharedModule,
        DisciplineModule,
        TaskModule,
        ThemesModule
    ],
    declarations: [
        TasksBaseComponent
    ]
})
export class TasksBaseModule { }