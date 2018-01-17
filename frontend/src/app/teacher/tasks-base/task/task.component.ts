import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { TaskModalComponent } from './task-modal/task-modal.component';

import { TasksService } from './../../../_services/index';

import * as $ from 'jquery';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

  displayedColumns = ['#', 'Discipline', 'Theme', 'Question', 'Action'];
  tasks: Observable <any[]>;

  constructor(public dialog: MatDialog, private tasksService: TasksService) { }

  ngOnInit() {
    this.tasks = this.tasksService.tasks;
    this.tasksService.getAll();
    
    console.log(this.tasks);
  }
  
  ngAfterViewChecked() {
    $(".top").css("width", $(".table").width());
  }
  
  resize(){
    $(".top").css("width", $(".table").width());
  }

  createTask(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      height: '450px',
      width: '400px',
    });
  }


  deleteTask(task){
    this.tasksService.delete(task);
  } 
}
