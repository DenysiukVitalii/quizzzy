import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { ThemesModalComponent } from './themes-modal/themes-modal.component';
import { ThemesEditModalComponent } from './themes-edit-modal/themes-edit-modal.component';

import { ThemeService } from './../../../_services/index';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.sass']
})

export class ThemesComponent implements OnInit {

  displayedColumns = ['#', 'Discipline', 'Theme', 'Actions'];
  themes: Observable<any[]>;

  constructor(public dialog: MatDialog, private themeService: ThemeService) { }

  ngOnInit() {
    this.themes = this.themeService.themes;
    this.themeService.getAll();
    
    console.log(this.themes);
  }

  createTheme(): void {
    const dialogRef = this.dialog.open(ThemesModalComponent, {
      height: '350px',
      width: '400px',
    });
  }

  editTheme(theme) {
    const dialogRefEdit = this.dialog.open(ThemesEditModalComponent, {
      height: '500px',
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
