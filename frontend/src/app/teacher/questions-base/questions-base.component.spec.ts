import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsBaseComponent } from './questions-base.component';

describe('QuestionsBaseComponent', () => {
  let component: QuestionsBaseComponent;
  let fixture: ComponentFixture<QuestionsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
