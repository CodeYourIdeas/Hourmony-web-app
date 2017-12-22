import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing.module';
import {AuthService} from './auth/auth.service';
import {HttpModule} from '@angular/http';
import { MapComponent } from './map/map.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {CommonModule} from '@angular/common';
import {MarkerService} from './map/markers.service';
import {JobDetailCardComponent } from './map/job-detail-card/job-detail-card.component';
import {JobPostComponent} from './job-post/job-post.component';
import { ProfileComponent } from './profile/profile.component';
import { JobHistoryComponent } from './map/job-history/job-history.component';
import { JobSeakerComponent } from './job-seaker/job-seaker.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SelectModule} from 'angular2-select';
import { TopJobsComponent } from './map/top-jobs/top-jobs.component';
import {GMapsService} from './job-post/GMapsService';
import { SpecificJobComponent } from './specific-job/specific-job.component';
import { JobDashboardComponent } from './job-dashboard/job-dashboard.component';
import { JobAppliedDashboardComponent } from './job-applied-dashboard/job-applied-dashboard.component';
import { ProfileCardComponent } from './profile/profile-card/profile-card.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NavComponent,
    HomeComponent,
    MapComponent,
    JobDetailCardComponent,
    JobPostComponent,
    ProfileComponent,
    JobHistoryComponent,
    JobSeakerComponent,
    TopJobsComponent,
    SpecificJobComponent,
    JobDashboardComponent,
    JobAppliedDashboardComponent,
    ProfileCardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCvtWWlH2qI4V4THUwLoMI7fy4XVTYasvM'
    }),
    CommonModule,
    NgbModule.forRoot(),
    SelectModule,
  ],
  providers: [AuthService, MarkerService, GoogleMapsAPIWrapper, GMapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
