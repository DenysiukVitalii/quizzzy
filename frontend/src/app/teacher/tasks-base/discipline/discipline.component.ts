import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog, Sort } from '@angular/material';


import { DisciplineModalComponent } from './discipline-modal/discipline-modal.component';
import { DisciplineEditModalComponent } from './discipline-edit-modal/discipline-edit-modal.component';

import { DisciplineService } from './../../../_services/index';

import { Discip } from './../../../_models/discip';
import { Discipline } from './../../../_models/discipline';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.sass']
})
export class DisciplineComponent implements OnInit {

  displayedColumns = ['#', 'name', 'actions'];
  disciplines: Observable<any[]>;

  constructor( public dialog: MatDialog, private disciplineService: DisciplineService) {}

  ngOnInit() {
    this.disciplines = this.disciplineService.disciplines;
    this.disciplineService.getAll();
    console.log(this.disciplines);
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
    this.disciplineService.delete(discipline);
  }

  createDiscipline(): void {
    const dialogRef = this.dialog.open(DisciplineModalComponent, {
      height: '350px',
      width: '400px',
    });
  }

}
