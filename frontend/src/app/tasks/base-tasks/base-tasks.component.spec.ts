import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTasksComponent } from './base-tasks.component';

describe('BaseTasksComponent', () => {
  let component: BaseTasksComponent;
  let fixture: ComponentFixture<BaseTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
