import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {

  tasks = [];

  constructor(private router: Router, private testService: TestService) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser.role !== 'student') {
      this.router.navigate(['/teacher']);
    }

    this.tasks = this.testService.getTasks();
  }

}
