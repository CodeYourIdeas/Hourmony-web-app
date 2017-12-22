import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import {MarkerService} from '../map/markers.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-specific-job',
  templateUrl: './specific-job.component.html',
  styleUrls: ['./specific-job.component.css']
})
export class SpecificJobComponent implements OnInit, OnDestroy {
  jobDetail;
  sub: any;
  id: string;
  terms = false;
  constructor(private _http: Http, private markerService: MarkerService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      console.log('id' + this.id);
    });
    this.getSpecifiedJob();
  }

  getSpecifiedJob() {
    this._http.get('https://p8o1f7u0u1.execute-api.us-east-1.amazonaws.com/dev/getjob/1504115701272')
      .map(
        (response: Response) => response.json()
      ).subscribe(
      (data) => {
        console.log(data);
        this.jobDetail = { title: data.job_title,
          description: data.job_description,
          startDate: data.job_StartDate,
          noHours: data.job_duration, startTime: data.job_StartTime,
          jobRate: data.job_rate, apply: false, wait: false,
          jobId: data.jobId, userId: data.userId
        };
      },
      (err) => {
        alert(err);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onTermsConditions() {
    this.jobDetail.wait = true;
    if (this.terms === false) {
      this.terms = true;
    } else {
      this.terms = false;
    }
    console.log(this.terms)
  }
}
