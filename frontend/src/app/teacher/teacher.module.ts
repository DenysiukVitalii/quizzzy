import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { routing } from './teacher.routes';
import { TasksBaseModule } from './tasks-base/tasks-base.module';
import { FormsModule  } from '@angular/forms';
import { TeacherComponent } from './teacher.component';
import { StudentsBaseComponent } from './students-base/students-base.component';
import { CreateTestModalComponent } from './create-test-modal/create-test-modal.component';
import { TestsBaseComponent } from './tests-base/tests-base.component';
import { TestBaseCreateModalComponent } from './tests-base/test-base-modals/test-base-modals.component';


@NgModule({
    declarations: [
        TeacherComponent,
        StudentsBaseComponent,
        CreateTestModalComponent,
        TestsBaseComponent,
        TestBaseCreateModalComponent,
    ],
    exports: [
        TeacherComponent,
    ],
    entryComponents: [
        CreateTestModalComponent,
        TestBaseCreateModalComponent
      ],
    imports: [
        SharedModule,
        FormsModule,
        routing,
        TasksBaseModule
    ],
    providers: []
})
export class TeacherModule { }
