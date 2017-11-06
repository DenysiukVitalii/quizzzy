import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBaseModalsComponent } from './test-base-modals.component';

describe('TestBaseModalsComponent', () => {
  let component: TestBaseModalsComponent;
  let fixture: ComponentFixture<TestBaseModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBaseModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBaseModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
