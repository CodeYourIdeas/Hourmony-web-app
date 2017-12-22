import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.css']
})
export class JobHistoryComponent implements OnInit {
  @Input() history: {jobTitle: string, jobId: string, date: String, money: string};
  constructor() { }

  ngOnInit() {
  }

}
