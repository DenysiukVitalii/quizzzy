import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TestsService } from './../_services/tests.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {
  tests = [];
  searchString = '';
  displayedColumns = ['#', 'Name', 'Discipline', 'Theme', 'Passings Count', 'Time', 'Creator', 'Date', 'Action'];
  username: string;

  constructor(public router: Router, public testsService: TestsService) { }

  ngOnInit() {
    this.testsService.getAll();
    this.testsService.tests.subscribe(res => this.tests = res);
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
  }


}
