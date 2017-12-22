import {isUndefined} from 'util';
/**
 * Created by balajisai on 7/17/17.
 */
export class Init {

  load() {
    if (localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined) {
      console.log('no Markers found......Creating');
      const markers: Markers[] = [
        {
          name: 'Job 1',
          lat: 37.347676,
          lng: -121.9361417,
          draggable: true
        },
        {
          name: 'Job 2',
          lat: 37.348631,
          lng: -121.9337917,
          draggable: false
        }
      ];
      localStorage.setItem('markers', JSON.stringify(markers));
    } else {
      console.log('Loading markers.....')
    }
  }
}
