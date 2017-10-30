import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksBaseComponent } from './tasks-base.component';

describe('BaseTasksComponent', () => {
  let component: TasksBaseComponent;
  let fixture: ComponentFixture<TasksBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
