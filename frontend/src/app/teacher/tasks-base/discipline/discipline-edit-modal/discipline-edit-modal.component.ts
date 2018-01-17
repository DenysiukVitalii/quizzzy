import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { CheckErrorValidators } from './../../../../shared/check-error-validators';
import { success, error } from './../../../../shared/alert';

import { DisciplineService } from './../../../../_services/index';

@Component({
  selector: 'app-discipline-edit-modal',
  templateUrl: './discipline-edit-modal.component.html',
  styleUrls: ['./discipline-edit-modal.component.sass']
})
export class DisciplineEditModalComponent implements OnInit {

  discipline: any = {};
  editDisciplineForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "name": "",
  };

  constructor(
    public dialogRef: MatDialogRef<DisciplineEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private disciplineService: DisciplineService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    this.discipline.id = this.data.discipline.id;
    this.discipline.name = this.data.discipline.name;
    this.buildForm();    
  }

  buildForm() {
    this.editDisciplineForm = this.fb.group({
      "name": [this.discipline.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[A-Za-zЄ-ЯҐа-їґ\s]+$")
      ]]
    });

    this.editDisciplineForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.editDisciplineForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.editDisciplineForm, this.formErrors);
  }

  editDiscipline() {
    console.log(this.discipline);
    this.discipline.name = this.editDisciplineForm.get('name').value;
    this.disciplineService.update(this.discipline);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.disciplineService.success !== undefined){
        clearInterval(s);
        if(this.disciplineService.success){
          success();
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            error();
          }
      }
    }, 50);
  }

}
