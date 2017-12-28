import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineEditModalComponent } from './discipline-edit-modal.component';

describe('DisciplineEditModalComponent', () => {
  let component: DisciplineEditModalComponent;
  let fixture: ComponentFixture<DisciplineEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplineEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
