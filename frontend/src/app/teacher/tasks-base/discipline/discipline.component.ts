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
import { Discipline } from './../../../_models/discipline';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.sass']
})
export class DisciplineComponent implements OnInit {

  displayedColumns = ['id', 'name', 'actions'];
  // dataSource: MyDataSource | null;
  // dataSubject = new BehaviorSubject<any[]>([]);
  disciplines: Discip [];

  constructor( public dialog: MatDialog, private tasksService: TasksService) {
    this.disciplines = [];
   }

  ngOnInit() {
    // this.dataSource = new MyDataSource(this.dataSubject);
    this.getDisciplines();
  }

  getDisciplines(){
    this.tasksService.getAll().subscribe(discipline => this.disciplines = discipline); 
    
  }
  deleteDiscipline(discipline: Discip){
    this.tasksService.delete(discipline).subscribe(
      data => {
        console.log(data);
        data.success = JSON.parse(data.success);
        if(data.success) this.disciplines = this.disciplines.filter(disciplines => disciplines !== discipline)
      }
    );
    // this.tasksService.getAll().subscribe({
    //   next: value => this.dataSubject.next(value)
    // });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DisciplineModalComponent, {
      height: '350px',
      width: '400px',
    });

    dialogRef.afterClosed()
    .subscribe(selection => {
      if (selection) {
        this.getDisciplines();
      } else {
        // User clicked 'Cancel' or clicked outside the dialog
      }
    });
  }

}

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