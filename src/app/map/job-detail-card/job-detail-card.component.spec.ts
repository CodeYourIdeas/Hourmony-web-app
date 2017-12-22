import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailCardComponent } from './job-detail-card.component';

describe('JobDetailCardComponent', () => {
  let component: JobDetailCardComponent;
  let fixture: ComponentFixture<JobDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
