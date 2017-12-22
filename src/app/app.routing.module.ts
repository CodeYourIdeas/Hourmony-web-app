import {RouterModule, Routes} from '@angular/router';
import {NgModel} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';
import {SigninComponent} from './auth/signin/signin.component';
import {MapComponent} from './map/map.component';
import {AuthService} from './auth/auth.service';
import {NavComponent} from './nav/nav.component';
import {JobPostComponent} from './job-post/job-post.component';
import {ProfileComponent} from './profile/profile.component';
import {JobSeakerComponent} from './job-seaker/job-seaker.component';
import {SpecificJobComponent} from './specific-job/specific-job.component';
import {JobDashboardComponent} from './job-dashboard/job-dashboard.component';
import {JobAppliedDashboardComponent} from './job-applied-dashboard/job-applied-dashboard.component';



const appRoutes: Routes = [
   { path: 'siginin', component: SigninComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'jobSeeker', component: MapComponent},
  { path: 'nav', component: NavComponent},
  { path: 'jobPost', component: JobPostComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'map', component: JobSeakerComponent},
  { path: 'jobId', component: SpecificJobComponent},
  { path: 'jobDashboard', component: JobDashboardComponent},
  { path: 'appliedDashboar', component: JobAppliedDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule {

}
