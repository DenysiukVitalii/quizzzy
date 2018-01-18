import { Routes, RouterModule } from '@angular/router';
// import { BaseTasksComponent } from './tasks/base-tasks/base-tasks.component';
import { StudentsBaseComponent } from './index';
import { TeacherComponent } from './index';
import { TestsBaseComponent } from './index';
import { TasksBaseComponent } from "./tasks-base/tasks-base.component";
import { TestsBaseDetailsComponent } from './tests-base/tests-base-details/tests-base-details.component';


const teacherRoutes: Routes = [
    {
        path: 'teacher', component: TeacherComponent,
        children: [
            { path: '', redirectTo: 'tests', pathMatch: 'full' },
            { path: 'tests', component: TestsBaseComponent }
        ],
    },
    // { path: 'teacher/students', component: StudentsBaseComponent },
    { path: "teacher/tasks", component: TasksBaseComponent },
    { path: "teacher/test/:id", component: TestsBaseDetailsComponent }
];

export const routing = RouterModule.forChild(teacherRoutes);
