import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { routing } from './teacher.routes';

import { TeacherComponent } from './teacher.component';
import { QuestionsBaseComponent } from './questions-base/questions-base.component';
import { StudentsBaseComponent } from './students-base/students-base.component';
import { CreateTestModalComponent } from './create-test-modal/create-test-modal.component';
import { TestsBaseComponent } from './tests-base/tests-base.component';


@NgModule({
    declarations: [
        TeacherComponent,
        QuestionsBaseComponent,
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
        routing
    ],
    providers: []
})
export class TeacherModule { }
