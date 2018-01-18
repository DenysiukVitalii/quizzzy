import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/index';
import { SignupComponent } from './signup/index';
import { TeacherComponent } from './teacher/index';
import { AuthGuard } from './_guards/index';
import { TestingComponent } from './test/testing/testing.component';
import { StatsComponent } from './test/stats/stats.component';

const appRoutes: Routes = [
    { path: '', component: TestComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },
    { path: 'teacher', component: TeacherComponent },
    { path: 'student', component: TestComponent },
    { path: 'testing/:id', component: TestingComponent },
    { path: 'stats', component: StatsComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

