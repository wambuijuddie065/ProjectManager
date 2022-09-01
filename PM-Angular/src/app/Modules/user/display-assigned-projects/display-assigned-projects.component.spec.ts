import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAssignedProjectsComponent } from './display-assigned-projects.component';

describe('DisplayAssignedProjectsComponent', () => {
  let component: DisplayAssignedProjectsComponent;
  let fixture: ComponentFixture<DisplayAssignedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAssignedProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAssignedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
