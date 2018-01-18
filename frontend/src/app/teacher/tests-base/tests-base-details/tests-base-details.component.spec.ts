import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsBaseDetailsComponent } from './tests-base-details.component';

describe('TestsBaseDetailsComponent', () => {
  let component: TestsBaseDetailsComponent;
  let fixture: ComponentFixture<TestsBaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsBaseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsBaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
