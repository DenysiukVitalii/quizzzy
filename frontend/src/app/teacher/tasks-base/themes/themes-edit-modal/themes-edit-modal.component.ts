import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { ThemeService } from './../../../../_services/index';

import { CheckErrorValidators } from './../../../../shared/check-error-validators';
import { success, error } from './../../../../shared/alert';

@Component({
  selector: 'app-themes-edit-modal',
  templateUrl: './themes-edit-modal.component.html',
  styleUrls: ['./themes-edit-modal.component.sass']
})
export class ThemesEditModalComponent implements OnInit {

  theme: any = {};

  editThemeForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "name": ""
  };

  constructor(
    public dialogRef: MatDialogRef<ThemesEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private themeService: ThemeService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getThemeData();
    this.buildForm();
  }
  
  getThemeData() {
    console.log(this.data);
    this.theme.name = this.data.theme.topic;
    this.theme.id = this.data.theme.id;
    this.theme.discipline = this.data.theme.discipline;
  }

  buildForm() {
    this.editThemeForm = this.fb.group({
      "name": [this.theme.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[a-zа-їґ]+$")
      ]]
    });

    this.editThemeForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.editThemeForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.editThemeForm, this.formErrors);
  }

  editTheme() {
    // this.selectedDisciplineName = this.disciplineService.getSub(this.theme.id_discipline);
    this.theme.name = this.editThemeForm.get("name").value;
    this.themeService.update(this.theme);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if (this.themeService.success !== undefined) {
        clearInterval(s);
        if (this.themeService.success) {
          success();
          setTimeout(() => this.dialogRef.close(), 1600);
        } else {
          error();
        }
      }
    }, 50);

  }

}
