import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { TestsService } from './../../../_services/index';

@Component({
  selector: 'app-tests-base-details',
  templateUrl: './tests-base-details.component.html',
  styleUrls: ['./tests-base-details.component.sass']
})
export class TestsBaseDetailsComponent implements OnInit {

  test;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private testsService: TestsService
  ) { }

  ngOnInit() {
    console.log("__________");
    this.activatedRoute.params.forEach((params: Params) => {
      let id = +params["id"];
      this.testsService.getTest(id).subscribe(data => {
        console.log(data);
        this.test = data;
      });
    });
    console.log(this.test);
  }

}
