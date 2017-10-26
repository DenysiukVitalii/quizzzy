import { Routes, RouterModule } from '@angular/router';

import { QuestionsBaseComponent } from './index';
import { StudentsBaseComponent } from './index';
import { TeacherComponent } from './index';
import { TestsBaseComponent } from './index';


const teacherRoutes: Routes = [
    { path: 'teacher', component: TeacherComponent, children: [
        { path: '', redirectTo: 'tests', pathMatch: 'full' },
        { path: 'tests', component: TestsBaseComponent },
        { path: 'students', component: StudentsBaseComponent },
        { path: 'questions', component: QuestionsBaseComponent },
    ], },
    // { path: 'students', component: StudentsBaseComponent },
    // { path: 'questions', component: QuestionsBaseComponent },
];

export const routing = RouterModule.forChild(teacherRoutes);
