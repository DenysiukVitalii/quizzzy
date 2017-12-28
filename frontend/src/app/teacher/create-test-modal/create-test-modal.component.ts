import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-test-modal',
  templateUrl: './create-test-modal.component.html',
  styleUrls: ['./create-test-modal.component.sass']
})
export class CreateTestModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateTestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
