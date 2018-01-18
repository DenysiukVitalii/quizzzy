import { Component, OnInit } from '@angular/core';
import { TestsService } from '../../_services/index';
import { Router } from "@angular/router";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {
  displayedColumns = ['Name', 'Discipline', 'Topic', 'Date', 'Result'];
  stats: any;

  constructor(public testsService: TestsService) { }

  ngOnInit() {
    const username = {
      username: JSON.parse(localStorage.getItem('currentUser')).username
    };
    this.getStats(username);
  }

  getStats(username): void {
    this.testsService.getStats(username).subscribe(res => this.stats = res);
  }

}
