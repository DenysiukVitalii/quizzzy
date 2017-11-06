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
import { DisciplineEditModalComponent } from './discipline-edit-modal/discipline-edit-modal.component';

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
  disciplines: Observable<Discip[]>;

  constructor( public dialog: MatDialog, private tasksService: TasksService) {}

  ngOnInit() {
    this.disciplines = this.tasksService.disciplines;
    this.tasksService.getAll();
  }

  editDiscipline(discipline: Discip) {
    const dialogRefEdit = this.dialog.open(DisciplineEditModalComponent, {
      height: '350px',
      width: '400px',
      data: {
        discipline: discipline
      }
    })
  }

  deleteDiscipline(discipline: Discip){
    this.tasksService.delete(discipline);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DisciplineModalComponent, {
      height: '350px',
      width: '400px',
    });
  }

}
