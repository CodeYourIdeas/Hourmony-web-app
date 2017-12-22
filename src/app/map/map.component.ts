import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MarkerService} from './markers.service';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {CurrentJobs, Item} from './CurrentJobs';
import {AuthService} from '../auth/auth.service';


@Injectable()

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapI;
  title = '';
  lat= 38.7478059;
  lng= -120.994996;
  zoom= 0;
  markerClicked = false;
  jobTitile;
  newLat; newLng;
  // selectedMarker: {title: string, description: string, startDate: string, noHours: string};
  selectedMarker;
  jobHistory = [];
  usePanning = false;
  latLng= {};
  responseData;
  parentObject: CurrentJobs;
  childObject: Item;
  allJobs: Item[] = [];
  markers: Markers[] = [
  ];
  today;
  constructor(private markerService: MarkerService, private _mapsWrapper: GoogleMapsAPIWrapper, private authService: AuthService) {
    this.markers = markerService.getMarkers();


    // markerService.getCurrentJobs().subscribe(
    //   (data) => {
    //     console.log(JSON.stringify(data.Items[1]));
    //     this.parentObject = data;
    //     console.log(JSON.stringify(this.parentObject.Items[1]));
    //     this.childObject = this.parentObject.Items[1];
    //     console.log(this.childObject.job_geo_location);
    //     this.allJobs.push(this.childObject);
    //     console.log('allJobs ' + JSON.stringify(this.allJobs[0].job_geo_location.M.lat.SS))
    //     // this.responseData = data.Items[0].job_applicant.S;
    //     // this.parentObject = data;
    //     // // this.parentObject.Items[0].job_applicant = data.Items[0].job_applicant.S;
    //     // this.responseData = JSON.stringify(this.responseData);
    //     // console.log('responseData' + JSON.stringify(this.parentObject));
    //     // console.log('parent obj');
    //     // this.childObj = this.parentObject.Items[1];
    //     // console.log(JSON.stringify(this.childObj));
    //     // console.log(JSON.stringify(this.childObj.job_applicant));
    //   },
    //       error => alert(error),
    //       () => console.log('finished')
    // );
    // console.log(this.show);
  }

  ngOnInit() {
    this.zoom = 15;
    this.jobHistory.push({jobTitle: 'Front end developer',
      jobId: '1234',
      date: '01/02/16',
      money: '$1000'
    });
    this.jobHistory.push({jobTitle: 'Java Developer',
      jobId: '1235',
      date: '02/02/16',
      money: '$2000'
    });
    if (this.parentObject == null) {
      console.log('first time p ' + this.parentObject);
    }
    this.getLocation();
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      this.markerService.getCurrentJobs(session).subscribe(
        (data) => {
          this.parentObject = data;
          for ( let i = 0 ; i < this.parentObject.Count; i++ ) {
            this.childObject = this.parentObject.Items[i];
            this.allJobs.push(this.childObject);
            this.allJobs[i].job_geo_location.M.lat.SS[0] = Number(this.allJobs[i].job_geo_location.M.lat.SS[0]);
            this.allJobs[i].job_geo_location.M.lang.SS[0] = Number(this.allJobs[i].job_geo_location.M.lang.SS[0]);
          }
        },
        error => alert(error),
        () => console.log('finished')
      );
    })
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.usePanning = true;
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        // this.latLng = {lat: position.coords.latitude, lng: position.coords.longitude};
        console.log(this.latLng);
        console.log(this.mapI);
        this.title = 'Current Location is';
        this.markers.push({ name: 'Current Location',
                            lat: this.lat,
                            lng: this.lng,
                            draggable: false});
      });
    } else {
      this.title = 'Geolocation is not supported by this browser';
    }
  }

  clickedMarker(marker: Item, index: number) {
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        alert(err);
        return;
      }
      this.markerService.getIfApplied('https://p8o1f7u0u1.execute-api.us-east-1.amazonaws.com/dev/' +
        marker.jobId.S + ':' + this.authService.getAuthenticatedUser().getUsername(), session).subscribe(
        (data) => {
          console.log('https://p8o1f7u0u1.execute-api.us-east-1.amazonaws.com/dev/' + marker.jobId.S + marker.userId.S);
          console.log(JSON.stringify(data));
          this.jobTitile = marker.job_title.S;
          this.markerClicked = true;
          this.selectedMarker = { title: marker.job_title.S,
            description: marker.job_description.S,
            startDate: marker.job_StartDate.S,
            noHours: marker.job_duration.N, startTime: marker.job_StartTime.S,
            jobRate: marker.job_rate.N, apply: data.apply, wait: false,
            jobId: marker.jobId.S, userId: marker.userId.S
          };
        },
        error => alert(error),
        () => console.log('apply get finished')
      );
    })
    console.log('newMarker ' + JSON.stringify(marker.job_duration.N));
    // console.log('Clicked Marker:' + marker.name + ' at index' + index);
    // this.jobTitile = marker.job_title.S;
    // this.markerClicked = true;
    // this.selectedMarker = { title: marker.job_title.S,
    //   description: marker.job_description.S,
    //   startDate: marker.job_StartDate.S,
    //   noHours: marker.job_duration.N, startTime: marker.job_StartTime.S,
    //   jobRate: marker.job_rate.N, apply: false, wait: false,
    //   jobID: marker.jobId.S, userId: marker.userId.S
    // };
  }

  mapClicked($event: any) {
    console.log('Map Clicked');
    const newMarker =  {
      name: 'Job Added',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }
    this.markers.push(newMarker);
    this.markerService.addMarkers(newMarker);
  }

  markerDragEnd(marker: any, $event) {
    console.log('dragEnd', marker, $event)

    const updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

     this.newLat = $event.coords.lat;
     this.newLng = $event.coords.lng;

     this.markerService.updateMarker(updMarker, this.newLat, this.newLng);
  }

  getUserId() {
    console.dir(this.authService.getAuthenticatedUser().getUsername())
    this.today = new Date();
    console.dir(this.today.getFullYear());
  }
}


