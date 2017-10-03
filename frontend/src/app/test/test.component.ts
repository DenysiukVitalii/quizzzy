import { Component, OnInit } from '@angular/core';

import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {

  tasks = [];

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.tasks = this.testService.getTasks();
  }

}
