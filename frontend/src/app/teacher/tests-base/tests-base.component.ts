import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material';

import { TestsService } from './../../_services/index';

import { TestBaseCreateModalComponent } from './test-base-modals/test-base-modals.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tests-base',
  templateUrl: './tests-base.component.html',
  styleUrls: ['./tests-base.component.sass']
})
export class TestsBaseComponent implements OnInit {

  displayedColumns = ['#', 'Name', 'Discipline', 'Theme', 'Passings Count', 'Time', 'edit'];
  tests: Observable<any[]>;

  constructor(
    public dialog: MatDialog,
    private testsService: TestsService
  ) { }

  ngOnInit() {
    this.tests = this.testsService.tests;
    this.testsService.getAll();
    
    console.log(this.tests);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TestBaseCreateModalComponent, {
      data: { name: 'Ivan' },
      height: '400px',
      width: '400px',
    });
   
  }
}


