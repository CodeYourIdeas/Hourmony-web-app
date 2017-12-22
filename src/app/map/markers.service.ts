import {Init} from './init.markers';
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'
/**
 * Created by balajisai on 7/17/17.
 */

@Injectable()
export class MarkerService extends Init {
  constructor(private _http: Http) {
    super();
    console.log('Marker Service Initialized')
    this.load();
  }

  getMarkers() {
    const markers = JSON.parse(localStorage.getItem('markers'));
    return markers;
  }

  getCurrentJobs(session: any) {
     return this._http.get('https://k0gusoajsb.execute-api.us-east-1.amazonaws.com/prod/ActiveJobs',
       { headers: new Headers({'Authorization': session.getIdToken().getJwtToken()}) }).map(res => res.json());
  }

  getIfApplied(url: string, session: any) {
    return this._http.get(url, { headers: new Headers({'Authorization': session.getIdToken().getJwtToken()}) }).map(res => res.json());
  }

  addMarkers(newMarker) {
    // Fetch Marker
    const markers = JSON.parse(localStorage.getItem('markers'));
    // push marker
    markers.push(newMarker);
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  updateMarker(marker, newlat, newlng) {
    const markers = JSON.parse(localStorage.getItem('markers'));
    for (let i = 0 ; i < markers.length; i++) {
      if ( marker.lat === markers[i].lat && marker.lng === markers[i].lng) {
        markers[i].lat = newlat;
        markers[i].lng = newlng;
      }
    }
    localStorage.setItem('markers', JSON.stringify(markers));
  }
}
