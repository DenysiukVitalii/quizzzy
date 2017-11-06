import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TasksService } from './../../../../_services/tasks.service';


@Component({
  selector: 'app-discipline-modal',
  templateUrl: './discipline-modal.component.html',
  styleUrls: ['./discipline-modal.component.sass']
})
export class DisciplineModalComponent implements OnInit {

  discipline: any = {};

  constructor(
    public dialogRef: MatDialogRef<DisciplineModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.discipline.name = "";
  }

  onNoClick() {
    this.dialogRef.close();
  }

  createDiscipline() {
    if(this.discipline.name != "") {
      this.tasksService.create(this.discipline);
    }
    this.discipline.name = "";
  }
}
