import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { TasksBaseComponent } from "./tasks-base.component";
import { TaskComponent } from './task/task.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { ThemesComponent } from './themes/themes.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "teacher/tasks",
                component: TasksBaseComponent,
                children: [
                    { path: "task", component: TaskComponent },
                    { path: "themes", component: ThemesComponent },
                    { path: "discipline", component: DisciplineComponent },    
                    { path: "", redirectTo: "task", pathMatch: "full" }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class TasksBaseRoutingModule { }