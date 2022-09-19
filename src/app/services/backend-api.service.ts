import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) { }
  create(data: any) {
    // alert(JSON.stringify(data));
    return this.http.post("https://upskillingapi.herokuapp.com/userData", data).subscribe();
  }

  checkAccess(data:any){
    return this.http.post("https://upskillingapi.herokuapp.com/checkAccess",data);
  }

  
}
