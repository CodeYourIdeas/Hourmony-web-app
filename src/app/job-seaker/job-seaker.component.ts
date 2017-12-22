import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-seaker',
  templateUrl: './job-seaker.component.html',
  styleUrls: ['./job-seaker.component.css']
})
export class JobSeakerComponent implements OnInit {

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  constructor() { }

  ngOnInit() {
  }
}
