import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopJobsComponent } from './top-jobs.component';

describe('TopJobsComponent', () => {
  let component: TopJobsComponent;
  let fixture: ComponentFixture<TopJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
