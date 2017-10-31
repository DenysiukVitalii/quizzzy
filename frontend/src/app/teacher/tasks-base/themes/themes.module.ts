import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from './../../../shared/shared.module';

import { ThemesComponent } from './themes.component';
import { ThemesModalComponent } from './themes-modal/themes-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        ThemesComponent,
        ThemesModalComponent,
    ],
    entryComponents: [
        ThemesModalComponent
    ],
})
export class ThemesModule { }