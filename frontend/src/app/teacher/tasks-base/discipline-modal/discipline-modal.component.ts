import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-discipline-modal',
  templateUrl: './discipline-modal.component.html',
  styleUrls: ['./discipline-modal.component.sass']
})
export class DisciplineModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DisciplineModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
