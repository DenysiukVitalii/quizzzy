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

import { Discip } from './../../../_models/discip';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.sass']
})
export class DisciplineComponent implements OnInit {

  displayedColumns = ['id', 'name', 'edit', 'delete'];
  dataSource: MyDataSource | null;
  dataSubject = new BehaviorSubject<any[]>([]);


  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService
  ) {
    this.tasksService.getAll().subscribe({
            next: value => this.dataSubject.next(value)
          });
   }

  ngOnInit() {
    console.log("hello");

    this.dataSource = new MyDataSource(this.dataSubject);
    
  }
 
  deleteDiscipline(row: Discip){
    console.log(row);
    this.tasksService.delete(row);
    this.tasksService.getAll().subscribe({
      next: value => this.dataSubject.next(value)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DisciplineModalComponent, {
      height: '350px',
      width: '400px',
    });

    dialogRef.afterClosed()
    .subscribe(selection => {
      if (selection) {
        this.tasksService.getAll().subscribe({
          next: value => this.dataSubject.next(value)
        });
      } else {
        // User clicked 'Cancel' or clicked outside the dialog
      }
    });
  }

}

export class MyDataSource extends DataSource<any[]> {
  
    constructor(private subject: BehaviorSubject<any[]>) {
      super ();
    }
  
    connect (): Observable<any[]> {
      return this.subject.asObservable();
    }
  
    disconnect (  ): void {
  
    }
  
  }