
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TestBaseCreateModalComponent } from './test-base-modals/test-base-modals.component';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatDialog} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'app-tests-base',
  templateUrl: './tests-base.component.html',
  styleUrls: ['./tests-base.component.sass']
})
export class TestsBaseComponent implements OnInit {

  displayedColumns = ['testId', 'name', 'subject', 'theme', 'createdDate', 'passingsCount', 'edit'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TestBaseCreateModalComponent, {
      data: { name: 'Ivan' },
      height: '400px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      data[0].name = result;
      console.log('The dialog was closed ' + result);
    });
  }
}


export interface UserData {
  id: number;
  name: string;
  subject: string;
  theme: string;
  createdDate: string;
  passingCount: number;
}

const data: UserData[] = [
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

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor() {
    for (let i = 0; i < data.length; i++) { this.addUser(i); }
  }

  /** Adds a new user to the database. */
  addUser(i) {
    const copiedData = this.data.slice();
    copiedData.push(data[i]);
    this.dataChange.next(copiedData);
  }
}

export class ExampleDataSource extends DataSource<UserData> {

    /** Emits once if dataSource is disconnected  */
    disconnect$ = new Subject();
    /** Provides the current length (Use in paginator) */
    length: number;
    /** emits the filter value */
    _filterChange = new BehaviorSubject<string>('');

    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
      super();
    }

    get filter(): string {
      return this._filterChange.value;
    }

    set filter(filter: string) {
      this._filterChange.next(filter);
    }

    connect(): Observable<UserData[]> {

     /** Holder for everything that affects displayed rows.  */
      const displayDataChanges = [
        this._exampleDatabase.dataChange,
        this._paginator.page,
        this._filterChange
      ];

      /** Reset the Pagination to startpage if filtering is in progress.  */
      this._filterChange
          .takeUntil(this.disconnect$)
          .subscribe(() => this.resetPaginator());

      /** Provides the actual data.  */
      return Observable
          .merge(...displayDataChanges)
          .takeUntil(this.disconnect$)
          .map(() => this.getFreshData())
          .map((data) => this.getFilteredData(data))
          .do(data => this.setLength(data))
          .map(data => this.paginate(data));
    }
  
  
    resetPaginator() {
      return this._paginator.pageIndex = 0;
    }
  
    getFreshData() {
      return this._exampleDatabase.data.slice();
    }
  
    getFilteredData(data) {
      if (this.filter === '') {
        return data;
      }
      return data.filter((item: UserData) => {
        const searchStr = (item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    }

    paginate(data) {
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    }

    setLength(data) {
      return this.length = data.length;
    }

    disconnect() {
      this.disconnect$.next(true);
      this.disconnect$.complete();
    }
  }
