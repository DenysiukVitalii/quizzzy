import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { MatDialog} from '@angular/material';
import { Router } from "@angular/router";

import { TestsService } from './../../_services/index';

import { TestBaseCreateModalComponent } from './test-base-modals/test-base-modals.component';
import { Observable } from 'rxjs/Observable';

import * as $ from 'jquery';

@Component({
  selector: 'app-tests-base',
  templateUrl: './tests-base.component.html',
  styleUrls: ['./tests-base.component.sass']
})
export class TestsBaseComponent implements OnInit {

  displayedColumns = ['#', 'Name', 'Discipline', 'Theme', 'Amount tasks', 'Time', 'Creator', 'Date', 'Action'];
  tests: Observable<any[]>;
  page: number = 1;
  countItems: number = 7;
  searchString: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private testsService: TestsService
  ) { }

  ngOnInit() {
    this.tests = this.testsService.tests;
    this.testsService.getAll();
    
    console.log(this.tests);
  }

  ngAfterViewChecked() {
    $(".top").css("width", $(".table").width());
  }
  
  resize(){
    $(".top").css("width", $(".table").width());
  }

  onSelect(selected) {
    this.router.navigate(["/teacher/test", selected.id_test]);
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(TestBaseCreateModalComponent, {
      // data: { name: 'Ivan' },
      height: '500px',
      width: '400px',
    });
   
  }

  deleteTest(test){
    test.id = test.id_test;
    this.testsService.delete(test);
  } 
}


