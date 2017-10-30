import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
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
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.sass']
})
export class DisciplineComponent implements OnInit {

  displayedColumns = ['number', 'discipline', 'edit', 'delete'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;  

  constructor() { }

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
}

export interface UserData {
  number: number;
  discipline: string;
}

const data: UserData[] = [
  {number: 1, discipline: 'Математика'},
  {number: 2, discipline: 'Програмування'},
  {number: 3, discipline: 'Історія'}
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

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
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
        const searchStr = (item.discipline).toLowerCase();
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