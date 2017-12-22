import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chose = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isSelected() {
    // this.router.navigate(['/home']);
  }

  onLogout() {
    this.authService.logout();
  }
}
