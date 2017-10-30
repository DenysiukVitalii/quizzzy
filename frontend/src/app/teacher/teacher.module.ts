import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { routing } from './teacher.routes';
import { TasksBaseModule } from './tasks-base/tasks-base.module';

import { TeacherComponent } from './teacher.component';
import { StudentsBaseComponent } from './students-base/students-base.component';
import { CreateTestModalComponent } from './create-test-modal/create-test-modal.component';
import { TestsBaseComponent } from './tests-base/tests-base.component';


@NgModule({
    declarations: [
        TeacherComponent,
        StudentsBaseComponent,
        CreateTestModalComponent,
        TestsBaseComponent,
    ],
    exports: [
        TeacherComponent,
    ],
    entryComponents: [
        CreateTestModalComponent
      ],
    imports: [
        SharedModule,
        routing,
        TasksBaseModule
    ],
    providers: []
})
export class TeacherModule { }
