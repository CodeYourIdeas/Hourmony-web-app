import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  isSelected() {}
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authStatusChanged.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        console.log('authenticated ' + this.isAuthenticated)
        if (authenticated) {
          // this.router.navigate(['/jobPost']);
        } else {
        }
      }
    );
    this.authService.initAuth();
  }
}
