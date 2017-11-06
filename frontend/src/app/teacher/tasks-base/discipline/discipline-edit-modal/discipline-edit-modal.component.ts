import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TasksService } from './../../../../_services/tasks.service';

@Component({
  selector: 'app-discipline-edit-modal',
  templateUrl: './discipline-edit-modal.component.html',
  styleUrls: ['./discipline-edit-modal.component.sass']
})
export class DisciplineEditModalComponent implements OnInit {

  discipline: any = {};
  
  constructor(
    public dialogRef: MatDialogRef<DisciplineEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tasksService: TasksService
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    this.discipline.id = this.data.discipline.id;
    this.discipline.name = this.data.discipline.name;
    console.log(this.discipline.name);
  }

  editDiscipline() {
    console.log(this.discipline);
    console.log("asdddddd");
    if(this.discipline.name != "") {
      this.tasksService.update(this.discipline);
      this.dialogRef.close();
    }
  }

}
