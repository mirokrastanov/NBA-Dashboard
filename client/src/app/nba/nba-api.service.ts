import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpointsNBA, proxy, noProxy } from '../util/global-constants';
import { EMPTY } from 'rxjs'; // returns an empty observable
import { Database, set, ref, update } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class NbaApiService {

  constructor(private http: HttpClient, public database: Database) { }

  nbaFetch(target: string = '') { // TODO ==> Add and implement dynamic query params input
    if (!target || !endpointsNBA.hasOwnProperty(target)) return EMPTY;
    let address = endpointsNBA[target];
    return this.http.get<any>(proxy + address);
  }


  // testFetch(): void {
  //   set(ref(this.database, 'users/' + 'test'), {
  //     credential: 'test-prop'
  //   });
  // }
}
