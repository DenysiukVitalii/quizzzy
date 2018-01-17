import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from './../../../shared/shared.module';

import { ThemesComponent } from './themes.component';
import { ThemesModalComponent } from './themes-modal/themes-modal.component';
import { ThemesEditModalComponent } from './themes-edit-modal/themes-edit-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule, 
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    declarations: [
        ThemesComponent,
        ThemesModalComponent,
        ThemesEditModalComponent,
    ],
    entryComponents: [
        ThemesModalComponent,
        ThemesEditModalComponent
    ],
})
export class ThemesModule { }