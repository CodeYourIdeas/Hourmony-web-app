import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {JobPostModel} from './JobPostModel';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {google} from '@agm/core/services/google-maps-types';
import {GMapsService} from './GMapsService';
import {forEach} from '@angular/router/src/utils/collection';
import {bootstrapItem} from '@angular/cli/lib/ast-tools';

const now = new Date();

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})

export class JobPostComponent implements OnInit {
  @ViewChild('post') postRef: NgForm;
  options: Array<any>;
  mySelectValue: Array<string>;
  optionsJobType: Array<any>;
  selectValueJobType;
  model;
  postJson;
  modelEndDate;
  public jobType: Array<string>;
  // jobType = ['PartTime', 'FullTime'];
  time = {hour: 13, minute: 30};
  weekday: boolean[] = [false, false, false, false, false, false, false];
  constructor(private gService: GMapsService) {
  }
  ngOnInit() {
    this.options = [
      {value: 'PreScholl Teacher($30) PT', label: 'PreScholl Teacher($30) PT'},
      {value: 'Driver', label: 'Driver'},
      {value: 'Painter', label: 'Painter'},
    ];
    // this.jobType = ['PartTime', 'FullTime'];
    this.mySelectValue = ['b'];
    this.optionsJobType = [{value: 'PartTime Job' , label: 'PartTime Job'}, {value: 'FullTime Job' , label: 'FullTime Job'}];
    this.selectValueJobType = 'a';
    this.setCurrentDate();
    this.setNextDay();
  }
  selectValue(mydrop) {
    console.log(mydrop)
  }

  setCurrentDate() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  setNextDay() {
    this.modelEndDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + 1};
  }

  onSubmit() {
    this.postJson = this.postRef.value;
    const weekResult = this.toStringWeekday()
    console.dir('weekDay' + weekResult);
    console.log('post json' + this.postJson.address);
    const location = this.gService.getlat(this.postJson.address, this.postJson, weekResult, this.postRef);
    console.log('location main' + location );
  }

  private toStringWeekday() {
    let temp, weekdayString = '';
    for ( let i = 0; i < this.weekday.length ; i++ ) {
      if ( this.weekday[i] === true) {
        temp = '1';
      } else {
        temp = '0';
      }
      weekdayString += temp;
    }
    return weekdayString;
  }

  selected(jType) {
    console.log(jType);
  }
}
