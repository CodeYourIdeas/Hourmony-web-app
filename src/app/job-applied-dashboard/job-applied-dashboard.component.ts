import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-job-applied-dashboard',
  templateUrl: './job-applied-dashboard.component.html',
  styleUrls: ['./job-applied-dashboard.component.css']
})
export class JobAppliedDashboardComponent implements OnInit {
  jobApplied;
  constructor(private _http: Http, private authService: AuthService) { }

  ngOnInit() {
    this.getAppliedJobs();
  }

  getAppliedJobs() {
    this._http.get('https://p8o1f7u0u1.execute-api.us-east-1.amazonaws.com/dev/getappliedjobs/'
      + this.authService.getAuthenticatedUser().getUsername())
      .map(
        (response: Response) => response.json()
      ).subscribe(
      (data) => {
        console.dir(data);
        this.jobApplied = data;
       // console.dir(data[0].acceptedUser[0].S)
      },
      (err) => {
        console.log(err);
        alert(err);
      }
    )
  }
}
