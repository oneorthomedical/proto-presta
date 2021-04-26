import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Coordinate} from '../shared/class/coordinate';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  private dataUrl = environment.url;
  private dataUrlRightMenu = environment.urlRightMenu;
  private dataUrlBottomMenu = environment.urlBottomMenu;
  private dataUrlCoordinate = environment.urlCoordinate;


  constructor(private http: HttpClient) {
  }

  getLocalData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }

  getRightMenuData(): Observable<any> {
    return this.http.get(this.dataUrlRightMenu);
  }

  getBottomMenuData(): Observable<any> {
    return this.http.get(this.dataUrlBottomMenu);
  }

  getCoordinateData() {
    return this.http.get(this.dataUrlCoordinate).pipe(
      map(
        (value: object[]) => value.map(cord => Coordinate.fromJson(cord)))
    );
  }
}
