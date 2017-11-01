import { Routes, RouterModule } from '@angular/router';
// import { BaseTasksComponent } from './tasks/base-tasks/base-tasks.component';
import { StudentsBaseComponent } from './index';
import { TeacherComponent } from './index';
import { TestsBaseComponent } from './index';
import { TasksBaseComponent } from "./tasks-base/tasks-base.component";


const teacherRoutes: Routes = [
    {
        path: 'teacher', component: TeacherComponent,
        children: [
            { path: '', redirectTo: 'tests', pathMatch: 'full' },
            { path: 'tests', component: TestsBaseComponent }
        ],
    },
    { path: 'teacher/students', component: StudentsBaseComponent },
    { path: "teacher/tasks", component: TasksBaseComponent }
];

export const routing = RouterModule.forChild(teacherRoutes);