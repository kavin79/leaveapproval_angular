import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenteditorComponent } from './studenteditor.component';

describe('StudenteditorComponent', () => {
  let component: StudenteditorComponent;
  let fixture: ComponentFixture<StudenteditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenteditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenteditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
