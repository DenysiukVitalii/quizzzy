import { Routes, RouterModule } from '@angular/router';

import { QuestionsBaseComponent } from './index';
import { StudentsBaseComponent } from './index';


const teacherRoutes: Routes = [
    { path: 'students', component: StudentsBaseComponent },
    { path: 'questions', component: QuestionsBaseComponent },
];

export const routing = RouterModule.forChild(teacherRoutes);
