import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { ThemeService, DisciplineService, TestsService } from './../../_services/index';

import { CheckErrorValidators } from './../../shared/check-error-validators';
import { success, error } from './../../shared/alert';

@Component({
  selector: 'app-create-test-modal',
  templateUrl: './create-test-modal.component.html',
  styleUrls: ['./create-test-modal.component.sass']
})
export class CreateTestModalComponent implements OnInit {

  test: any = {};
  selectedDisciplineName;
  selectedThemeName;
  disciplines: Observable<any[]>;
  themes: Observable<any[]>;

  addTestForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "selectedDiscipline": "",
    "name": ""
  };

  constructor(
    public dialogRef: MatDialogRef<CreateTestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private themeService: ThemeService,
    private disciplineService: DisciplineService,
    private testsService: TestsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.disciplines = this.disciplineService.disciplines;
    this.disciplineService.getAll();

    this.themes = this.themeService.themes;
    this.themeService.getAll();

    this.buildForm();
  }
  
  buildForm() {
    this.addTestForm = this.fb.group({
      "selectedDiscipline": ['', [
      ]],
      "selectedTheme": ['', [
        Validators.required
      ]],
      "name": ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      "amount_tasks": ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]],
      "timer": ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]]
    });

    this.addTestForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.addTestForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.addTestForm, this.formErrors);
  }

  onSelect(selected) {
    console.log(selected.id);
    this.themes = this.themeService.themes.map(e => e.filter((t) => t.discipline === selected.name));
    this.addTestForm.get("selectedTheme").reset();
  }

  pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  createTest() {
    let сurrentUser = JSON.parse(localStorage.getItem("currentUser"));   
    this.test.creator = сurrentUser.username;
    console.log(сurrentUser);

    let today = new Date();
    this.test.date = today.getFullYear() + "-" + this.pad(today.getMonth() + 1) + "-" + this.pad(today.getDate());

    this.test.name = this.addTestForm.get("name").value;
    this.test.amount_tasks = this.addTestForm.get("amount_tasks").value;
    this.test.timer = this.addTestForm.get("timer").value;
    this.test.id_topic = this.addTestForm.get("selectedTheme").value.id;
    this.selectedThemeName = this.addTestForm.get("selectedTheme").value.topic;
    this.selectedDisciplineName = this.addTestForm.get("selectedTheme").value.discipline;
    
    this.test.id_discipline = this.disciplineService.getDiscipline(this.selectedDisciplineName);

    console.log(this.test);
    this.testsService.create(this.test, this.selectedDisciplineName, this.selectedThemeName);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.testsService.success !== undefined){
        clearInterval(s);
        if(this.testsService.success){
          success();
          this.addTestForm.reset();
          this.checkErrors.onValueChange(this.addTestForm, this.formErrors);
          } else {
            error();
          }
      }
    }, 50);

  }
}
