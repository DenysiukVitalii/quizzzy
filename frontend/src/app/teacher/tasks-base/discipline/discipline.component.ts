import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatDialog } from '@angular/material';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';

import { DisciplineModalComponent } from './discipline-modal/discipline-modal.component';

import { TasksService } from './../../../_services/tasks.service';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.sass']
})
export class DisciplineComponent implements OnInit {

  displayedColumns = ['id', 'name', 'edit', 'delete'];
  disciplines = [];
  dataSource: ExampleDataSource;


  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    console.log("hello");
    this.getDisciplines();

    this.dataSource = new ExampleDataSource(this.tasksService);
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DisciplineModalComponent, {
      height: '350px',
      width: '400px',
    });
  }

  getDisciplines() {
    console.log("qweew");
    this.tasksService.getAll()
        .subscribe(
            data => {
                console.log(data);
                this.disciplines = data; 
                // this.dataSource = new ExampleDataSource(this.disciplines);
            },
            error => {
                console.log(error);
            });
  }
  

}

interface UserType {
  id: number;
  name: string;
}


export class ExampleDataSource extends DataSource<UserType> {
  
    constructor(private tasksService: TasksService) {
      super();
    }

    connect(): Observable<UserType[]> {
      // console.log(this._exampleDatabase);
      return this.tasksService.getAll();
    }
  
    disconnect() {}
  
  }


//   displayedColumns = ['id', 'name', 'edit', 'delete'];
//   dataSource: MyDataSource;
//   dataSubject = new BehaviorSubject<any[]>([]);


//   constructor(
//     public dialog: MatDialog,
//     private tasksService: TasksService
//   ) {
//     this.tasksService.getAll().subscribe({
//             next: value => this.dataSubject.next(value)
//           });
//    }

//   ngOnInit() {
//     console.log("hello");

//     this.dataSource = new MyDataSource(this.dataSubject);
    
//   }

//   openDialog(): void {
//     const dialogRef = this.dialog.open(DisciplineModalComponent, {
//       height: '350px',
//       width: '400px',
//     });
//   }

// }

// export class MyDataSource extends DataSource<any[]> {
  
//     constructor(private subject: BehaviorSubject<any[]>) {
//       super ();
//     }
  
//     connect (): Observable<any[]> {
//       return this.subject.asObservable();
//     }
  
//     disconnect (  ): void {
  
//     }
  
//   }