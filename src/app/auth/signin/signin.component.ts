import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  LOGO = require('./logo.png');
  @ViewChild('f') signupForm: NgForm;
  isLoading = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
  }

  onSubmit() {
    const secretKey1 = this.signupForm.value.secretKey1;
    const secretKey2 = this.signupForm.value.secretKey2;
    this.authService.signIn(secretKey1, secretKey2);
  }

}
