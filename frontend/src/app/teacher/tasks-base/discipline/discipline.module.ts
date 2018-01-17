import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from './../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { DisciplineComponent } from './discipline.component';

import { DisciplineModalComponent } from './discipline-modal/discipline-modal.component';

import { DisciplineEditModalComponent } from './discipline-edit-modal/discipline-edit-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    declarations: [
        DisciplineComponent,
        DisciplineModalComponent,
        DisciplineEditModalComponent
    ],
    entryComponents: [
        DisciplineModalComponent,
        DisciplineEditModalComponent
    ]
})
export class DisciplineModule { }