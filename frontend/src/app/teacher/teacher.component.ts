import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


interface Test {
  id: number;
  name: string;
  subject: string;
  theme: string;
  createdDate: string;
  passingCount: number;
}

const tests = [
  {
    id: 1,
    name: 'Module Work #1',
    subject: 'Matan',
    theme: 'Difury',
    createdDate: '02.02.1998',
    passingCount: 23,
  },
  {
    id: 2,
    name: 'Year Work #1',
    subject: 'Fizika',
    theme: 'Mehanika',
    createdDate: '03.02.1298',
    passingCount: 2,
  },
];

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.sass']
})
export class TeacherComponent implements OnInit {
  myTests = tests;
  displayedColumns = ['testId', 'name', 'subject', 'theme', 'createdDate', 'passingsCount'];
  dataSource: TestDataSource;

  @ViewChild('filter') filter: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.role !== 'teacher') {
      this.router.navigate(['/']);
    }

    this.dataSource = new TestDataSource(this.myTests);
  }
}

export class TestDataSource extends DataSource<Test> {
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private tests: Test[]) {
    super();
  }

  connect(): Observable<Test[]> {
    return Observable.of(this.tests);
  }

  disconnect() {}
}

