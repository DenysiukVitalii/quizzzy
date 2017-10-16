import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
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
  // exampleDatabase = new ExampleDatabase();
  // dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.role !== 'teacher') {
      this.router.navigate(['/']);
    }

    this.dataSource = new TestDataSource(this.myTests);
    // this.dataSource = new ExampleDataSource(this.exampleDatabase);
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //     .debounceTime(150)
    //     .distinctUntilChanged()
    //     .subscribe(() => {
    //       if (!this.dataSource) { return; }
    //       this.dataSource.filter = this.filter.nativeElement.value;
    //     });
    // }
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

// export interface TestData {
//   id: string;
//   name: string;
//   subject: string;
//   theme: string;
//   createdDate: string;
//   passingCount: number;
// }

// /** An example database that the data source uses to retrieve data for the table. */
// export class ExampleDatabase {
//   /** Stream that emits whenever the data has been modified. */
//   dataChange: BehaviorSubject<TestData[]> = new BehaviorSubject<TestData[]>([]);
//   get data(): TestData[] { return this.dataChange.value; }

//   constructor() {
//     // Fill up the database with 100 users.
//     for (let i = 0; i < 100; i++) { this.addUser(); }
//   }

//   /** Adds a new user to the database. */
//   addUser() {
//     const copiedData = this.data.slice();
//     copiedData.push(this.createNewUser());
//     this.dataChange.next(copiedData);
//   }

//   /** Builds and returns a new User. */
//   private createNewUser() {
//     return {
//       id: (this.data.length + 1).toString(),
//       name: 'Module Work #1',
//       subject: 'Matan',
//       theme: 'Difury',
//       createdDate: '02.02.1998',
//       passingCount: 23,
//     };
//   }
// }

// /**
// * Data source to provide what data should be rendered in the table. Note that the data source
// * can retrieve its data in any way. In this case, the data source is provided a reference
// * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
// * the underlying data. Instead, it only needs to take the data and send the table exactly what
// * should be rendered.
// */
// export class ExampleDataSource extends DataSource<any> {
//   _filterChange = new BehaviorSubject('');
//   get filter(): string { return this._filterChange.value; }
//   set filter(filter: string) { this._filterChange.next(filter); }

//   constructor(private _exampleDatabase: ExampleDatabase) {
//     super();
//   }

//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<TestData[]> {
//     const displayDataChanges = [
//       this._exampleDatabase.dataChange,
//       this._filterChange,
//     ];

//     return Observable.merge(...displayDataChanges).map(() => {
//       return this._exampleDatabase.data.slice().filter((item: TestData) => {
//         const searchStr = (item.name).toLowerCase();
//         return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//       });
//     });
//   }

//   disconnect() {}
// }
