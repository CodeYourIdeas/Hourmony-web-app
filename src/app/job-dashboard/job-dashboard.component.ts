import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-job-dashboard',
  templateUrl: './job-dashboard.component.html',
  styleUrls: ['./job-dashboard.component.css']
})
export class JobDashboardComponent implements OnInit {
  jobData;
  flag = false;
  disable = false;
  constructor(private _http: Http, private authService: AuthService) { }

  ngOnInit() {
    this.getAllJobWhichIsApplied();
  }

  getAllJobWhichIsApplied() {
    this._http.get('https://p8o1f7u0u1.execute-api.us-east-1.amazonaws.com/dev/getjobdashboard/'
      + this.authService.getAuthenticatedUser().getUsername())
      .map(
        (response: Response) => response.json()
      ).subscribe(
      (data) => {
        console.log(data[0]);
        this.jobData = data;
      },
      (err) => {
        alert(err);
      }
    )
  }

  onClickJob(jobId: any) {
    console.log(jobId.jobId)
  }

  onAccept(data: any) {
    console.log(data);
    this._http.get('https://p8o1f7u0u1.execute-api.us-east-1.amazonaws.com/dev/acceptjob/' + data.jobId + ':' + data.userId)
      .map(
        (response: Response) => response.json()
      ).subscribe(
      (dataa) => {
        console.log(dataa);
        alert('Application Accepted');
        this.disable = true;
      },
      (err) => {
        alert(err);
      }
    )
  }
}
