import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-base',
  templateUrl: './tasks-base.component.html',
  styleUrls: ['./tasks-base.component.sass']
})
export class TasksBaseComponent implements OnInit {

  navLinks = [
    { path: "task", label: "Завдання"},
    { path: "themes", label: "Теми"},
    { path: "discipline", label: "Дисципліни"}
  ]
  constructor() { }

  ngOnInit() {
  }

}
