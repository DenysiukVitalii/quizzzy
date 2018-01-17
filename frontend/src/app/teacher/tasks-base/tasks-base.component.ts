import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-base',
  templateUrl: './tasks-base.component.html',
  styleUrls: ['./tasks-base.component.sass']
})
export class TasksBaseComponent implements OnInit {

  navLinks = [
    { path: "task", label: "Tasks"},
    { path: "themes", label: "Themes"},
    { path: "discipline", label: "Disciplines"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
