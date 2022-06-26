import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly ApiUrl = "http://localhost:64161/api"
  constructor(private http:HttpClient) { }

  getOccupationList():Observable<any[]>{
    return this.http.get<any>(this.ApiUrl + '/occupation');
  }

  getRatingList():Observable<any[]>{
    return this.http.get<any>(this.ApiUrl + '/rating');
  }
}
