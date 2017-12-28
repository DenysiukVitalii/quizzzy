import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsBaseComponent } from './students-base.component';

describe('StudentsBaseComponent', () => {
  let component: StudentsBaseComponent;
  let fixture: ComponentFixture<StudentsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
