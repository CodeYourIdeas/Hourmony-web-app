import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editable = true;
  // LOGO = require('./assets/profile-circle.png');
  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.editable = false;
  }

  onSave() {
    this.editable = true;
  }
}
