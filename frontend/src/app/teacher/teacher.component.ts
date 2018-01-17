import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateTestModalComponent } from './create-test-modal/create-test-modal.component';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.sass']
})
export class TeacherComponent implements OnInit {
  teacher;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    let сurrentUser = JSON.parse(localStorage.getItem("currentUser"));   
    this.teacher = сurrentUser.username;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTestModalComponent, {
      height: '400px',
      width: '400px',
    });
  }
}



