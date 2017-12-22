import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAppliedDashboardComponent } from './job-applied-dashboard.component';

describe('JobAppliedDashboardComponent', () => {
  let component: JobAppliedDashboardComponent;
  let fixture: ComponentFixture<JobAppliedDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAppliedDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAppliedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
