import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { ThemeService, DisciplineService } from './../../../../_services/index';

import { CheckErrorValidators } from './../../../../shared/check-error-validators';
import { success, error } from './../../../../shared/alert';

@Component({
  selector: 'app-themes-modal',
  templateUrl: './themes-modal.component.html',
  styleUrls: ['./themes-modal.component.sass']
})
export class ThemesModalComponent implements OnInit {

  theme: any = {};
  selectedDisciplineName;
  disciplines: Observable<any[]>;

  addThemeForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "selectedDiscipline": "",
    "name": ""
  };

  constructor(
    public dialogRef: MatDialogRef<ThemesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private themeService: ThemeService,
    private disciplineService: DisciplineService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.disciplines = this.disciplineService.disciplines;
    this.disciplineService.getAll();

    this.buildForm();
  }
  
  buildForm() {
    this.addThemeForm = this.fb.group({
      "selectedDiscipline": ['', [
        Validators.required
      ]],
      "name": ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
       // Validators.pattern("[A-ZЄ-ЯҐ]{1}[a-zа-їґ]+$")
      ]]
    });

    this.addThemeForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.addThemeForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.addThemeForm, this.formErrors);
  }

  createTheme() {
    this.theme.id_discipline = this.addThemeForm.get("selectedDiscipline").value.id;
    this.selectedDisciplineName = this.addThemeForm.get("selectedDiscipline").value.name;
    this.theme.name = this.addThemeForm.get("name").value;

    this.themeService.create(this.theme, this.selectedDisciplineName);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.themeService.success !== undefined){
        clearInterval(s);
        if(this.themeService.success){
          success();
          this.addThemeForm.reset();
          this.checkErrors.onValueChange(this.addThemeForm, this.formErrors);
          } else {
            error();
          }
      }
    }, 50);

  }

}
