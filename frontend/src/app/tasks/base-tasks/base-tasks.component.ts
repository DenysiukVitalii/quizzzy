import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-tasks',
  templateUrl: './base-tasks.component.html',
  styleUrls: ['./base-tasks.component.sass']
})
export class BaseTasksComponent implements OnInit {

  navLinks = [
    { path: "task", label: "Завдання"},
    { path: "themes", label: "Теми"},
    { path: "discipline", label: "Дисципліни"}
  ]
  constructor() { }

  ngOnInit() {
  }

}
