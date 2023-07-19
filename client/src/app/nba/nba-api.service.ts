import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpointsNBA, proxy, noProxy } from '../util/global-contants';


@Injectable({
  providedIn: 'root'
})

export class NbaApiService {

  constructor(private http: HttpClient) { }

  fetchData(target: string) { // TODO ==> Add and implement dynamic query params input
    if (!target) target = endpointsNBA.stats;
    let address = endpointsNBA[target];
    return this.http.get<any>(proxy + address);
  }
}
