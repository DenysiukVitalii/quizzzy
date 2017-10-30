import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { BaseTasksComponent } from "./base-tasks/base-tasks.component";
import { TaskComponent } from './task/task.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { ThemesComponent } from './themes/themes.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "tasks",
                component: BaseTasksComponent,
                children: [
                     {
                        path: "",
                        children: [
                            { path: "task", component: TaskComponent },
                            { path: "themes", component: ThemesComponent },
                            { path: "discipline", component: DisciplineComponent },    
                            { path: "", redirectTo: "task", pathMatch: "full" }
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class TaskRoutingModule { }