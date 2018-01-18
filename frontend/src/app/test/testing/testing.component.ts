import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../../_services/index';
import { MatDialog } from '@angular/material';
import { ShowResultModalComponent } from './show-result-modal/show-result-modal';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.sass']
})
export class TestingComponent implements OnInit {
  id: any;
  questions = [];
  isRight: boolean;
  succesRate: number;
  result: any;

  constructor(
    private route: ActivatedRoute,
    private testsService: TestsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTest(this.id);
  }

  getTest(id): void {
    this.testsService.getTest(id).subscribe(res => this.questions = res);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ShowResultModalComponent, {
      height: '380px',
      width: '450px',
      data: {
        isSucces: this.isRight,
        succesRate: this.succesRate
      }
    });
  }

  onAcceptTest(): void {
    let rightQuestions = 0;

    this.isRight = true;
    this.questions.map(question => {
      let isTrue = true;
      question.answers.map(answer => {
        if (answer.isTrue === 1 && !answer.checked || answer.isTrue !== 1 && answer.checked) {
          isTrue = false;
          this.isRight = false;
        }
      });
      if (isTrue) {
        rightQuestions++;
      }
    });


    this.succesRate = Math.floor(rightQuestions * 100 / this.questions.length);
    this.openDialog();
    this.testsService.saveResult(this.sendResult());
  }

  sendResult(): any {
    const username = JSON.parse(localStorage.getItem('currentUser')).username;
    let today = new Date();
    let da = today.getFullYear() + "-" + this.pad(today.getMonth() + 1) + "-" + this.pad(today.getDate());
    return {
      username: username,
      id_test: this.id,
      result: this.succesRate,
      date: da
    };
  }

  pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }
}
