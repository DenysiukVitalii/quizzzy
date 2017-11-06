import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-test-base-create-modal',
  templateUrl: './test-base-modals.component.html',
  styleUrls: ['./test-base-modals.component.sass']
})
export class TestBaseCreateModalComponent {
  tmpData = '';

  constructor(
    public dialogRef: MatDialogRef<TestBaseCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onSave(): void {
    this.dialogRef.close(this.tmpData);
  }

}
