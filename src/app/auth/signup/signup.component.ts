import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../user.modle';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') signUpForm: NgForm;
  @ViewChild('c') confirmForm: NgForm;
  constructor(private authService: AuthService) { }

  options: Array<any>;
  mySelectValue: Array<string>;
  ngOnInit() {
  this.options = [
        {value: '+1', label: 'US (+1)'},
        {value: '+91', label: 'India (+91)'},
      ];
  }

  onSubmit() {
    console.log(this.signUpForm);
    const user: User = {
      firstName: this.signUpForm.value.firstName,
      lastName : this.signUpForm.value.lastName,
      email : this.signUpForm.value.email,
      phoneNumber : this.signUpForm.value.phone,
      secretKey1 : this.signUpForm.value.secretKey1,
      secretKey2 : this.signUpForm.value.secretKey2,
      userName: this.signUpForm.value.userName1
    }
    this.authService.signUp(user);

}
  onConfirm() {
    const userNameC = this.confirmForm.value.usernameC;
    const code = this.confirmForm.value.code;
    console.log(userNameC, code);
    this.authService.confirmUser(userNameC, code);
  }
}
