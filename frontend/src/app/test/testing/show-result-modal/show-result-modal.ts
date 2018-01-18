import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-show-result-modal',
  templateUrl: './show-result-modal.html',
  styleUrls: ['./show-result-modal.sass']
})
export class ShowResultModalComponent implements OnInit {

  passingResult: string;

  constructor(
    public dialogRef: MatDialogRef<ShowResultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.passingResult = this.data.isSucces ? 'Succes :)' : 'You failed the test :(';
  }

  ngOnInit() {
  }

  closed() {
    this.dialogRef.close();
  }
}
