import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineModalComponent } from './discipline-modal.component';

describe('DisciplineModalComponent', () => {
  let component: DisciplineModalComponent;
  let fixture: ComponentFixture<DisciplineModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplineModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
