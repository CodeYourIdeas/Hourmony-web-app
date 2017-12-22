import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeakerComponent } from './job-seaker.component';

describe('JobSeakerComponent', () => {
  let component: JobSeakerComponent;
  let fixture: ComponentFixture<JobSeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
