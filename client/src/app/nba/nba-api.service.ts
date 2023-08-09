import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpointsNBA, proxy, noProxy, dbROOT, dbSuffix, dbTarget } from '../util/global-constants';
import { EMPTY } from 'rxjs'; // returns an empty observable
import { Database, set, ref, update, push, remove, get } from '@angular/fire/database';
import { AuthService } from '../user/auth.service';


@Injectable({
  providedIn: 'root'
})

export class NbaApiService {

  constructor(private http: HttpClient, public database: Database, private authService: AuthService) { }

  nbaFetch(target: string = '') { // TODO ==> Add and implement dynamic query params input
    if (!target || !endpointsNBA.hasOwnProperty(target)) return EMPTY;
    let address = endpointsNBA[target];
    return this.http.get<any>(proxy + address);
  }

  firebaseDbFetch(dbTarget: string) {
    return this.http.get<any>(dbROOT + dbTarget + dbSuffix);
  }

  // THIS WORKS - users only update their own folder !!!
  testUpdate(keyName: string): void {
    update(ref(this.database, 'users/' + this.authService.currentUser.uid + '/favorites'), {
      keyName: true,
    });
  }
  // WORKS TOO
  testRemove(keyName: string): void {
    remove(ref(this.database, 'users/' + this.authService.currentUser.uid + '/favorites/' + keyName));

  }

  testUserExtra(dbTarget: string, uid: string) {
    return this.http.get<any>(dbROOT + dbTarget + uid + dbSuffix);
  }

  // testFetch(): void {
  //   set(ref(this.database, 'users/' + 'test'), {
  //     credential: 'test-prop'
  //   });
  // }
}
