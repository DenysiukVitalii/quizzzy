import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { CheckErrorValidators } from './../../../../shared/check-error-validators';
import { success, error } from './../../../../shared/alert';

import { DisciplineService } from './../../../../_services/index';


@Component({
  selector: 'app-discipline-modal',
  templateUrl: './discipline-modal.component.html',
  styleUrls: ['./discipline-modal.component.sass']
})
export class DisciplineModalComponent implements OnInit {

  addDisciplineForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "name": "",
  };

  constructor(
    public dialogRef: MatDialogRef<DisciplineModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private disciplineService: DisciplineService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    // this.discipline.name = "";
  }


  // createDiscipline() {
  //   if(this.discipline.name != "") {
  //     this.disciplineService.create(this.discipline);
  //   }
  //   this.discipline.name = "";
  // }


  buildForm() {
    this.addDisciplineForm = this.fb.group({
      "name": ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
       // Validators.pattern("[A-ZЄ-ЯҐ]{1}[A-Za-zЄ-ЯҐа-їґ\s]+$")
      ]]
    });

    this.addDisciplineForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.addDisciplineForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.addDisciplineForm, this.formErrors);
  }

  createDiscipline() {
    this.disciplineService.create(this.addDisciplineForm.value);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if (this.disciplineService.success !== undefined) {
        clearInterval(s);
        if (this.disciplineService.success) {
          success();
          this.addDisciplineForm.reset();
          this.checkErrors.onValueChange(this.addDisciplineForm, this.formErrors);
        } else {
          error();
        }
      }
    }, 50);
  }

}
