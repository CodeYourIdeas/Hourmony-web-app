import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  LOGO = require('./profile-circle1.png');
  profileData;
  constructor(private http: Http) {
    this.getProfile();
  }

  ngOnInit() {
  }

  getProfile() {
    this.http.get('https://ixhc3f1kxk.execute-api.us-east-1.amazonaws.com/dev/getuserprofile/saurabh')
      .map(
        (response: Response) => response.json()
      ).subscribe(
      (data) => {
        this.profileData = data;
        console.log(data);
      },
      (err) => {
        alert(err);
        console.log(err);
      }
    )
  }

}
