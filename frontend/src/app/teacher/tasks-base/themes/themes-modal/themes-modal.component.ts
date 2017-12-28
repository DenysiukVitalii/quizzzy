import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-themes-modal',
  templateUrl: './themes-modal.component.html',
  styleUrls: ['./themes-modal.component.sass']
})
export class ThemesModalComponent implements OnInit {

  disciplines = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(
    public dialogRef: MatDialogRef<ThemesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  // onNoClick() {
  //   this.dialogRef.close();
  // }

}
