import {Component, Input, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-job-detail-card',
  templateUrl: './job-detail-card.component.html',
  styleUrls: ['./job-detail-card.component.css']
})
export class JobDetailCardComponent implements OnInit {

  @Input() jobDetail:
    {title: any, description: any, startDate: any, noHours: any, startTime: any, jobRate: any, apply: boolean, wait: boolean,
     jobId: any, userId: any};
  terms = false;

  constructor(private http: Http, private authService: AuthService) {
  }

  ngOnInit() {
  }

  onApply() {
    const today = new Date;
      console.dir(this.jobDetail);
      const data = {
        'jobId' : this.jobDetail.jobId,
        'userId' : this.authService.getAuthenticatedUser().getUsername(),
        'date_Apply': today.getMonth() + '/' + today.getDay() + '/' + today.getFullYear()
      };
      console.dir('post dat' + JSON.stringify(data));
      this.authService.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          alert(err);
          return;
        }
        this.http.post('https://p8o1f7u0u1.execute-api.us-east-1.amazonaws.com/dev/applyjob', data, {
          headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
        })
          .subscribe(
            (result) => {
              console.log('response' + result);
              this.jobDetail.apply = true;
            },
            (error) => {
              console.log('error' + error);
            }
          );
      });
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
