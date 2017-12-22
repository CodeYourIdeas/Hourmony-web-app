/**
 * Created by balajisai on 8/16/17.
 */

import { Injectable, NgZone } from '@angular/core';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {Observable} from 'rxjs/Observable';
import {JobPostModel} from './JobPostModel';
import {Http, Headers , Response } from '@angular/http';
import {AuthService} from '../auth/auth.service';
import {NgForm} from "@angular/forms";


declare var google: any;

@Injectable()
export class GMapsService extends GoogleMapsAPIWrapper {

  constructor(private __loader: MapsAPILoader, private __zone: NgZone, private http: Http, private authService: AuthService) {
    super(__loader, __zone);
  }
  getLatLan(address: string) {
    console.log('Getting Address - ', address);
    const geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          // console.log('Location' + JSON.stringify(results[0].geometry.location));
          observer.complete();
        } else {
          console.log('Error - ', results, ' & Status - ', status);
          observer.next({});
          observer.complete();
        }
      });
    })
  }

  getlat(address: string, postJson: any, weekResult: string, htmlRef: NgForm) {
    const that = this;
    this.__loader.load().then(() => {
      let jobPostModel: JobPostModel;
      console.log('google script loaded');
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          console.log(results[0]['geometry']['location']['lat']());
          const today = new Date();
          jobPostModel = {
            job_title: postJson.JobTitle,
            job_update_request: false,
            job_address: postJson.address,
            job_template: postJson.selectedTemplate,
            jobId: new Date().getTime() + '',
            job_location: 'Online',
            userId: that.authService.getAuthenticatedUser().getUsername() + '',
            job_StartTime: postJson.timeStart.hour + ':' + postJson.timeStart.minute,
            job_duration: postJson.duration,
            datePosted: today.getMonth() + '/' + today.getDay() + '/' + today.getFullYear() ,
            job_description: postJson.jobDescription + '',
            lat: [results[0]['geometry']['location']['lat']() + ''],
            lang: [results[0]['geometry']['location']['lng']() + ''],
            job_rate: postJson.hourRate,
            job_StartDate: postJson.dateStart.month + '/' + postJson.dateStart.day + '/' + postJson.dateStart.year,
            total_actual_revenue: '',
            job_EndDate: postJson.dateEnd.month + '/' + postJson.dateEnd.day + '/' + postJson.dateEnd.year,
            job_weekdays: weekResult,
            date_job_in_contract: 'null'
          }
          const authInstance = this;
          that.authService.getAuthenticatedUser().getSession((err, session) => {
            if (err) {
              alert(err);
              return;
            }
            console.log('jobModel ' + JSON.stringify(jobPostModel));
            that.http.post('https://5ltqjo37j0.execute-api.us-east-1.amazonaws.com/prod/PostMyJob', jobPostModel, {
              headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
            })
              .subscribe(
                (result) => {
                  console.log('response' + result);
                  alert('Job Posted Sucessfully');
                  // htmlRef.reset();
                },
                (error) => {
                  console.log('error' + error);
                  alert(error);
                }
              );
          });
          return results[0].geometry.location;
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }
}
