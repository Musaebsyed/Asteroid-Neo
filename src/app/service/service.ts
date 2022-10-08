import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class Service {
    API_KEY = 'Zl5ZDEoyJTKoxSmrwLJV2yCu547BMGcSUnnEC1Uy';
    constructor(private http: HttpClient) {
    }
    getAsteroidData(start_date: any,end_date:any) {
          let url ="https://api.nasa.gov/neo/rest/v1/feed?"+"start_date="+start_date+"&end_date="+end_date+"&api_key="+this.API_KEY
          return this.http.get(url);
      }
}
