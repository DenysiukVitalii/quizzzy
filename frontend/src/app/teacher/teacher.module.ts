import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { routing } from './teacher.routes';

import { TeacherComponent } from './teacher.component';
import { QuestionsBaseComponent } from './questions-base/questions-base.component';
import { StudentsBaseComponent } from './students-base/students-base.component';


@NgModule({
    declarations: [
        TeacherComponent,
        QuestionsBaseComponent,
        StudentsBaseComponent,
    ],
    exports: [
        TeacherComponent,
    ],
    imports: [
        SharedModule,
        routing
    ],
    providers: []
})
export class TeacherModule { }
