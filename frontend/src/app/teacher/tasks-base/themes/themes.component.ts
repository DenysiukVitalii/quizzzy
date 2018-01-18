import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { ThemesModalComponent } from './themes-modal/themes-modal.component';
import { ThemesEditModalComponent } from './themes-edit-modal/themes-edit-modal.component';

import { ThemeService } from './../../../_services/index';

import * as $ from 'jquery';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.sass']
})

export class ThemesComponent implements OnInit {

  displayedColumns = ['#', 'Discipline', 'Theme', 'Actions'];
  themes: Observable<any[]>;
  page: number = 1;
  countItems: number = 7;
  searchString: string;

  constructor(public dialog: MatDialog, private themeService: ThemeService) { }

  ngOnInit() {
    this.themes = this.themeService.themes;
    this.themeService.getAll();
    
    console.log(this.themes);
  }

  ngAfterViewChecked() {
    $(".top").css("width", $(".table").width());
  }
  
  resize(){
    $(".top").css("width", $(".table").width());
  }

  createTheme(): void {
    const dialogRef = this.dialog.open(ThemesModalComponent, {
      height: '200px',
      width: '400px',
    });
  }

  editTheme(theme) {
    const dialogRefEdit = this.dialog.open(ThemesEditModalComponent, {
      height: '150px',
      width: '400px',
      data: {
        theme: theme
      }
    });
  }

  deleteTheme(theme){
    this.themeService.delete(theme);
  } 

}
