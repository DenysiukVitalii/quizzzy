import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test/index';
import { LoginComponent } from './login/index';
import { SignupComponent } from './signup/index';
import { TeacherComponent } from './teacher/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: TestComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },
    { path: 'teacher', component: TeacherComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

