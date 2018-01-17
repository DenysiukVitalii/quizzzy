import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesEditModalComponent } from './themes-edit-modal.component';

describe('ThemesEditModalComponent', () => {
  let component: ThemesEditModalComponent;
  let fixture: ComponentFixture<ThemesEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemesEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
