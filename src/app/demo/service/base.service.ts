import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  url: string = '';
  constructor(public http: HttpClient) { }
  search(data: any): Observable<any> {
    return this.http.get(`${this.url}/Search`, data);
  }
  getAll(): Observable<any> {
    return this.http.get(this.url);
  }
  getById(id: any): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }
  deleteById(id: any): Observable<any> {
    return this.http.delete(`${this.url}/`, id);
  }
}
