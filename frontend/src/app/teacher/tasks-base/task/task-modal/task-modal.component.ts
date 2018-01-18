import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { ThemeService, DisciplineService, TasksService } from './../../../../_services/index';

import { CheckErrorValidators } from './../../../../shared/check-error-validators';
import { success, error } from './../../../../shared/alert';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.sass']
})
export class TaskModalComponent implements OnInit {

  newAnswer: string;
  answers: any;
  answerObj: any;

  disciplines: Observable<any[]>;  
  themes: Observable<any[]>;
  selectedDiscipline: any = {};
  selectedTheme: any = {};
  // task: any = {};
  question;
  id_topic;
  creator;
  date;


  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private themeService: ThemeService,
    private disciplineService: DisciplineService,
    private tasksService: TasksService
  ) {
    this.newAnswer = '';
    this.answers = [];
  }

  ngOnInit() {
    this.disciplines = this.disciplineService.disciplines;
    this.disciplineService.getAll();

    this.themes = this.themeService.themes;
    this.themeService.getAll();
  }


  addAnswer() {
    this.answerObj = {
      answer: this.newAnswer,
      isTrue: false
    }
    this.answers.push(this.answerObj);
    this.newAnswer = '';
  }

  deleteAnswer(index) {
    this.answers.splice(index, 1);
  }

  pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  onSelect(selected) {
    console.log(selected.id);
    this.themes = this.themeService.themes.map(e => e.filter((t) => t.discipline === selected.name));
    // this.addTaskForm.get("selectedTheme").reset();
  }

  createSickLeave() {
    // this.task.id_topic = this.addTaskForm.get("selectedTheme").value.id;
    // this.task.question = this.addTaskForm.get("question").value;

    this.id_topic = this.selectedTheme.id;
    this.question;
    this.answers = this.answers.map(e => {
      e.isTrue = +e.isTrue;
      return e; 
    });

    let сurrentUser = JSON.parse(localStorage.getItem("currentUser"));   
    this.creator = сurrentUser.username;
    console.log(сurrentUser);

    let today = new Date();
    this.date = today.getFullYear() + "-" + this.pad(today.getMonth() + 1) + "-" + this.pad(today.getDate());
    console.log(this.creator);
    console.log(this.date);
    console.log(this.selectedTheme);
    console.log(this.id_topic);    
    console.log(this.question);
    console.log(this.answers);
    this.tasksService.create(this.selectedTheme, this.question, this.answers, this.creator, this.date);
    
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.tasksService.success !== undefined){
        clearInterval(s);
        if(this.tasksService.success){
          //this.selectedDiscipline = undefined;
          //this.selectedTheme = undefined;
          this.question = '';
          this.answers = [];
          success();
          } else {
            error();
          }
      }
    }, 50);

  }
}
