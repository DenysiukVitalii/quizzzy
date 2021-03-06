import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TestsService } from './../_services/tests.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {
  tests = [];
  displayedColumns = ['#', 'Name', 'Discipline', 'Theme', 'Passings Count', 'Time', 'Creator', 'Date', 'Action'];
  username: string;
  page: number = 1;
  countItems: number = 7;
  searchString: string;

  constructor(public router: Router, public testsService: TestsService) { }

  ngOnInit() {
    this.testsService.getAll();
    this.testsService.tests.subscribe(res => this.tests = res);
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  ngAfterViewChecked() {
    $(".top").css("width", $(".table").width());
  }
  
  resize(){
    $(".top").css("width", $(".table").width());
  }

}
