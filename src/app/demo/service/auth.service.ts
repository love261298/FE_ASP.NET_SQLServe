import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.API_URL;
  constructor(public http: HttpClient) { }
  login(account:any){
    return this.http.post<any>(this.apiUrl + '/login', account)
  }
  register(account:any){
    return this.http.post<any>(this.apiUrl + '/register', account)
  }
}
