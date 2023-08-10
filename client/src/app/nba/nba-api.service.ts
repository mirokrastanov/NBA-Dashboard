import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { endpointsNBA, proxy, noProxy, dbROOT, dbSuffix, dbTarget } from '../util/global-constants';
import { EMPTY, Observable } from 'rxjs'; // returns an empty observable
import { Database, set, ref, update, push, remove, get, child, onValue } from '@angular/fire/database';
import { AuthService } from '../user/auth.service';


@Injectable({
  providedIn: 'root'
})

export class NbaApiService {
  constructor(private http: HttpClient, public database: Database, private authService: AuthService) { }

  async getFbCollection(path: string): Promise<void> {
    let snapshot = await get(ref(this.database, path));
    let temp = snapshot.val();
    return temp;    
  }

  nbaFetch(target: string = '') {
    if (!target || !endpointsNBA.hasOwnProperty(target)) return EMPTY;
    let address = endpointsNBA[target];
    return this.http.get<any>(proxy + address);
  }

  firebaseDbFetch(dbTarget: string) {
    return this.http.get<any>(dbROOT + dbTarget + dbSuffix);
  }

  getFavorites(): Observable<any> {
    return this.http.get<any>(dbROOT + dbTarget.users + this.authService.currentUser.uid + '/favorites' + dbSuffix);
  }

  // Users can only update their own folder !!! Key name prevents duplicates automatically. NO extra checks needed.
  addFavoriteTeam(teamID: string): void {
    update(ref(this.database, 'users/' + this.authService.currentUser.uid + '/favorites/teams/'), {
      [teamID]: true,
    });
  }

  addFavoritePlayer(playerName: string): void {
    const starName = this.encodePlayerName(playerName);
    update(ref(this.database, 'users/' + this.authService.currentUser.uid + '/favorites/players/'), {
      [starName]: true,
    });
  }

  removeFavoriteTeam(teamID: string): void {
    remove(ref(this.database, 'users/' + this.authService.currentUser.uid + '/favorites/teams/' + teamID));
  }

  removeFavoritePlayer(playerName: string): void {
    const starName = this.encodePlayerName(playerName);
    remove(ref(this.database, 'users/' + this.authService.currentUser.uid + '/favorites/players/' + starName));
  }

  fetchUserExtra(): Observable<any> {
    return this.http.get<any>(dbROOT + dbTarget.users + this.authService.currentUser.uid + dbSuffix);
  }

  encodePlayerName(playerName: string): string {
    return playerName
      .replaceAll('.', '<1>')
      .replaceAll('#', '<2>')
      .replaceAll('$', '<3>')
      .replaceAll('/', '<4>')
      .replaceAll('[', '<5>')
      .replaceAll(']', '<6>');
  }

  decodeStarName(starName: string): string {
    return starName
      .replaceAll('<1>', '.')
      .replaceAll('<2>', '#')
      .replaceAll('<3>', '$')
      .replaceAll('<4>', '/')
      .replaceAll('<5>', '[')
      .replaceAll('<6>', ']');
  }
}
